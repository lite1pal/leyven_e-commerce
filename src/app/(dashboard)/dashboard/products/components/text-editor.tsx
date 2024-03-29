import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor({
  description,
  field,
}: {
  description: string;
  field: any;
}) {
  const isHTML = (str: string) => {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  };

  const paragraphs = description.split("\n");

  const handleChange = (value: string) => {
    field.onChange(value);
  };

  return (
    <ReactQuill
      style={{ backgroundColor: "white" }}
      value={
        isHTML(description)
          ? description
          : paragraphs.map((paragraph, i) => `<p>${paragraph}</p>`).join("<br>")
      }
      placeholder="..."
      onChange={handleChange}
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
