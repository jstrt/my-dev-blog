import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [language, setLanguage] = useState("ko");

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`);
      const data = await res.json();
      setTitle(data.title);
      setBody(data.body);
      setLanguage(data.language || "ko");
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, language }),
    });

    if (res.ok) {
      alert("글이 수정되었습니다");
      router.push(`/posts/${id}`);
    } else {
      alert("수정 실패");
    }
  };

  return (
    <div className="flex gap-6 p-6">
      {/*수정 폼*/}
      <div className="w-1/2 flex flex-col gap-4">
        <input
          type="text"
          className="border p-2 text-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Markdown으로 글을 수정하세요"
          className="border p-2 h-64"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <select
          className="border p-2"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
        </select>
        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded mt-2"
        >
          수정하기
        </button>
      </div>

      {/*실시간 미리보기 */}
      <div className="w-1/2 border p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">Markdown 미리보기</h2>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}
