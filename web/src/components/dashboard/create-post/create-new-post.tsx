"use client";

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react";
import { PostContentInput } from "./file-input";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { blogPostSchema } from "@/application/validation/validate-blog-post";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreateNewPost = () => {
  const methods = useForm<blogPostSchema>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      description: "",
      content: ""
    }
  });
  const { errors } = methods.formState;

  const [open, setOpen] = useState(true);

  useEffect(() => {
    // Show validation errors in the UI
    if (Object.keys(errors).length > 0) {
      console.group("Form Validation Errors");
      Object.entries(errors).forEach(([field, error]) => {
        console.error(`${field}: ${error?.message}`);
      });
      console.groupEnd();
    }
  }, [errors]);

  const handleSubmit = (data: FieldValues) => {
    console.log("Form submitted with data:", data);
    // Here you would typically handle the form submission, e.g., send the data to an API
    setOpen(false);
  }

  return (
    <>
      <FormProvider {...methods}>
        <div className={`${open ? "bg-black/40" : "bg-transparent pointer-events-none"} flex justify-center items-center transition-colors duration-100 ease-in inset-0 absolute z-10`}>
          <AnimatePresence>
            {
              open &&
              <motion.form
                onSubmit={methods.handleSubmit(handleSubmit)}
                initial={{ opacity: 0, y: -20 }}
                exit={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="gap-4 bg-white z-20 rounded-lg p-6 min-w-lg flex flex-col items-start">
                <h1 className="font-bold text-xl">Create New Post</h1>
                <PostContentInput />
                <div className="w-full flex justify-between items-center">

                  <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                    Create
                  </button>
                </div>
              </motion.form>
            }
          </AnimatePresence>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
          Create New Post
        </button>
      </FormProvider >
    </>
  )
}
