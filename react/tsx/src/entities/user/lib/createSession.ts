"use server";

import { cookies } from "next/headers";
import "server-only";

export async function createSession(accessToken: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookies().set("accessToken", accessToken, {
    expires: expiresAt,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: false,
  });
}
