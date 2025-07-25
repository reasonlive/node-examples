import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox } from "antd";

export default function XpubCreate() {
  const translate = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm();

  return (
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
          <Form.Item
              label={translate("xpubs.fields.val")}
              name="val"
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item
              label={translate("xpubs.fields.protocolIndex")}
              name={["protocolIndex"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={translate("xpubs.fields.accountIndex")}
              name={["accountIndex"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={translate("xpubs.fields.walletsIndex")}
              name={["walletsIndex"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={translate("xpubs.fields.addressesIndex")}
              name={["addressesIndex"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={"Coin"}
              valuePropName="checked"
              name={["expired"]}
              rules={[
                {
                  required: false,
                },
              ]}
          >
            <Checkbox>Expired</Checkbox>
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
