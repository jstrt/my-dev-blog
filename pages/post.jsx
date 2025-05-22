import { useEffect, useState } from "react";
import { useLanguage } from "../src/context/LanguageContext";
import LanguageToggle from "../src/components/LanguageToggle";
import Link from "next/link";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("포스트 불러오기 실패:", err);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => post.language === language);

  return (
    <div style={{ padding: "2rem" }}>
      <LanguageToggle />
      <h1>{language === "ko" ? "글 목록" : "Post List"}</h1>
      <ul>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <li key={post.id} style={{ marginBottom: "1rem" }}>
              <strong>{post.title}</strong>
              {/* 추후 상세 페이지 연결 가능: <Link href={`/posts/${post.id}`}>... */}
            </li>
          ))
        ) : (
          <p>{language === "ko" ? "글이 없습니다." : "No posts found."}</p>
        )}
      </ul>
    </div>
  );
}
