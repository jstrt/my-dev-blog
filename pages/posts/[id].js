import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function PostDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.log("글 불러오기 실패", err));
  }, [id]);

  if (!post) return <p style={{ padding: "2rem" }}>불러오는 중...</p>;

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        maxwidth: "600px",
        margin: "auto",
      }}
    >
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <small>{new Date(post.createdAt).toLocaleString()}</small>
    </div>
  );
}
