import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Checkbox, Select } from "antd";

export default function WalletCreate() {
  const translate = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm();

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionLabel: "email",
    optionValue: "id",
  });

  return (
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
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
              name={["balance"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={translate("wallets.fields.user")}
              name={"user"}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Select {...userSelectProps} />
          </Form.Item>
        </Form>
      </Create>
  );
};

/*export default function WalletCreate() {
  return <AntdCreateInferencer />;
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
