import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-lg font-bold">
          <Link href="/">Hunting Coder</Link>
        </div>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-200">Home</Link>
          <Link href="/about" className="hover:text-gray-200">About</Link>
          <Link href="/blogs" className="hover:text-gray-200">Blogs</Link>
          <Link href="/contact" className="hover:text-gray-200">Contact</Link>
        </div>
      </div>
    </nav>
  );
}