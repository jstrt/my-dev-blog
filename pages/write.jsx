import { useState } from "react";
import { useRouter } from "next/router";

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

        <div style={{ marginBottom: "1rem" }}>
          <label>언어 선택: </label>
          <label style={{ marginRight: "1rem" }}>
            <input
              type="radio"
              value="ko"
              checked={language === "ko"}
              onChange={(e) => setLanguage(e.target.value)}
            />
            한국어
          </label>
          <label>
            <input
              type="radio"
              value="en"
              checked={language === "en"}
              onChange={(e) => setLanguage(e.target.value)}
            />
            English
          </label>
        </div>

        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          저장하기
        </button>
      </form>
    </div>
  );
}
