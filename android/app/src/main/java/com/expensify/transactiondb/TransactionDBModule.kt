package com.expensify.modules

import com.facebook.react.bridge.*
import com.expensify.transactiondb.TransactionDBUtils

class TransactionDBModule(reactContext: ReactApplicationContext) :
    NativeTransactionDBSpecSpec(reactContext) {

    override fun insertTransaction(
        address: String,
        body: String,
        amount: String,
        date: String,
        type: String,
        promise: Promise
    ) {
        TransactionDBUtils.insertTransaction(reactApplicationContext, address, body, amount, date, type)
        promise.resolve("inserted")
    }

    override fun getAllTransactions(promise: Promise) {
        val data = TransactionDBUtils.getAllTransactions(reactApplicationContext)
        promise.resolve(data)
    }
}
