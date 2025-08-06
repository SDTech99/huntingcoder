// pages/about.js
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Hunting Coder</title>
        <meta name="description" content="About Hunting Coder and its creator, Syed Dawar." />
      </Head>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>

        <p className="text-lg mb-4">
          Welcome to <strong>Hunting Coder</strong> — a blog and platform where we explore the world of web development,
          coding best practices, and real-world project solutions.
        </p>

        <p className="text-lg mb-4">
          I'm <strong>Syed Dawar</strong>, a passionate full stack developer. This platform is where I share tutorials,
          code examples, and thoughts on modern technologies like <strong>Next.js, Node.js, React, MongoDB</strong> and more.
        </p>

        <p className="text-lg mb-4">
          Hunting Coder is more than just a blog. It's a developer's journey — always learning, always improving,
          and always hunting for better solutions.
        </p>

        <p className="text-lg">
          Thanks for visiting, and feel free to explore the content or connect with me for collaboration.
        </p>
      </main>
    </>
  );
}