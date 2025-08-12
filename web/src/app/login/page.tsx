import { GitHubLogin } from "@/components/github-login";


export default function LoginPage() {

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <p className="mb-6">Please log in with your GitHub account.</p>
        <GitHubLogin />
      </div>
    </div>
  )
}
