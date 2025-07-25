export enum TransactionStatus {
    PENDING = 1, // unconfirmed
    REJECTED, // cancelled
    SUCCESS, // confirmed
    FAILED, // network error
}

export enum TransactionDirection {
    INCOMING = 1,
    OUTGOING = 2
}