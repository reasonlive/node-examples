import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, {useState} from "react";
import { IResourceComponentsProps, useTranslate, useNotification } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import {Button, Form, Input, Select} from "antd";
import {v4} from 'uuid';
import bcrypt from 'bcryptjs';
import {UserRole} from '../../../src/enums/role';
import config from '../../../src/config';
//import {UserRole} from '../../../../src/account/enums/account-role';

export default function UserEdit() {
  const translate = useTranslate();
  const {
    formProps,
    saveButtonProps,
    queryResult
  } = useForm();

  const {open} = useNotification();
  const usersData = queryResult?.data?.data;

  const [apiKeyValue, setApiKeyValue] = useState(formProps?.form?.getFieldValue('apiKey'));
  saveButtonProps.onMouseDown = (event) => {
      if (formProps?.form) {
          formProps.form.setFieldValue('apiKey', apiKeyValue);

          if (!formProps.form.getFieldValue('password').toString().match(/^\$.{2}\$.{2}\$.*/)) {
              formProps.form.setFieldValue('password', bcrypt.hashSync(formProps.form.getFieldValue('password'), 10))
          }
      }
  }

  const createUserWallets = async (id?: number) => {
    if (!id) return false;

    const result = await fetch((config.ENV == 'dev' ? config.API_URL_DEV : config.API_URL_PROD) + '/crud/wallets/create/rest/all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({userId: id})
    })

    const created = await result.json();

    open?.({
      type: created ? "success" : "error",
      message: created ? "Success" : "Error",
      description: created ? "User Wallets created successfully" : "User wallets have already created",
    });
  }

  return (
      <Edit saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">`
          <Form.Item
              label={translate("users.fields.id")}
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
                label={translate("users.fields.account")}
                name={["account.name"]}
            >
                <Input readOnly disabled />
            </Form.Item>
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
                  required: false,
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
            <Form.Item>
            <Button
                  onClick={() => createUserWallets(formProps?.form?.getFieldValue('id'))}
            >
              {translate("users.createWalletsButtonValue")}
              </Button>
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
