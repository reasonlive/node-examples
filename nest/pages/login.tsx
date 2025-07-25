import {AuthPage} from "@components/pages/auth";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {NavigateToResource} from "@refinedev/nextjs-router";
import {useLogin} from '@refinedev/core';

export default function Login() {
  return <AuthPage type="login"/>
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  return {
    props: {
      ...translateProps,
    },
  };
};

Login.noLayout = true;
