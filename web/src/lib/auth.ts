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
