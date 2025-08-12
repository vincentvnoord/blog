import { CreateNewPost } from "@/components/dashboard/create-post/create-new-post";
import { PostTable } from "@/components/dashboard/post-table/post-table";
import { specialFont } from "@/lib/fonts";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Statistics } from "@/components/dashboard/stats";

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

        <Statistics />

        <PostTable />
      </div>
    </div>
  );
}
