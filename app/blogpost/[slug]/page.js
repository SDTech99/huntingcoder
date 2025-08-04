
import fs from 'fs/promises';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const files = await fs.readdir(path.join(process.cwd(), 'app/blogsData'));
  return files.map((file) => ({
    slug: file.replace('.json', ''),
  }));
}

export default async function BlogPost({ params }) {
  const slugs = await params;
  const filePath = path.join(process.cwd(), 'app/blogsData', `${slugs.slug}.json`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const blog = JSON.parse(fileContent);

    if (!blog) {
      return <div className="text-center text-red-600">Blog post not found.</div>;
    }

    return (
      <div className="prose lg:prose-xl max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
        <p className="text-sm mt-8">By {blog.author}</p>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    return (
      <div className="text-center text-red-600 py-10">
        Error loading blog post. Please try again later.
      </div>
    );
  }
}