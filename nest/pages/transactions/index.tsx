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
  DateField, TextField, UrlField, TagField,
} from "@refinedev/antd";
import {Table, Space, Anchor} from "antd";
import { TransactionStatus } from "src/enums/status";

export default function TransactionList() {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
      <List>
        <Table {...tableProps} rowKey="id" scroll={{ x: 'max-content' }}>
          <Table.Column
              dataIndex="id"
              title={translate("transactions.fields.id")}
          />
          <Table.Column
              dataIndex="amount"
              title={translate("transactions.fields.amount")}
          />
          <Table.Column
              dataIndex="currency"
              title={translate("transactions.fields.currency")}
              render={(value: any, record: any) => <TextField value={
                record.currency + (record.tokenStandard ? `/${record.tokenStandard}` : '')
              } />}
          />
          <Table.Column
              dataIndex={["created"]}
              title={translate("transactions.fields.created")}
              render={(value: any) => <TextField value={
                value.toLocaleString().replace('T', ' ').slice(0, -5)
              } />}
          />
          <Table.Column
              dataIndex="addressTo"
              title={translate("transactions.fields.addressTo")}
          />
          <Table.Column
              dataIndex="addressFrom"
              title={translate("transactions.fields.addressFrom")}
          />
          <Table.Column
              dataIndex="txid"
              title={translate("transactions.fields.txid")}
          />
          <Table.Column
              dataIndex="status"
              title={translate("transactions.fields.status")}
              render={(value: any) => <TagField value={TransactionStatus[value]}/>}
          />
          <Table.Column
              dataIndex="networkType"
              title={translate("transactions.fields.networkType")}
          />
          <Table.Column
              dataIndex="blockchainFee"
              title={translate("transactions.fields.blockchainFee")}
          />
          <Table.Column
              dataIndex="fee"
              title={translate("transactions.fields.fee")}
          />
          <Table.Column
              key="userEmail"
              dataIndex={['account', 'user']}
              title={translate("transactions.fields.account")}
              render={(value: any) => (
                  <UrlField value={value.email} href={'/users/show/' + value.id} />
              )}
          />
          <Table.Column
              title={translate("table.actions")}
              dataIndex="actions"
              render={(_, record: BaseRecord) => (
                  <Space>
                    {/*<EditButton
                        hideText
                        size="small"
                        recordItemId={record.id}
                    />*/}
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

/*export default function TransactionList() {
  return <AntdListInferencer />;
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
