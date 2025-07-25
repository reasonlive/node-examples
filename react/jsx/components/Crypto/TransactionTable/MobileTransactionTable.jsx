import MobileRecordsScroller from "../MobileRecordsScroller/MobileRecordsScroller";

const MobileTransactionTable = ({transactions}) => {
    const mobileColumns = {
        id: {type: 'number', title: 'Internal ID'},
        txid: {type: 'string', title: 'TxID'},
        created: {type: 'date', title: 'Date'},
        addressTo: {type: 'string', title: 'To address'},
        addressFrom: {type: 'string', title: 'From address'},
        currency: {type: 'string', title: 'Currency'},
        amount: {type: 'number', title: 'Amount'}
    }

    const arrangedTxs = transactions.map(tx => {
        return {
            id: tx.id,
            txid: tx.txid,
            created: tx.created,
            addressTo: tx.addressTo,
            addressFrom: tx.addressFrom,
            currency: tx.currency,
            amount: tx.amount
        }
    })

    return (
      <>
        <MobileRecordsScroller columns={mobileColumns} dataSource={arrangedTxs}/>
      </>
    );
}

export default MobileTransactionTable;