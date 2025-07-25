import { NavigateToResource, RefineRoutes } from "@refinedev/nextjs-router";
import {AuthPage} from "@components/pages/auth";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Navigate} from "react-router";
import Dashboard from "./dashboard";
import {DeleteButton, EditButton, EmailField, List, ShowButton, TagField} from "@refinedev/antd";
import {Anchor, Button, Space, Table} from "antd";
import {BaseRecord, useTranslate} from "@refinedev/core";
import React, {useEffect, useState} from "react";
import config from '../src/config';

export default function Home() {
    const apiURL = config.ENV == 'dev' ? config.API_URL_DEV : config.API_URL_PROD;
    const translate = useTranslate();
    let [tableProps, setTableProps] = useState([]);

    useEffect(() => {
        initializeTable().catch(err => console.log(err))
    }, [tableProps])

    async function initializeTable() {
        const response = await fetch(apiURL + '/crud/common/observers/list');
        if (response.ok) {
            const observers = (await response.json()).observers;
            setTableProps(observers)
        }
    }

    const startObserver = async (observerName: string) => {
        const response = await fetch(apiURL + '/crud/common/observer/start/' + observerName);
        if (response.ok) {
            const success = (await response.json()).success;
            tableProps.forEach((observer: any) => {
                if (observer.name == observerName) {
                    observer.status = success ? 'WORKING' : 'STOPPED';
                }
            })

            setTableProps(tableProps)
        }
    }

    const stopObserver = async (observerName: string) => {
        const response = await fetch(apiURL + '/crud/common/observer/stop/' + observerName);
        if (response.ok) {
            const success = (await response.json()).success;
            tableProps.forEach((observer: any) => {
                if (observer.name == observerName) {
                    observer.status = success ? 'STOPPED' : 'WORKING';
                }
            })

            setTableProps(tableProps)
        }
    }

  return (
      <List>
        <Table
            loading={!tableProps.length}
            dataSource={tableProps}
            rowKey="id"
            //rowClassName={(record, index) => }
        >
          <Table.Column
              dataIndex="name"
              title="Blockchain observer"
          />
          <Table.Column
              dataIndex="service"
              title="API service"
          />
          <Table.Column
              dataIndex="status"
              title="Observer status"
          />
          <Table.Column
              dataIndex="requests"
              title="Daily API requests"
          />
          <Table.Column
              dataIndex="transactions"
              title="Daily transactions"
          />
          <Table.Column
              title={translate("table.actions")}
              dataIndex="actions"
              render={(value, record: any) => (
                  <Space>
                      <Button size="middle" type="primary" loading={false} onClick={() => {

                          if (record.status === 'WORKING'){
                              stopObserver(record.name).catch(err => console.log(err))
                          }
                          else {
                              startObserver(record.name).catch(err => console.log(err))
                          }
                      }}
                      >
                          {record.status === 'WORKING' ? 'Stop' : 'Start'}
                      </Button>
                  </Space>
              )}
          />
        </Table>
      </List>
  );
}

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
