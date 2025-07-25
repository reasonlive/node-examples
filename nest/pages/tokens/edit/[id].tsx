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

export default function TokenEdit() {
  const translate = useTranslate();
  const {
    formProps,
    saveButtonProps,
    queryResult
  } = useForm();


  const {open} = useNotification();
  const record = queryResult?.data?.data;

  return (
      <Edit isLoading={queryResult?.isLoading ?? true} saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">`
          <Form.Item
              label={translate("accounts.fields.id")}
              name={["id"]}
              rules={[
                {
                  required: false,
                },
              ]}
          >
            <Input readOnly disabled />
          </Form.Item>
            <Form.Item
                label={translate("accounts.fields.name")}
                name={["name"]}
            >
                <Input />
            </Form.Item>
          <Form.Item
              label={translate("accounts.fields.user")}
              name={["userEmail"]}

          >
            <Input readOnly disabled value={record?.user?.email ?? 'some'} />
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
            <Input />
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
      </Edit>
  );
};

/*export default function AccountEdit() {
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
