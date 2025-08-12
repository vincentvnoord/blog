import { CreateNewPost } from "@/components/dashboard/create-post/create-new-post";
import { PostTable } from "@/components/dashboard/post-table/post-table";
import { specialFont } from "@/lib/fonts";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function DashboardPage() {
  const user = await getServerSession();

  if (user === null) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="my-6 flex items-center">
          <div>
            <Image
              src={user.user?.image || "/default-avatar.png"}
              alt="User Avatar"
              width={500}
              height={500}
              className="w-20 h-20 rounded-full mr-4"
            />
          </div>
          <span className="text-lg font-medium text-gray-800">
            {user.user?.name}
          </span>
        </div>

        <div className="flex justify-between mb-6">
          <h1 className={`${specialFont.className} text-5xl font-bold text-gray-800`}>Your Posts</h1>
          <CreateNewPost />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
          {[
            { label: "Total Posts", value: 42, color: "bg-blue-100 text-blue-800" },
            { label: "Drafts", value: 8, color: "bg-yellow-100 text-yellow-800" },
            { label: "Published", value: 34, color: "bg-green-100 text-green-800" },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-4 rounded-lg border border-gray-200 shadow-xs bg-white">
              <div className="text-sm text-gray-500">{label}</div>
              <div className={`mt-1 text-2xl font-semibold ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        <PostTable />
      </div>
    </div>
  );
}
