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
  EmailField,
} from "@refinedev/antd";
import { Table, Space, Anchor } from "antd";

export default function AccountList() {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
              dataIndex="id"
              title={translate("accounts.fields.id")}
          />
          <Table.Column
              dataIndex="name"
              title={translate("accounts.fields.name")}
          />
          <Table.Column
              key="userEmail"
              dataIndex="userEmail"
              title={translate("accounts.fields.user")}
              render={(value, record: any) => (
                  <Anchor.Link
                      key={record?.user?.id}
                      href={'/users/show/' + record?.user?.id}
                      target={record?.user?.email}
                      title={record?.user?.email}
                  />
              )}
          />
          <Table.Column
              dataIndex="mdr"
              title={translate("accounts.fields.mdr")}
          />
          <Table.Column
            dataIndex="callbackUrl"
            title={translate("accounts.fields.callbackUrl")}
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

/*export default function UserList() {
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
