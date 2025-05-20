import { useEffect, useState } from "react";
import Link from "next/link";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log("서버 응답".data);
        setPosts(data);
      })
      .catch((err) => console.error("글 불러오기 실패", err));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>글 목록</h1>
      {posts.length === 0 ? (
        <p>글이 없습니다.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              marginBottom: "1.5rem",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "0.5rem",
            }}
          >
            <h2>
              <Link href={`/posts/${post._id}`}>{post.title}</Link>
            </h2>
            <p>{post.body}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}
