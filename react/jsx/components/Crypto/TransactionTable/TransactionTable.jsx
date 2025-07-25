import {List, Space, Table} from "antd";
import s from './TransactionTable.module.css';
import React, {useEffect, useState} from "react";
import {CopySvg} from "../../../utils/sprite";
import JsPageHelper from "../../../utils/JsPageHelper";
import TransactionDetailsModal from "../TransactionDetailsModal/TransactionDetailsModal";
import MobileTransactionTable from "./MobileTransactionTable";

const TransactionTable = ({transactions, mobile}) => {
    const [showModal, setShowModal] = useState(false);
    const [internalId, setInternalId] = useState(1);

    const showModalPopup = (id) => {
        setInternalId(id)
        setShowModal(true);
    }

    const columns = [
        {
            title: 'Internal ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['ascend', 'descend', 'ascend'], // for disabling unsorted step
            defaultSortOrder: 'descend',
            align: 'center',
            className: `${s.idColumn}`
        },
        {
            title: 'TxID',
            dataIndex: 'txid',
            key: 'txid',
            ellipsis: true,
            width: 150,
            render: (val) => (
                <div>
                    <span>{val.slice(0, 10) + '...'}</span>
                    <CopySvg onClick={(e) => JsPageHelper.copyItemToBuffer(e, val)} className={s.copyable} width={16} height={16}/>
                </div>
            )
        },
        {
            title: 'Date',
            dataIndex: 'created',
            key: 'date',
            sorter: (a, b) => a.created > b.created,
            sortDirections: ['ascend', 'descend', 'ascend'],
            render: (val) => (<div>{JsPageHelper.formatDate(val)}</div>)
        },
        {
            title: 'To address',
            dataIndex: 'addressTo',
            key: 'to',
            ellipsis: true,
            width: 150,
            render: (val) => (
                <div>
                    <span id={val}>{val.slice(0, 10) + '...'}</span>
                    <CopySvg onClick={(e) => JsPageHelper.copyItemToBuffer(e, val)} className={s.copyable} width={16} height={16}/>
                </div>
            )
        },
        {
            title: 'From address',
            dataIndex: 'addressFrom',
            key: 'from',
            ellipsis: true,
            width: 150,
            render: (val) => (
                <div>
                    <span id={val}>{val.slice(0, 10) + '...'}</span>
                    <CopySvg onClick={(e) => JsPageHelper.copyItemToBuffer(e, val)} className={s.copyable} width={16} height={16}/>
                </div>
            )
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
            align: 'center',
            render: (val, record) => (
                <div>
                    <div>{val}</div>
                    {record.tokenStandard ? <div style={{color: '#ABABAB', fontSize: 10}}>{record.tokenStandard}</div> : ''}
                </div>
            )
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            sorter: (a, b) => a.amount - b.amount,
            sortDirections: ['ascend', 'descend', 'ascend'],
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'action',
            width: 50,
            render: (val) => (
                <div
                    onClick={() => showModalPopup(val)}
                    className={s.img}
                >
                    <img src={require('../../../assets/img/details.png')} alt = 'details_img'/>
                </div>
            ),
        }
    ];


    return (
        <List>
            <TransactionDetailsModal show={showModal} id={internalId} setShowModal={setShowModal}/>
            {mobile
                ? <MobileTransactionTable transactions={transactions}/>
                : <Table columns={columns} dataSource={transactions} rowKey="id"/>
            }

        </List>
    );
}

export default TransactionTable;