import { Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor({
  description,
  setDescription,
  register,
}: {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  register: UseFormRegister<FieldValues>;
}) {
  const isHTML = (str: string) => {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  };

  const paragraphs = description.split("\n");

  return (
    <ReactQuill
      style={{ backgroundColor: "#F9FAFB" }}
      value={
        isHTML(description)
          ? description
          : paragraphs.map((paragraph, i) => `<p>${paragraph}</p>`).join("<br>")
      }
      placeholder="Редагування опису"
      onChange={(value) => setDescription(value)}
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
    />
  );
}
