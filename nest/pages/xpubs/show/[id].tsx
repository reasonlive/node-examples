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
  MarkdownField,
  TagField,
  BooleanField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export default function XpubShow() {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
        <Title level={5}>{translate("xpubs.fields.id")}</Title>
        <NumberField value={record?.id ?? ""} />
        <Title level={5}>{translate("xpubs.fields.val")}</Title>
        <MarkdownField value={record?.xKey} />
        <Title level={5}>{translate("xpubs.fields.protocolIndex")}</Title>
        <NumberField value={record?.protocolIndex ?? ""} />
        <Title level={5}>{translate("xpubs.fields.accountIndex")}</Title>
        <NumberField value={record?.accountIndex ?? ""} />
        <Title level={5}>{translate("xpubs.fields.walletsIndex")}</Title>
        <NumberField value={record?.walletsIndex ?? ""} />
        <Title level={5}>{translate("xpubs.fields.addressesIndex")}</Title>
        <NumberField value={record?.addressesIndex ?? ""} />
        <Title level={5}>{translate("xpubs.fields.expired")}</Title>
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
