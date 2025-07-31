import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <h1 className="text-4xl font-bold text-center my-6 text-gray-800">Hunting Coder</h1>
      <Image src="/images/HomeImg.webp" alt="" priority  width={600} height={400} className="rounded-lg shadow-md mx-auto" />
      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Latest Blogs</h2>

        <div className="space-y-6">
          <div><Link href="/blogpost/how-to-learn-javascript">
            <h3 className="text-xl font-bold">How to learn JavaScript in {currentYear}?</h3></Link>
            <p className="text-gray-700">JavaScript is the language used to design logic for the web</p>
          </div>
          <div><Link href="/blogpost/how-to-learn-react">
            <h3 className="text-xl font-bold">How to learn React in {currentYear}?</h3></Link>
            <p className="text-gray-700">React is a JavaScript library for building user interfaces</p>
          </div>
          <div><Link href="/blogpost/how-to-learn-nextjs">
            <h3 className="text-xl font-bold">How to learn Next.js in {currentYear}?</h3></Link>
            <p className="text-gray-700">Next.js is a React framework for building server-side rendered applications</p>
          </div>         
        </div>
      </div>

    </>
  );
}
