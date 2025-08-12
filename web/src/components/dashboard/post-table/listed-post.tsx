import { deletePostAction } from "@/actions/delete-post-action";
import { useTableStore } from "@/application/stores/table-store";
import { BlogPostMetadata } from "@/data-access/repositories/blog-repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const ListedPost = ({ id, title, published_at }: BlogPostMetadata) => {
  const [hovered, setHovered] = useState(false);

  const publishedStyle = "bg-green-200 text-green-800 border-green-400"
  const draftStyle = "bg-yellow-100 text-yellow-800 border-yellow-400";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="grid hover:bg-gray-50 rounded-md grid-cols-[40%_1fr_1fr_1fr] p-2 col-span-4"
    >

      <Link
        href={`/dashboard/posts/${id}`}
        className="pr-2 truncate hover:underline w-fit"
      >
        {title}
      </Link>

      <span className={`border rounded-md w-fit px-1 text-sm ${published_at ? publishedStyle : draftStyle}`}>{published_at ? "Published" : "Draft"}</span>
      <span className="truncate">{published_at && new Date(published_at).toLocaleDateString()}</span>
      {
        hovered &&
        <DeleteButton postId={id} />
      }
    </div >
  );
}

const DeleteButton = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState(false);
  const { deletePost } = useTableStore();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deletePostAction(postId),
    onSuccess: () => {
      setOpen(false);
      deletePost(postId);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    }
  })

  const { isPending, error } = mutation;

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(false);
  };

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    mutation.mutate();
  };

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex justify-end items-center text-right">
        <button
          className="text-red-600 hover:text-red-800"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          <Trash2Icon size={18} />
        </button>
      </div>

      {
        open && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this post?</h2>
              {
                error &&
                <span className="text-red-500">Error: {error.message}</span>
              }
              <div className={`${isPending ? "opacity-50" : ""} flex justify-end gap-3`}>
                <button
                  disabled={isPending}
                  onClick={onCancel}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  disabled={isPending}
                  onClick={onConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
