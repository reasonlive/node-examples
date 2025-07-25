"use client";

import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter } from "next-nprogress-bar";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button, Input, LoadingSpinner } from "~/shared/ui";

import { login } from "../../api";
import styles from "./AuthForm.module.css";

type AuthFormState = {
  email: string;
  password: string;
};

const onError = (error: any) => {
  switch (error?.message) {
    case "wrong email or password": {
      toast("❌ Ошибка: Неверная почта или пароль");
      break;
    }
    default: {
      toast("❌ Ошибка при запросе входа, попробуйте повторить позже");
    }
  }
};

export const LoginForm = () => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: login,
    onError,
  });

  const router = useRouter();
  const onSubmit = async (data: AuthFormState) => {
    await mutateAsync(data);
    router.push("/");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        className={styles.input}
        label="Почта"
        placeholder="Введите почту"
        type="text"
        {...register("email", { required: true })}
      />
      <Input
        className={styles.input}
        label="Пароль"
        placeholder="Введите пароль"
        type="password"
        {...register("password", { required: true })}
      />

      <Button
        className={clsx(
          styles.authButton,
          isSuccess && styles.authButton_success,
        )}
        disabled={isPending}
        type="submit"
      >
        {isSuccess ? `Вход выполнен...` : `Войти`}
        {(isPending || isSuccess) && (
          <LoadingSpinner className={styles.loading} />
        )}
      </Button>
    </form>
  );
};
