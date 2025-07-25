"use server";

import { cookies } from "next/headers";
import "server-only";

export async function getSession() {
  const accessToken = cookies().get("accessToken");
  if (!accessToken?.value) {
    return false;
  }
  return accessToken.value;
}
