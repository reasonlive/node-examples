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
    BooleanField,
    UrlField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export default function TokenWalletShow() {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
        <Title level={5}>{translate("tokenWallets.fields.id")}</Title>
        <NumberField value={record?.id ?? ""} />
        <Title level={5}>{translate("tokenWallets.fields.address")}</Title>
        <TextField value={record?.address?.val} />
        <Title level={5}>{translate("tokenWallets.fields.balance")}</Title>
        <NumberField value={record?.balance ?? ""} />
        <Title level={5}>{translate("tokenWallets.fields.token")}</Title>
        <TextField value={record?.token?.name + ` (${record?.token?.standard})`} />
        <Title level={5}>{translate("tokenWallets.fields.user")}</Title>
          <UrlField
              value={record?.wallet?.user?.email}
              href={'/users/show/' + record?.wallet?.user?.id}
          />
      </Show>
  );
};

/*export default function WalletShow() {
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
