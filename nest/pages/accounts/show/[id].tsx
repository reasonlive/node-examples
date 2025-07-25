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
  EmailField,
  TextField,
  UrlField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export default function AccountShow() {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
        <Title level={5}>{translate("accounts.fields.id")}</Title>
        <NumberField value={record?.id ?? ""} />
          <Title level={5}>{translate("accounts.fields.name")}</Title>
          <TextField value={record?.name} />
        <Title level={5}>{translate("accounts.fields.user")}</Title>
        <UrlField value={record?.user.email} href={'/users/show/' + record?.user.id}/>
        <Title level={5}>{translate("accounts.fields.mdr")}</Title>
        <NumberField value={record?.mdr} />
        <Title level={5}>{translate("accounts.fields.callbackUrl")}</Title>
        <TextField value={record?.callbackUrl} />
      </Show>
  );
};

/*export default function accountshow() {
  return <AntdShowInferencer />;
}*/

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
