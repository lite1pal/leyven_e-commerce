"use client";

import { Divider } from "@mui/joy";
import Button from "../base/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Textarea } from "flowbite-react";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { API_KEY, API_URL } from "@/config/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ReviewModal({ data, session }: any) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const router = useRouter();

  const leaveReview = async () => {
    try {
      if (!session) {
        return toast("Ввійдіть в акаунт, щоб залишити відгук");
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
        title="Залишити відгук"
        onClick={() => {
          (
            document.getElementById("reviewModal") as HTMLFormElement
          ).showModal();
        }}
      />
      <dialog id="reviewModal" className="modal">
        <div className="modal-box bg-white p-0">
          <div className="flex items-center justify-between p-6">
            <div className="text-lg font-bold">Відгук</div>
            <form method="dialog">
              <button className="h-fit cursor-pointer rounded-lg border-2 border-blue-600 border-opacity-0 p-1 transition duration-300 hover:border-opacity-100 hover:text-blue-600">
                <CloseIcon />
              </button>
            </form>
          </div>
          <Divider />
          <div className="flex flex-col gap-4 p-6">
            <div className="flex flex-col gap-2">
              <div>Оцінка</div>
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
              <div>Відгук</div>
              <Textarea
                value={text}
                onChange={(e: any) => setText(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-5 flex items-center justify-center">
            <Button onClick={leaveReview} title="Залишити" />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
