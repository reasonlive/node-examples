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
  MarkdownField,
  BooleanField,
  NumberField, DeleteButton
} from "@refinedev/antd";
import { Table, Space } from "antd";

export default function XpubList() {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
              dataIndex="id"
              title={translate("xpubs.fields.id")}
          />
          <Table.Column
              dataIndex="val"
              title={translate("xpubs.fields.val")}
          />
          <Table.Column
              dataIndex="blockchain"
              title={translate("xpubs.fields.blockchain")}
              render={(value, record: any) => (<div>{record?.coin?.name}</div>)}
          />
          <Table.Column
              dataIndex="protocolIndex"
              title={translate("xpubs.fields.protocolIndex")}
          />
          <Table.Column
              dataIndex="blockchainIndex"
              title={translate("xpubs.fields.blockchainIndex")}
              render={(value, record: any) => (<div>{record?.coin?.type}</div>)}
          />
          <Table.Column
              dataIndex="accountIndex"
              title={translate("xpubs.fields.accountIndex")}
          />
          <Table.Column
              dataIndex="walletsIndex"
              title={translate("xpubs.fields.walletsIndex")}
              render={(value: any) => <NumberField value={value + 1}/>}
          />
          <Table.Column
              dataIndex={["expired"]}
              title={translate("xpubs.fields.expired")}
              render={(value: any) => <BooleanField value={value} />}
          />
          <Table.Column
              title={translate("table.actions")}
              dataIndex="actions"
              render={(_, record: BaseRecord) => (
                  <Space>
                    <EditButton
                        hideText
                        size="small"
                        recordItemId={record.id}
                    />
                    <ShowButton
                        hideText
                        size="small"
                        recordItemId={record.id}
                    />
                    <DeleteButton
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
