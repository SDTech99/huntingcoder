import Link from "next/link";

export default function Blog() {
  const currentYear = new Date().getFullYear();

  const blogs = [
    "angular",
    "C",
    "Django",
    "Docker",
    "Electron",
    "Expo",
    "Firebase",
    "Git-GitHub",
    "GraphQL",
    "HTML-CSS",
    "java",
    "javascript",
    "JWT-authentication",
    "mongoDB",
    "MySQL",
    "Nextjs",
    "nodejs-expressjs",
    "PostgreSQL",
    "Postman",
    "python",
    "react",
    "Redux",
    "RestApi",
    "Tailwind",
    "Typescript",
    "Vite",
    "WebSockets",
    "Zustand",
    "CSharp"
    ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((topic) => (
          <div
            key={topic}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <Link href={`/blogpost/how-to-learn-${topic.toLowerCase()}`}>
              <h3 className="text-lg font-semibold text-blue-600 hover:underline">
                How to learn {topic.replace(/-/g, " ").replace("C++", "C++")} in {currentYear}?
              </h3>
            </Link>
            <p className="text-sm text-gray-700 mt-2">
              Learn {topic.replace(/-/g, " ")} from scratch in just 15 minutes!
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}