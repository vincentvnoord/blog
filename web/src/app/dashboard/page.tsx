import { getBlogPosts } from "@/application/blog";
import { CreateNewPost } from "@/components/dashboard/create-post/create-new-post";
import { PostTable } from "@/components/dashboard/post-table/post-table";
import { specialFont } from "@/lib/fonts";

export default async function DashboardPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between mb-6">
          <h1 className={`${specialFont.className} text-3xl font-bold text-gray-800`}>Blog Dashboard</h1>
          <CreateNewPost />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
          {[
            { label: "Total Posts", value: 42, color: "bg-blue-100 text-blue-800" },
            { label: "Drafts", value: 8, color: "bg-yellow-100 text-yellow-800" },
            { label: "Published", value: 34, color: "bg-green-100 text-green-800" },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-4 rounded-lg shadow-sm bg-white">
              <div className="text-sm text-gray-500">{label}</div>
              <div className={`mt-1 text-2xl font-semibold ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        <PostTable initialPosts={posts} />
      </div>
    </div>
  );
}
