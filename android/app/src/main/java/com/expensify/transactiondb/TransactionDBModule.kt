package com.expensify.modules

import com.facebook.react.bridge.*
import com.expensify.transactiondb.TransactionDBUtils

class TransactionDBModule(reactContext: ReactApplicationContext) :
    NativeTransactionDBSpecSpec(reactContext) { // ✅ Fixed typo: NativeTransactionDBSpecSpec ➜ NativeTransactionDBSpec

    override fun insertTransaction(
        address: String,
        body: String,
        amount: String,
        date: String,
        type: String,
        pan: String,
        networkReferenceId: String,
        accountBalance: String,
        promise: Promise
    ) {
        try {
            TransactionDBUtils.insertTransaction(
                context = reactApplicationContext,
                address = address,
                body = body,
                amount = amount,
                date = date,
                type = type,
                pan = pan,
                networkRefId = networkReferenceId,
                accountBalance = accountBalance
            )
            promise.resolve("inserted")
        } catch (e: Exception) {
            promise.reject("INSERT_ERROR", "Failed to insert transaction", e)
        }
    }

    override fun insertTransactionsList(transactions: ReadableArray, promise: Promise) {
        try {
            val transactionList = mutableListOf<Map<String, String>>()

            for (i in 0 until transactions.size()) {
                val txn = transactions.getMap(i)
                if (txn != null) {
                    val map = mapOf(
                        "address" to (txn.getString("address") ?: ""),
                        "body" to (txn.getString("body") ?: ""),
                        "amount" to (txn.getString("amount") ?: ""),
                        "date" to (txn.getString("date") ?: ""),
                        "type" to (txn.getString("type") ?: ""),
                        "pan" to (txn.getString("pan") ?: ""),
                        "network_reference_id" to (txn.getString("networkReferenceId") ?: ""),
                        "account_balance" to (txn.getString("accountBalance") ?: "")
                    )
                    transactionList.add(map)
                }
            }

            TransactionDBUtils.insertTransactionsList(reactApplicationContext, transactionList)
            promise.resolve("bulk_inserted")
        } catch (e: Exception) {
            promise.reject("BULK_INSERT_ERROR", "Failed to insert transactions list", e)
        }
    }

    override fun getAllTransactions(promise: Promise) {
        try {
            val data = TransactionDBUtils.getAllTransactions(reactApplicationContext)
            promise.resolve(data)
        } catch (e: Exception) {
            promise.reject("FETCH_ERROR", "Failed to get transactions", e)
        }
    }
}
