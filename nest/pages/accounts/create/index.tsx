import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import React, {useState} from "react";
import {useTranslate} from "@refinedev/core";
import {Create, useForm, useTable, useSelect} from "@refinedev/antd";
import {Button, Form, Input, Select} from "antd";
import {v4} from "uuid";
import bcrypt from "bcryptjs";
import {UserRole} from '../../../src/enums/role';

export default function AccountCreate() {
  const translate = useTranslate();
  const {
    formProps,
    saveButtonProps,
    queryResult
  } = useForm();

  const {tableProps} = useTable();

    const { selectProps: userSelectProps } = useSelect({
        resource: "users",
        optionLabel: "email",
        optionValue: "id",
    });

  return (
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
            <Form.Item
                label={translate("accounts.fields.name")}
                name={["name"]}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={translate("accounts.fields.user")}
                name={["user"]}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    {...userSelectProps}
                />

            </Form.Item>
          <Form.Item
              label={translate("accounts.fields.mdr")}
              name={["mdr"]}
              rules={[
                {
                  required: false,
                },
              ]}
          >
            <Input type={'number'} />
          </Form.Item>
            <Form.Item
                label={translate("accounts.fields.callbackUrl")}
                name={["callbackUrl"]}
                rules={[
                    {
                        required: false,
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
      </Create>
  );
};

/*export default function AccountCreate() {
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
