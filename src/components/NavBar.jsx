import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 flex gap-6 text-lg">
      <Link href="/" className="hover:underline">
        홈
      </Link>
      <Link href="/posts" className="hover:underline">
        글 목록
      </Link>
      <Link href="/write" className="hover:underline">
        글 작성
      </Link>
    </nav>
  );
};

export default NavBar;
