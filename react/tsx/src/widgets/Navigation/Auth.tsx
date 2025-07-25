"use client";

import clsx from "clsx";
import { useState } from "react";

import { AuthForm } from "~/entities/user";
import { PlusIcon } from "~/shared/assets";
import { Button } from "~/shared/ui";
import { Dialog, DialogContent } from "~/shared/ui/Dialog";

import styles from "./Auth.module.css";

export const Auth = () => {
  const [authModalType, setAuthModalType] = useState<
    "closed" | "login" | "register"
  >("closed");

  const openAuthModal =
    (authType: "login" | "register") =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setAuthModalType(authType);
    };
  const closeModal = () => setAuthModalType("closed");

  return (
    <div className={styles.Auth}>
      <Button
        className={clsx(styles.authButton, styles.authLogin)}
        onClick={openAuthModal("login")}
      >{`Вход`}</Button>

      <Button
        className={clsx(styles.authButton, styles.authSignIn)}
        onClick={openAuthModal("register")}
      >
        <span className={styles.icon_wrapper}>
          <PlusIcon className={styles.authSignInIcon} />
        </span>
        {`Регистрация`}
      </Button>

      <Dialog onOpenChange={closeModal} open={authModalType !== "closed"}>
        <DialogContent>
          <AuthForm
            authVariant={authModalType as "login" | "register"}
            className={styles.authForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
