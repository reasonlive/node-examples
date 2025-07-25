import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  TagField,
  EmailField, BooleanField, TextField,
} from "@refinedev/antd";
import { Table, Space, Anchor } from "antd";

export default function AddressList() {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
      <List>
        <Table {...tableProps} rowKey="id" scroll={{ x: 'max-content' }}>
          <Table.Column
              dataIndex="id"
              title={translate("addresses.fields.id")}
          />
          <Table.Column
              dataIndex="val"
              title={translate("addresses.fields.val")}
          />
          <Table.Column
              dataIndex="path"
              title={translate("addresses.fields.path")}
          />
          <Table.Column
              dataIndex="format"
              title={translate("addresses.fields.format")}
          />
          <Table.Column
              dataIndex="type"
              title={translate("addresses.fields.type")}
              render={(value: any) => <TextField value={value == 1 ? 'Static' : 'Dynamic'} />}
          />
          <Table.Column
              dataIndex={["expiredAt"]}
              title={translate("addresses.fields.expiredAt")}
              render={(value: any) => <BooleanField value={value ? new Date(value) <= new Date() : false} />}
          />
          <Table.Column
              dataIndex={["isObservable"]}
              title={translate("addresses.fields.isObservable")}
              render={(value: any) => <BooleanField value={value} />}
          />
          <Table.Column
              dataIndex="balance"
              title={translate("addresses.fields.balance")}
          />
          <Table.Column
              dataIndex={["xpub", "coin", "blockchain"]}
              title={translate("addresses.fields.xpub")}
          />
          <Table.Column
              dataIndex={["user", "email"]}
              title={translate("addresses.fields.account")}
          />
          {/*<Table.Column
              dataIndex="tokenWallets"
              title={translate("addresses.fields.tokenWallets")}
              render={(value: any[]) =>
                  tokenWalletsIsLoading ? (
                      <>Loading...</>
                  ) : (
                      <>
                        {value?.map((item, index) => (
                            <TagField key={index} value={item} />
                        ))}
                      </>
                  )
              }
          />*/}
          <Table.Column
              title={translate("table.actions")}
              dataIndex="actions"
              render={(_, record: BaseRecord) => (
                  <Space>
                    <ShowButton
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
