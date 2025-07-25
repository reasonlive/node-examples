"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next-nprogress-bar";

import { deleteSession } from "~/entities/user";
import { Button } from "~/shared/ui";

import styles from "./SignOut.module.css";

export const SignOut = () => {
  const router = useRouter();

  const signOut = async () => {
    await deleteSession();
    router.push("/");
    window.location.reload();
  };

  return (
    <Button className={styles.SignOut} onClick={signOut}>
      Выйти <LogOut className={styles.icon} />
    </Button>
  );
};
