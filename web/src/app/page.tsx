import { getBlogPosts } from "@/application/blog";
import { BlogPost } from "@/data-access/repositories/blog-repository";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const posts = await getBlogPosts({ published: true });

  return (
    <div className="w-full flex flex-col items-center pt-12">
      <h1 className="text-3xl font-bold w-full pl-2 max-w-5xl text-left">Recent Posts</h1>
      <div className="grid grid-cols-3 w-full max-w-5xl pt-6 gap-2">
        {posts.map((post: BlogPost) => (
          <ListedPost key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}

const ListedPost = ({ title, published_at, description, slug }: BlogPost) => {

  return (
    <Link href={`/posts/${slug}`} className="no-underline">
      <div className="hover:-translate-y-1 transition-transform duration-200 ease-in-out col-span-1 flex flex-col min-h-[200px] rounded-lg border border-gray-200 p-2 px-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-700">{description}</p>
        <div className="flex-grow w-full mt-2 rounded-lg overflow-hidden">
          <Image className="object-cover w-full" src="/images/thumb.jpg" alt="Thumbnail" width={300} height={300} />
        </div>
        <div className="w-full h-[1px] bg-gray-200 my-2" />
        {
          published_at &&
          <p className="text-sm text-gray-500">Posted on {new Date(published_at).toLocaleDateString()}</p>
        }
      </div>
    </Link>
  )
}
