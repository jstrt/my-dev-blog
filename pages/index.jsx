import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">My Blog</h1>
      <p className="text-gray-400 mb-8 text-lg max-w-xl">
        글을 쓰고, 공유하고, 기록하는 공간입니다.
      </p>
      <Link href="/posts">
        <button className="px-6 py-3 border border-white hover:bg-white hover:text-black transition">
          글 목록 보기 →
        </button>
      </Link>
    </div>
  );
}
