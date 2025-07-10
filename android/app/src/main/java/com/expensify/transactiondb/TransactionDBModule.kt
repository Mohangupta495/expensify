package com.expensify.modules

import com.facebook.react.bridge.*
import com.expensify.transactiondb.TransactionDBUtils

class TransactionDBModule(reactContext: ReactApplicationContext) :
    NativeTransactionDBSpecSpec(reactContext) { // ✅ corrected NativeTransactionDBSpec

    override fun insertTransaction(
        sender: String,
        body: String,
        smsType: String,
        patternUID: String,
        sortUID: String,
        accountType: String,
        transactionType: String,
        amount: String,
        pan: String,
        pos: String,
        note: String,
        date: String,
        networkReferenceId: String,
        accountBalance: String,
        promise: Promise
    ) {
        try {
            TransactionDBUtils.insertTransaction(
                context = reactApplicationContext,
                sender = sender,
                body = body,
                smsType = smsType,
                patternUID = patternUID,
                sortUID = sortUID,
                accountType = accountType,
                transactionType = transactionType,
                amount = amount,
                pan = pan,
                pos = pos,
                note = note,
                date = date,
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
                        "sender" to (txn.getString("sender") ?: ""),
                        "body" to (txn.getString("body") ?: ""),
                        "sms_type" to (txn.getString("sms_type") ?: ""),
                        "pattern_UID" to (txn.getString("pattern_UID") ?: ""),
                        "sort_UID" to (txn.getString("sort_UID") ?: ""),
                        "account_type" to (txn.getString("account_type") ?: ""),

                        "transaction_type" to (txn.getString("transaction_type") ?: ""),
                        "amount" to (txn.getString("amount") ?: ""),
                        "pan" to (txn.getString("pan") ?: ""),
                        "pos" to (txn.getString("pos") ?: ""),
                        "note" to (txn.getString("note") ?: ""),
                        "date" to (txn.getString("date") ?: ""),
                        "network_reference_id" to (txn.getString("network_reference_id") ?: ""),
                        "account_balance" to (txn.getString("account_balance") ?: "")
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
    override fun clearAllTransactions(promise: Promise) {
        try {
            TransactionDBUtils.clearAllTransactions(reactApplicationContext)
            promise.resolve("cleared")
        } catch (e: Exception) {
            promise.reject("CLEAR_ERROR", "Failed to clear transactions", e)
        }
    }

    override fun deleteDatabase(promise: Promise) {
        try {
            val deleted = TransactionDBUtils.deleteDatabaseFile(reactApplicationContext)
            if (deleted) {
                promise.resolve("database_deleted")
            } else {
                promise.reject("DELETE_FAILED", "Database file not deleted")
            }
        } catch (e: Exception) {
            promise.reject("DELETE_ERROR", "Failed to delete database", e)
        }
    }
}
