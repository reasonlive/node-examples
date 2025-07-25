import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import React from "react";
import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import {
    Show,
    NumberField,
    TagField,
    TextField,
    BooleanField, UrlField,
} from "@refinedev/antd";
import {Anchor, Typography } from "antd";

const { Title } = Typography;

export default function WalletShow() {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
        <Title level={5}>{translate("wallets.fields.id")}</Title>
        <NumberField value={record?.id ?? ""} />
        <Title level={5}>{translate("wallets.fields.address")}</Title>
        <TextField value={record?.address} />
        <Title level={5}>{translate("wallets.fields.amount")}</Title>
        <NumberField value={record?.amount ?? ""} />
        <Title level={5}>{translate("wallets.fields.coin")}</Title>
        <TextField value={record?.xpub?.coin?.name ?? ""} />
        <Title level={5}>{translate("wallets.fields.user")}</Title>
        <UrlField
            value={record?.user?.email}
            href={'/users/show/' + record?.user?.id}
        />
        <Title level={5}>{translate("wallets.fields.xpubIndex")}</Title>
        <NumberField value={record?.xpubIndex ?? ""} />
        <Title level={5}>{translate("wallets.fields.expired")}</Title>
        <BooleanField value={record?.expired} />

      </Show>
  );
};

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
