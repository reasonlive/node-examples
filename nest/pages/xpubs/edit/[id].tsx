import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox } from "antd";

export default function XpubEdit() {
  const translate = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm();

  const xpubsData = queryResult?.data?.data;

  return (
      <Edit saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
          <Form.Item
              label={translate("xpubs.fields.id")}
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
              label={translate("xpubs.fields.expired")}
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
        </Form>
      </Edit>
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
