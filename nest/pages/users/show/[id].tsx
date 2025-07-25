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

export default function UserShow() {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
        <Title level={5}>{translate("users.fields.id")}</Title>
        <NumberField value={record?.id ?? ""} />
          <Title level={5}>{translate("users.fields.account")}</Title>
          <UrlField value={record?.account?.name} href={'/accounts/show/' + record?.account?.id}/>
        <Title level={5}>{translate("users.fields.email")}</Title>
        <EmailField value={record?.email} />
        <Title level={5}>{translate("users.fields.password")}</Title>
        <TextField value={record?.password} />
        <Title level={5}>{translate("users.fields.apiKey")}</Title>
        <TextField value={record?.apiKey} />
        <Title level={5}>{translate("users.fields.roles")}</Title>
        {record?.roles?.map((item: any) => (
            <TagField value={item} key={item} />
        ))}
      </Show>
  );
};

/*export default function UserShow() {
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
