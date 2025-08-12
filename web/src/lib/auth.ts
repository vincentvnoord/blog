import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export function isAuthorized(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const clientKey = authHeader.split(" ")[1];
  const serverKey = process.env.API_KEY;
  if (!serverKey || clientKey !== serverKey) {
    return false;
  }

  return true;
}



/**
 * This function checks if the user is authenticated.
 * @returns The session object if authenticated, otherwise redirects to login.
 */
export async function requireAuth() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return session;
}
