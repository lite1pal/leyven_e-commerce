import { FieldValues, UseFormRegister } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor({
  description,
  register,
}: {
  description: string;
  register: UseFormRegister<FieldValues>;
}) {
  return (
    <ReactQuill
      style={{ backgroundColor: "#F9FAFB" }}
      value={description}
      placeholder="Редагування опису"
      modules={{
        toolbar: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link"],
        ],
      }}
      // {...register("description", { required: true })}
    />
  );
}
