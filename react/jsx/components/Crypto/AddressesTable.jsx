import {Layout, List, Table} from "antd";
import React, {useEffect} from "react";
import s from "./TransactionTable/TransactionTable.module.css";
import {useDispatch, useSelector} from "react-redux";
import JsPageHelper from "../../utils/JsPageHelper";
import MobileRecordsScroller from "./MobileRecordsScroller/MobileRecordsScroller";
import AjaxCryptoHelper from "../../ajax/AjaxCryptoHelper";
import CurrencyHelper from "../../utils/CurrencyHelper";

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
        title: 'Address',
        dataIndex: 'val',
        key: 'val',
        align: 'center',
        render: (val) => JsPageHelper.renderShortCopyableString(val)
        //className: `${s.idColumn}`
    },
    {
        title: 'Derivation Path',
        dataIndex: 'path',
        key: 'path',
        align: 'center',
        //className: `${s.idColumn}`
    },
    {
        title: 'Format',
        dataIndex: 'format',
        key: 'format',
        align: 'center',
        render: (value) => (<div>{value === "P2WPKH" ? "NATIVE_SEGWIT" : value}</div>)
        //className: `${s.idColumn}`
    },
    {
        title: 'Expired Date',
        dataIndex: 'expiredAt',
        key: 'expiredAt',
        sorter: (a, b) => a.expiredAt < b.expiredAt,
        sortDirections: ['ascend', 'descend', 'ascend'], // for disabling unsorted step
        defaultSortOrder: 'descend',
        align: 'center',
        render: (value) => JsPageHelper.renderDate(value),
    },
    {
        title: 'Traceable',
        dataIndex: 'isObservable',
        key: 'isObservable',
        align: 'center',
        render: (value) => (<div>{value ? 'Yes' : 'No'}</div>)
        //className: `${s.idColumn}`
    },
    {
        title: 'Currency',
        dataIndex: 'format',
        key: 'currency',
        align: 'center',
        render: (value, record) => (<div>{CurrencyHelper.getCurrencyFromAddress(record)}</div>)
        //className: `${s.idColumn}`rowClassName={'custom-table-row-active'}
    },
    {
        title: 'Amount',
        dataIndex: 'balance',
        key: 'balance',
        sorter: (a, b) => a.balance - b.balance,
        sortDirections: ['ascend', 'descend', 'ascend'], // for disabling unsorted step
        defaultSortOrder: 'descend',
        align: 'center',
        //className: `${s.idColumn}`
    },
];

const mobileColumns = {
    id: {type: 'number', title: 'Internal ID'},
    val: {type: 'string', title: 'Address'},
    path: {type: 'string', title: 'Derivation Path'},
    format: {type: 'string', title: 'Format'},
    expiredAt: {type: 'date', title: 'Expiration Date'},
    isObservable: {type: 'boolean', title: 'Traceable'},
    balance: {type: 'number', title: "Amount"}
}

const AddressesTable = ({mobile, addresses}) => {

    return (
        <List>
            {
                mobile
                    ? <MobileRecordsScroller columns={mobileColumns} dataSource={addresses} />
                    : <Table
                        columns={columns}
                        dataSource={addresses}
                        owKey="id"
                        rowClassName={(record, index) =>
                            new Date(record.expiredAt) > new Date() && record.isObservable && 'custom-table-row-active'}
                    />

            }
        </List>

    );
}

export default AddressesTable;