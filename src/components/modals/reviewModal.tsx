"use client";

import { Button } from "../ui/button";
import CloseIcon from "@mui/icons-material/Close";
// import { Textarea } from "flowbite-react";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { API_KEY, API_URL } from "@/config/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function ReviewModal({ data, session }: any) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const [error, setError] = useState(false);

  const router = useRouter();

  const leaveReview = async () => {
    try {
      if (!session) {
        (document.getElementById("reviewModal") as HTMLFormElement).close();
        return toast("Ввійдіть в акаунт, щоб залишити відгук");
      }
      if (!rating) {
        setError(true);
        return;
      }
      const res = await fetch(`${API_URL}/review`, {
        method: "POST",
        body: JSON.stringify({
          text,
          rating,
          productId: data.id,
          userEmail: session.user.email,
        }),
      });
      if (!res.ok) {
        return toast.error(
          "Сталася помилка з відправленням відгуку, спробуйте ще раз",
        );
      }
      setText("");
      setRating(0);
      toast.success("Відгук залишено!");
      (document.getElementById("reviewModal") as HTMLFormElement).close();
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          (
            document.getElementById("reviewModal") as HTMLFormElement
          ).showModal();
        }}
      >
        Залишити відгук
      </Button>

      <dialog id="reviewModal" className="modal">
        <div className="modal-box bg-white p-0">
          <div className="flex items-center justify-between p-6">
            <Label className="text-lg">Відгук</Label>
            <form method="dialog">
              <button className="h-fit cursor-pointer rounded-lg border-2 border-blue-600 border-opacity-0 p-1 transition duration-300 hover:border-opacity-100 hover:text-blue-600">
                <CloseIcon />
              </button>
            </form>
          </div>
          <Separator />
          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-2">
              <Label>Оцінка</Label>
              <Rating
                name="simple-controlled"
                value={rating}
                precision={0.5}
                className="w-fit"
                onChange={(event, newValue: any) => {
                  setRating(newValue);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Відгук</Label>
              <Textarea
                value={text}
                onChange={(e: any) => setText(e.target.value)}
              />
            </div>
          </div>
          {error && (
            <div className="mx-auto w-fit pb-6 pt-2 text-red-600">
              Поставте оцінку, щоб віправити відгук
            </div>
          )}
          <div className="mb-5 flex items-center justify-center">
            <Button onClick={leaveReview}>Залишити</Button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
