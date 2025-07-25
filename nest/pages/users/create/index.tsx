import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import React, {useState} from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import {Button, Form, Input, Select} from "antd";
import {v4} from "uuid";
import bcrypt from "bcryptjs";
import {UserRole} from '../../../src/enums/role';

export default function UserCreate() {
  const translate = useTranslate();
  const {
    formProps,
    saveButtonProps,
    queryResult
  } = useForm();

  const [apiKeyValue, setApiKeyValue] = useState(formProps?.form?.getFieldValue('apiKey'));
  saveButtonProps.onMouseDown = (event) => {
      if (formProps?.form) {
          formProps.form.setFieldValue('apiKey', apiKeyValue);

          if (!formProps.form.getFieldValue('password').toString().match(/^\$.{2}\$.{2}\$.*/)) {
                formProps.form.setFieldValue('password', bcrypt.hashSync(formProps.form.getFieldValue('password'), 10))
          }
      }
  }

  return (
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
          <Form.Item
              label={translate("users.fields.email")}
              name={["email"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={translate("users.fields.password")}
              name={["password"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={translate("users.fields.apiKey")}
              name={["apiKey"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
              <Input value={apiKeyValue ?? formProps?.form?.getFieldValue('apiKey')}/>
              <Button
                  onClick={() => setApiKeyValue(v4())}
              >
                {translate("users.apiKeyButtonValue")}
              </Button>
          </Form.Item>
            <Form.Item
                label={translate("users.fields.roles")}
                name={["roles"]}
            >
                <Select
                    mode={'multiple'}
                    options={Object.values(UserRole).map((item: any, idx: any) => {
                        return {label: item, value: item}
                    })}
                />

            </Form.Item>
          <Form.Item
            label={"Account"}
            name={["account"]}
          >
            <Select
              mode={'multiple'}
              options={Object.values(UserRole).map((item: any, idx: any) => {
                return {label: item, value: item}
              })}
            />

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
