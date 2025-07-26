export default async function BlogPost({ params }) {
  const slugs = await params;
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Blog Post</h1>
      <p className="mt-4 text-gray-700">
        Slug: <span className="font-mono">{slugs.slug}</span>
      </p>
    </div>
  );
}