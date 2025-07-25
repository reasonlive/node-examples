import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Checkbox, Select } from "antd";

export default function TokenWalletCreate() {
  const translate = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm();

  const { selectProps: usersSelectProps } = useSelect({
    resource: "users",
    optionLabel: "email",
    optionValue: "id",
  });

  return (
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
          <Form.Item
              label={translate("tokenWallets.fields.address")}
              name={["address", "val"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={translate("tokenWallets.fields.amount")}
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
              label={translate("tokenWallets.fields.user")}
              name={["address", "user", "email"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Select {...usersSelectProps} />
          </Form.Item>
        </Form>
      </Create>
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
