"use client";

import { signIn } from "next-auth/react";

export const GitHubLogin = () => {
  const handleSignIn = () => {
    signIn("github", { callbackUrl: `${window.location.origin}/dashboard` });
  }

  return (
    <button
      onClick={handleSignIn}
      className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Sign in with GitHub
    </button>
  )
}
