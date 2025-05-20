import { useState } from "react";
import { useRouter } from "next/router";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [language, setLanguage] = useState("ko");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title, body, language }),
    });

    if (res.ok) {
      alert("글이 성공적으로 저장되었습니다");
      router.push("/posts");
    } else {
      alert("저장 실패!");
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h1>글 쓰기</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
        </div>
        <div>
          <label>본문</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={6}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
        </div>
        <div>
          <label>언어</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ marginBottom: "1rem" }}
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          저장하기
        </button>
      </form>
    </div>
  );
}
