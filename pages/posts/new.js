import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      header: {
        "Content-Type": "application",
      },
      body: JSON.stringify({
        title,
        body,
        language: "ko",
      }),
    });

    if ((res, ok)) {
      alert("글이 저장되었습니다!");
      window.location.href = "/";
    } else {
      alert("저장 실패");
    }
  };

  return (
    <div className="flex gap-6 p-6">
      {/*작성 폼*/}
      <div className="w-1/2 flex flex-col gap-4">
        <input
          type="text"
          className="board p-2 text-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your post in Markdown.."
          className="border p-2 h-64"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <div className="w-1/2 border p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">Markdown Preview</h2>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}
