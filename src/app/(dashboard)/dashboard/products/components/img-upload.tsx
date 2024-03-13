import { Button } from "@/components/ui/button";
import { type Product } from "@/types";
import { IKContext, IKUpload } from "imagekitio-react";
import { useRef, useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { API_URL } from "@/config/api";

function ImgUpload({
  data,
  field,
  form,
  onSubmit,
}: {
  data: Product;
  field: any;
  form: any;
  onSubmit: any;
}) {
  const ikUploadRefTest = useRef(null);
  const [uploading, setUploading] = useState(false);

  const [currentImg, setCurrentImg] = useState(0);

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const getCurrentImg = () => {
    if (data.images.length > 0 && data.barcode) {
      return data.images[currentImg];
    }
    return data.img;
  };

  const backImg = () => {
    if (currentImg !== 0) {
      setCurrentImg((prev) => prev - 1);
      return;
    }
    setCurrentImg(data.images.length - 1);
  };

  const nextImg = () => {
    if (data.images.length - 1 !== currentImg) {
      setCurrentImg((prev) => prev + 1);
      return;
    }
    setCurrentImg(0);
  };

  // Image upload
  const authenticator = async () => {
    try {
      const response = await fetch(`${API_URL}/auth-imgKit`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error: any) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const onError = (err: any) => {
    setUploading(false);
  };

  const onSuccess = (res: any) => {
    setUploading(false);
    setUploadedImages([...uploadedImages, res.url]);

    if (form.watch("images").length === 0 && data.img !== "miss") {
      field.onChange([data.img].concat([res.url]));
      return;
    }
    field.onChange(form.watch("images").concat([res.url]));
  };

  const onUploadStart = (evt: any) => {
    setUploading(true);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="h-full max-h-[200px]">
        <div className="relative mx-auto aspect-square h-full w-full max-w-lg">
          <img
            style={{ maxHeight: "20rem" }}
            className="mx-auto h-full w-full rounded-t-lg object-contain"
            src={getCurrentImg()}
            alt={data.title + "- фото продукту Лейвен"}
          />
          {data.images.length > 0 && data.barcode && (
            <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 transform items-center justify-between">
              <ArrowBigLeft onClick={backImg} />

              <ArrowBigRight onClick={nextImg} />
            </div>
          )}
        </div>
      </div>
      {data.images.length > 0 && data.barcode && (
        <div className="flex gap-3">
          {data.images.map((img, i) => {
            return (
              <div
                key={i}
                onClick={() => setCurrentImg(i)}
                className={`${
                  currentImg === i && "rounded-lg border border-blue-600"
                } w-20`}
              >
                <img
                  className="h-full w-full rounded-lg object-contain"
                  src={img}
                  alt={img + " - картинка"}
                />
              </div>
            );
          })}
        </div>
      )}

      {uploadedImages.length > 0 && (
        <div className="flex flex-col gap-3">
          <FormLabel>Нові</FormLabel>
          <Separator />
          <div className="flex flex-wrap gap-3">
            {uploadedImages.map((img: any, i: number) => {
              return (
                <div key={i} className={`w-20`}>
                  <img
                    className="h-full w-full rounded-lg object-contain"
                    src={img}
                    alt={img + " - картинка"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <IKContext
        publicKey={"public_TfkHmUgDEZIVY3h+Gvjhrmd1rGI="}
        urlEndpoint={"https://ik.imagekit.io/ahcysj84d"}
        authenticator={authenticator}
      >
        <IKUpload
          onError={onError}
          onSuccess={onSuccess}
          onUploadStart={onUploadStart}
          style={{ display: "none" }}
          ref={ikUploadRefTest}
          useUniqueFileName
          accept=".jpg, .png, .webp"
        />
        {uploading && (
          <span className="loading loading-infinity loading-lg mx-auto"></span>
        )}

        {ikUploadRefTest && !uploading && (
          <Button
            variant={"outline"}
            className="bg-yellow-300"
            onClick={(e) => {
              e.preventDefault();
              (ikUploadRefTest.current as any).click();
            }}
          >
            Upload
          </Button>
        )}
      </IKContext>
    </div>
  );
}

export default ImgUpload;
