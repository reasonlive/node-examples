"use client";

import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button, Checkbox, Input, LoadingSpinner } from "~/shared/ui";

import { signUp } from "../../api";
import { getPartnerTag } from "../../lib";
import styles from "./AuthForm.module.css";

type AuthFormState = {
  email: string;
  license: boolean;
  password: string;
  promo?: string;
};

const onError = (error: any) => {
  switch (error.message[0]) {
    case "email is already taken": {
      toast("❌ Ошибка: Данный Email уже используется");
      break;
    }
    default: {
      toast("❌ Ошибка при запросе регистрации, попробуйте повторить позже");
    }
  }
};
export const RegisterForm = () => {
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: ({
      email,
      password,
      promo,
      tag,
    }: {
      email: string;
      password?: string;
      promo?: string;
      tag?: string;
    }) => signUp({ email, password, tag }, promo),
    onError,
  });

  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      license: false,
      password: "",
      promo: "",
    },
  });

  const onSubmit = async (data: AuthFormState) => {
    if (!data.license) {
      return toast("Необходимо подтвердить условия соглашения");
    }

    const tag = await getPartnerTag();

    await mutateAsync({
      email: data.email,
      password: data.password,
      promo: data.promo,
      tag,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        className={styles.input}
        label="Почта"
        placeholder="Введите Почту"
        type="email"
        {...register("email", { required: true })}
      />
      <Input
        className={styles.input}
        label="Пароль"
        placeholder="Введите пароль"
        type="password"
        {...register("password", { required: true })}
      />
      {/* <Input
        className={styles.input}
        label="Промокод"
        placeholder="Введите промокод"
        type="text"
        {...register("promo", { required: false })}
      /> */}
      <Controller
        control={control}
        name="license"
        render={({ field: { value: checked, ...field } }) => (
          <Checkbox checked={checked} {...field}>
            Я согласен с Условиями и Соглашениями об использовании сайта
            Imba.bet
          </Checkbox>
        )}
        rules={{ required: true }}
      />

      <Button
        className={clsx(
          styles.authButton,
          isSuccess && styles.authButton_success,
        )}
        disabled={isPending}
        type="submit"
      >
        {isSuccess ? `Входим...` : `Зарегистрироваться`}
        {(isPending || isSuccess) && (
          <LoadingSpinner className={styles.loading} />
        )}
      </Button>
    </form>
  );
};
