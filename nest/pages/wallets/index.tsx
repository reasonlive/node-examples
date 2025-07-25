import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  useMany,
  useOne,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  BooleanField, TextField,
} from "@refinedev/antd";
import { Table, Space, Anchor } from "antd";
const {Link} = Anchor;

export default function WalletList() {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
    pagination: {
        mode: 'client',
        pageSize: 200,
    }
  });

  // TODO: make part requests instead of requiring all wallets
  if (tableProps?.dataSource) {

  }


  return (
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
              dataIndex="id"
              title={translate("wallets.fields.id")}
          />
          <Table.Column
              dataIndex="address"
              title={translate("wallets.fields.address")}
              render={(value, record: any) => (
                  <div>{record?.address?.val}</div>
              )}
          />
          <Table.Column
              dataIndex="balance"
              title={translate("wallets.fields.balance")}
              render={(value, record: any) => (
                  <div>{record?.address?.balance}</div>
              )}
          />
          <Table.Column
              dataIndex="coin"
              key="coin"
              title={translate("wallets.fields.coin")}
              render={(value, record: any) => (
                  <div>{record.address?.xpub?.coin?.name}</div>
              )}
          />
          <Table.Column
              key="userEmail"
              dataIndex={["address", "user"]}
              title={translate("wallets.fields.user")}
              render={(value, record: any) => (
                  <Link
                      key={value.id}
                      href={'/users/show/' + value.id}
                      target={value.email}
                      title={value.email}
                  />
              )}
          />
          <Table.Column
              dataIndex="derivationPath"
              title={translate("wallets.fields.derivationPath")}
              render={(value, record: any) => (
                  <div>{record?.address?.path}</div>
              )}
          />
          <Table.Column
              dataIndex={["expired"]}
              title={translate("wallets.fields.expired")}
              render={(value: any) => <BooleanField value={value} />}
          />
          <Table.Column
            dataIndex="xpubChildIndex"
            title={translate("wallets.fields.xpubChildIndex")}
            render={(value) => (<div>{!isNaN(value)  ? value + 1 : 0}</div>)}
          />
          <Table.Column
              title={translate("table.actions")}
              dataIndex="actions"
              render={(_, record: BaseRecord) => (
                  <Space>
                    {/*<EditButton
                        resource={record?.xpub ? "wallets" : "tokenWallets"}
                        hideText
                        size="small"
                        recordItemId={record.id}
                    />*/}
                    <ShowButton
                        resource={"wallets"}
                        hideText
                        size="small"
                        recordItemId={record.id}
                    />
                    <DeleteButton
                        resource={"wallets"}
                        hideText
                        size="small"
                        recordItemId={record.id}
                    />
                  </Space>
              )}
          />
        </Table>
      </List>
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
