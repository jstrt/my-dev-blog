import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLanguage } from "../../src/context/LanguageContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { language } = useLanguage();

  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // 좋아요 상태 로컬에서 불러오기
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    setLiked(likedPosts[id] === true);
  }, [id]);

  // 포스트와 댓글 로딩
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`);
      const data = await res.json();
      setPost(data);
    };

    const fetchComments = async () => {
      const res = await fetch(
        `http://localhost:5000/api/comments?postId=${id}`
      );
      const data = await res.json();
      setComments(data);
    };

    fetchPost();
    fetchComments();
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

    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
    likedPosts[id] = newLiked;
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

    await fetch(`http://localhost:5000/api/posts/${id}/like`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ like: newLiked }),
    });
  };

  // 댓글 등록
  const submitComment = async () => {
    if (!newComment.trim()) return;

    const res = await fetch(`http://localhost:5000/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: id, content: newComment }),
    });

    if (res.ok) {
      setNewComment("");
      const data = await res.json();
      setComments([data, ...comments]);
    } else {
      alert("댓글 등록 실패");
    }
  };

  if (!post) return <p className="p-6">로딩 중...</p>;

  const handleDeleteComment = async (commentId) => {
    const ok = confirm("이 댓글을 삭제할까요?");
    if (!ok) return;

    const res = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } else {
      alert("삭제 실패");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/posts" className="text-blue-500 hover:underline">
        ← {language === "ko" ? "글 목록으로" : "Back to list"}
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-2">
        {new Date(post.createdAt).toLocaleString()}
      </p>

      <div className="prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {post.body}
        </ReactMarkdown>
      </div>

      {/* 좋아요 버튼 */}
      <div className="flex items-center gap-2 my-6">
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

      {/* 수정/삭제 버튼 */}
      <div className="flex gap-2 mb-8">
        <Link href={`/posts/${id}/edit`}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
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
              router.push("/posts");
            } else {
              alert("삭제 실패");
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          삭제하기
        </button>
      </div>

      {/* 댓글 입력 */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">댓글</h2>
        <textarea
          className="w-full border p-2 mb-2"
          rows={3}
          placeholder="댓글을 입력하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={submitComment}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          등록
        </button>

        {/* 댓글 목록 */}
        <ul className="mt-4 space-y-3">
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="border p-2 rounded bg-white flex justify-between item-start"
            >
              <div>
                <p>{comment.content}</p>
                <p className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="text-red-500 text-sm ml-4"
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
