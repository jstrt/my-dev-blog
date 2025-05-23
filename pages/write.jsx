import { useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function Write() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [language, setLanguage] = useState("ko");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, language }),
    });

    if (res.ok) {
      alert("글이 성공적으로 저장되었습니다.");
      router.push("/posts"); // 글 목록 페이지로 이동
    } else {
      alert("저장 실패!");
    }
  };

  return (
    <div className="flex gap-6 p-6">
      {/* 입력 폼*/}
      <form onSubmit={handleSubmit} className="w-1/2 flex flex-col gap-4">
        <input
          type="test"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 text-lg"
        />

        <textarea
          placeholder="Markdown으로 본문을 작성하세요"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          row={15}
          required
          className="border p-2"
        />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border p-2"
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          저장하기기
        </button>
      </form>

      <div className="w-1/2 border p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">📄 Markdown 미리보기</h2>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {body}
        </ReactMarkdown>
      </div>
    </div>
  );
}
