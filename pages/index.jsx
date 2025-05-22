import LanguageToggle from "../src/components/LanguageToggle";
import { useLanguage } from "../src/context/LanguageContext";

const posts = [
  { id: 1, title: "안녕하세요", lang: "ko" },
  { id: 2, title: "Hello world", lang: "en" },
];

export default function Home() {
  const { language } = useLanguage();
  const filteredPosts = posts.filter((post) => post.lang === language);

  return (
    <div>
      <LanguageToggle />
      <h1>{language === "ko" ? "블로그 글 목록" : "Blog Posts"}</h1>
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
