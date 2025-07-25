import { redirect } from "next/navigation";

import { verifyUser } from "~/entities/user";

import styles from "./Layout.module.css";

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isAuth = await verifyUser();

  if (!isAuth) {
    redirect("/");
  }

  return <main className={styles.Layout}>{children}</main>;
}
