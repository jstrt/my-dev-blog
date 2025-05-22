import { useState } from "react";
import { useRouter } from "next/router";

export default function Write() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [lang, setLang] = useState("ko");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = { title, body, lang };
    console.log("새 포스트:", newPost);

    // TODO: 서버로 전송 또는 DB 저장
    alert("작성 완료! 콘솔에서 확인하세요.");
    router.push("/"); // 홈으로 이동
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>포스트 작성</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />

        <textarea
          placeholder="내용"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />

        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="radio"
              value="ko"
              checked={lang === "ko"}
              onChange={(e) => setLang(e.target.value)}
            />
            한국어
          </label>
          {"  "}
          <label>
            <input
              type="radio"
              value="en"
              checked={lang === "en"}
              onChange={(e) => setLang(e.target.value)}
            />
            English
          </label>
        </div>

        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
}
