import { useEffect, useState } from "react";
import Link from "next/link";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async (search) => {
    const res = await fetch(`http://localhost:5000/api/posts?q=${search}`);
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts("");
  }, []);

  const handleSearch = () => {
    fetchPosts(searchTerm);
    setQuery(searchTerm);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">글 목록</h1>

      {/* 검색창 + 버튼튼*/}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="border px-4 py-2 w-full rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          검색
        </button>
      </div>

      {/*검색어 표시 */}
      {query && (
        <p className="text-gray-600 mb-2">
          검색어: <span className="font-medium">{query}</span>
        </p>
      )}

      {/*결과 */}
      {posts.length === 0 ? (
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="border p-4 rounded">
              <Link
                href={`/posts/${post._id}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">
                작성일: {new Date(post.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-700">{post.body.slice(0, 100)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
