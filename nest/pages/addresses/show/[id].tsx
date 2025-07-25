import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import React, {useState} from "react";
import {
  IResourceComponentsProps, useMany,
  useShow,
  useTranslate,
} from "@refinedev/core";
import {
  Show,
  NumberField,
  TagField,
  EmailField,
  TextField,
  UrlField, BooleanField,
} from "@refinedev/antd";
import {Button, Divider, Input, Space, Typography} from "antd";
import config from "../../../src/config";

const { Title } = Typography;

export default function AddressShow() {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  /*const { data: tokenWalletsData, isLoading: tokenWalletsIsLoading } = useMany({
        resource: "tokenWallets",
        ids: record?.tokenWallets || [],
        queryOptions: {
          enabled: !!record && !!record?.tokenWallets?.length,
        },
  });*/

  const [privateKey, setPrivateKey] = useState('');

  const showPrivateKey = async () => {
      const secret = (document.getElementById('secret_field') as HTMLInputElement)?.value;
      const path = record?.path;

      const result = await fetch((config.ENV == 'dev' ? config.API_URL_DEV : config.API_URL_PROD) + '/crud/addresses/key', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({secret, path})
      })

      setPrivateKey((await result?.json())?.key ?? '');
  }

  return (
      <Show isLoading={isLoading}>
        <Title level={5}>{translate("addresses.fields.id")}</Title>
        <NumberField value={record?.id ?? ""} />
        <Title level={5}>{translate("addresses.fields.val")}</Title>
        <TextField value={record?.val ?? ""} />
        <Title level={5}>{translate("addresses.fields.path")}</Title>
        <TextField value={record?.path} />
        <Title level={5}>{translate("addresses.fields.format")}</Title>
        <TextField value={record?.format} />
        <Title level={5}>{translate("addresses.fields.type")}</Title>
        <TextField value={record?.type == 1 ? 'Static' : 'Dynamic'} />
        <Title level={5}>{translate("addresses.fields.expiredAt")}</Title>
        <TextField value={record?.expiredAt?.toString()} />
        <Title level={5}>
          {translate("addresses.fields.isObservable")}
        </Title>
        <BooleanField value={record?.isObservable} />
        <Title level={5}>{translate("addresses.fields.balance")}</Title>
        <NumberField value={record?.balance ?? ""} />
        <Title level={5}>{translate("addresses.fields.xpub")}</Title>
        <TextField value={record?.xpub?.coin?.name} />
        <Title level={5}>{translate("addresses.fields.account")}</Title>
        <TextField value={record?.account?.user?.email} />
        <Title level={5}>
          {translate("addresses.fields.tokenWallets")}
        </Title>
        <Divider />
        <Title level={5}>Show private key of address</Title>
        <Input id="secret_field" placeholder={'enter mnemonic phrase or seed'}  />
        <Space size={'large'}>
            <Button style={{marginTop: 5, marginBottom: 5}}  onClick={() => showPrivateKey()} > Show </Button>
            <TextField value={privateKey} />
        </Space>
      </Show>
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
