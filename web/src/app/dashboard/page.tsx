import { getBlogPosts } from "@/application/blog";
import { CreateNewPost } from "@/components/dashboard/create-post/create-new-post";
import { BlogPost } from "@/data-access/repositories/blog-repository";
import { specialFont } from "@/lib/fonts";
import Link from "next/link";

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

        {/* Table */}
        <div className="bg-white p-4 grid grid-cols-[40%_1fr_1fr_1fr] shadow-sm rounded-lg overflow-hidden">
          <TableHeader className="pl-2">Title</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Date</TableHeader>
          <TableHeader className="text-right pr-2">Actions</TableHeader>

          {posts.map((post) => (
            <ListedPost key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}

const TableHeader = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <div className={`pb-2 font-semibold text-gray-700 ${className}`}>
      {children}
    </div>
  );
}

const ListedPost = ({ id, title, published_at }: BlogPost) => {

  return (
    <Link
      href={`/dashboard/posts/${id}`}
      className="grid hover:bg-gray-50 rounded-md cursor-pointer grid-cols-[40%_1fr_1fr_1fr] p-2 col-span-4"
    >
      <span className="pr-2 truncate">{title}</span>
      <span className="truncate">{published_at ? "Published" : "Draft"}</span>
      <span className="truncate">{published_at && new Date(published_at).toLocaleDateString()}</span>
    </Link >
  );
}
