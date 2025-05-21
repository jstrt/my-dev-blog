import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`);
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [id]);

  if (!post) return <p className="p-6">로딩 중...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-2">
        작성일: {new Date(post.createdAt).toLocaleString()}
      </p>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {post.body}
      </ReactMarkdown>

      <Link href={`/posts/${id}/edit`}>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
          수정하기
        </button>
      </Link>

      <button
        onClick={async () => {
          if (!confirm("정말 삭제하시겠습니까?")) return;

          const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            alert("삭제 완료");
            window.location.href = "/posts";
          } else {
            alert("삭제 실패");
          }
        }}
        className="bg-red-600 text-white px-4 py-2 rounded ml-2"
      >
        삭제하기
      </button>
    </div>
  );
}
