import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

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
    <div className="p-6 max 3xl mx-auto">
      <h1 className="text-3xl font-bold mb">{post.title}</h1>
      <p className="text-sm text-gray 500 mb-2">
        작성일: {new Date(post.createAt).toLocaleString()}
      </p>
      <ReactMarkdown
        remarkPlugin={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {post.body}
      </ReactMarkdown>
    </div>
  );
}
