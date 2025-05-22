import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLanguage } from "../../src/context/LanguageContext";
import Link from "next/link";

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const { language } = useLanguage();

  // 좋아요 상태 로컬에서 불러오기
  useEffect(() => {
    if (!id) return;
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    setLiked(likedPosts[id] === true);
  }, [id]);

  // 포스트 로딩
  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("포스트 로딩 실패:", err);
      }
    };
    fetchPost();
  }, [id]);

  // 좋아요 토글
  const toggleLike = async () => {
    if (!post) return;

    const newLiked = !liked;
    const updatedPost = {
      ...post,
      likes: post.likes + (newLiked ? 1 : -1),
    };
    setPost(updatedPost);
    setLiked(newLiked);

    // localStorage에 저장
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    likedPosts[id] = newLiked;
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

    // 서버에 좋아요 수 반영 (옵션)
    await fetch(`http://localhost:5000/api/posts/${id}/like`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ like: newLiked }),
    });
  };

  if (!post) return <p className="p-4">로딩 중...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/posts" className="text-blue-500 hover:underline">
        ← {language === "ko" ? "글 목록으로" : "Back to list"}
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-2">
        {new Date(post.createdAt).toLocaleString()}
      </p>

      <div className="text-lg text-gray-800 whitespace-pre-wrap mb-6">
        {post.body}
      </div>

      {/* 좋아요 버튼 */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={toggleLike}
          className={`text-2xl font-bold transition ${
            liked ? "text-black" : "text-white border border-black"
          }`}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            textAlign: "center",
            lineHeight: "36px",
            backgroundColor: liked ? "white" : "black",
          }}
        >
          ♥
        </button>
        <span className="text-gray-700">
          {language === "ko" ? "좋아요" : "Likes"} {post.likes}
        </span>
      </div>

      <p className="mt-6 text-sm text-gray-400">
        {language === "ko" ? "언어" : "Language"}: {post.language.toUpperCase()}
      </p>
    </div>
  );
}
