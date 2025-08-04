"use client";

import { AnimatePresence, motion } from "motion/react";
import { CloudUpload } from "lucide-react";
import { BlogPost } from "@/components/blog-post";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export const PostContentInput = () => {
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const { register, setValue } = useFormContext();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setContent(e.target.result as string);
          setValue("content", e.target.result as string);
          setValue("title", file.name.replace(/\.md$/, ""));
        }
      };

      reader.readAsText(file);
    }

  }, [file, setValue]);

  return (
    <>
      {
        file !== null &&
        <div className="flex flex-col gap-2 w-full">
          <input type="text" {...register("title")} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none" placeholder="Title of Post" />
          <input type="text" {...register("description")} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none" placeholder="Description" />
        </div>
      }
      <div className="rounded-lg overflow-hidden w-full max-h-96 overflow-y-auto max-w-lg outline-gray-400 outline-dashed outline-[2px] relative">
        <input
          {...register("content")}
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile && selectedFile.type === "text/markdown") {
              setFile(selectedFile);
            } else {
              console.error("Please select a valid markdown file.");
              setFile(null);
            }
          }}
          type="file"
          className="opacity-0 cursor-pointer absolute w-full h-full"
        />
        <AnimatePresence
          mode="popLayout"
        >
          {
            file !== null ?
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                exit={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={"selected-file"}
                className="flex flex-col h-full w-full items-center justify-center gap-2 text-gray-500 p-4"
              >
                <span className="text-sm">Selected File:</span>
                <span className="font-semibold">{file.name}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFile(null);
                  }}
                  className="z-40 text-red-400">
                  Remove File
                </button>
                <input type="text" {...register("content")} />

                <BlogPost content={file ? content : ""} />
              </motion.div>
              :
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                exit={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={"no-selected-file"}
                className="flex flex-col h-full w-full items-center justify-center gap-2 text-gray-500 p-4"
              >
                <CloudUpload size={48} />
                <span>
                  Drag and drop a markdown file here or click to select
                </span>
              </motion.div>
          }
        </AnimatePresence>
      </div>
    </>
  )
}
