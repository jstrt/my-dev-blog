import { useEffect, useState } from "react";
import Link from "next/link";
import LanguageToggle from "../../src/components/LanguageToggle";
import { useLanguage } from "../../src/context/LanguageContext";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { language } = useLanguage();

  // 포스트 불러오기
  const fetchPosts = async (search) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts?q=${search}`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("포스트 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchPosts("");
  }, []);

  // 검색 버튼
  const handleSearch = () => {
    fetchPosts(searchTerm);
    setQuery(searchTerm);
  };

  // 언어 필터링
  const filteredPosts = posts.filter((post) => post.language === language);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <LanguageToggle />

      <h1 className="text-2xl font-bold mb-4">
        {language === "ko" ? "글 목록" : "Post List"}
      </h1>

      {/* 검색창 */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder={language === "ko" ? "검색어를 입력하세요" : "Search..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="border px-4 py-2 w-full rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {language === "ko" ? "검색" : "Search"}
        </button>
      </div>

      {/* 검색어 표시 */}
      {query && (
        <p className="text-gray-600 mb-2">
          {language === "ko" ? "검색어:" : "Search term:"}{" "}
          <span className="font-medium">{query}</span>
        </p>
      )}

      {/* 글 리스트 */}
      {filteredPosts.length === 0 ? (
        <p className="text-gray-500">
          {language === "ko" ? "검색 결과가 없습니다." : "No posts found."}
        </p>
      ) : (
        <ul className="space-y-4">
          {filteredPosts.map((post) => (
            <li key={post._id} className="border p-4 rounded">
              <Link
                href={`/posts/${post._id}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">
                {language === "ko" ? "작성일:" : "Created at:"}{" "}
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-700">{post.body.slice(0, 100)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
