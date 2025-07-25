import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox } from "antd";

export default function WalletEdit() {
  const translate = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm();

  const walletsData = queryResult?.data?.data;

  return (
      <Edit saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
          <Form.Item
              label={translate("wallets.fields.id")}
              name={["id"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input readOnly disabled />
          </Form.Item>
          <Form.Item
              label={translate("wallets.fields.address")}
              name={["address"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={translate("wallets.fields.xpubIndex")}
              name={["xpubIndex"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={translate("wallets.fields.expired")}
              valuePropName="checked"
              name={["expired"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Checkbox>Expired</Checkbox>
          </Form.Item>
          <Form.Item
              label={translate("wallets.fields.amount")}
              name={["amount"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Edit>
  );
};

/*export default function WalletEdit() {
  return <AntdEditInferencer />;
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
