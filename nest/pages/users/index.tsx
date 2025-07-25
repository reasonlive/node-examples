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
  UrlField,
} from "@refinedev/antd";
import { Table, Space, Anchor } from "antd";

export default function UserList() {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
              dataIndex="id"
              title={translate("users.fields.id")}
          />
          <Table.Column
            key="account"
            dataIndex="account"
            title={translate("users.fields.account")}
            render={(value, record: any) => (
                <Anchor.Link
                    key={record?.account?.id}
                    href={'/accounts/show/' + record?.account?.id}
                    target={record?.account?.name}
                    title={record?.account?.name}
                />
            )}
          />
          <Table.Column
              dataIndex={["email"]}
              title={translate("users.fields.email")}
              render={(value: any) => <EmailField value={value} />}
          />
          <Table.Column
              dataIndex="apiKey"
              title={translate("users.fields.apiKey")}
          />
          <Table.Column
              dataIndex="roles"
              title={translate("users.fields.roles")}
              render={(value: any[]) => (
                  <>
                    {value?.map((item) => (
                        <TagField value={item} key={item} />
                    ))}
                  </>
              )}
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
