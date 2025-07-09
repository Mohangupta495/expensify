package com.expensify.transactiondb

import android.content.ContentValues
import android.content.Context
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import androidx.core.database.sqlite.transaction

object TransactionDBUtils {

    fun insertTransaction(
        context: Context,
        address: String,
        body: String,
        amount: String,
        date: String,
        type: String,
        pan: String,
        networkRefId: String,
        accountBalance: String
    ) {
        val dbHelper = TransactionDBHelper(context)
        val db = dbHelper.writableDatabase

        val values = ContentValues().apply {
            put("address", address)
            put("body", body)
            put("amount", amount)
            put("date", date)
            put("type", type)
            put("pan", pan)
            put("network_reference_id", networkRefId)
            put("account_balance", accountBalance)
        }

        db.insert("transactions", null, values)
        db.close()
    }

    fun insertTransactionsList(context: Context, transactions: List<Map<String, String>>) {
        val dbHelper = TransactionDBHelper(context)
        val db = dbHelper.writableDatabase

        db.transaction {
            try {
                for (txn in transactions) {
                    val values = ContentValues().apply {
                        put("address", txn["address"] ?: "")
                        put("body", txn["body"] ?: "")
                        put("amount", txn["amount"] ?: "")
                        put("date", txn["date"] ?: "")
                        put("type", txn["type"] ?: "")
                        put("pan", txn["pan"] ?: "")
                        put("network_reference_id", txn["network_reference_id"] ?: "")
                        put("account_balance", txn["account_balance"] ?: "")
                    }
                    insert("transactions", null, values)
                }
            } finally {
            }
            db.close()
        }
    }

    fun getAllTransactions(context: Context): WritableArray {
        val dbHelper = TransactionDBHelper(context)
        val db = dbHelper.readableDatabase
        val cursor = db.rawQuery("SELECT * FROM transactions ORDER BY date DESC LIMIT 500", null)

        val array = Arguments.createArray()

        cursor.use {
            while (it.moveToNext()) {
                val map = Arguments.createMap()
                map.putString("id", it.getString(it.getColumnIndexOrThrow("id")))
                map.putString("address", it.getString(it.getColumnIndexOrThrow("address")))
                map.putString("body", it.getString(it.getColumnIndexOrThrow("body")))
                map.putString("amount", it.getString(it.getColumnIndexOrThrow("amount")))
                map.putString("date", it.getString(it.getColumnIndexOrThrow("date")))
                map.putString("type", it.getString(it.getColumnIndexOrThrow("type")))
                map.putString("pan", it.getString(it.getColumnIndexOrThrow("pan")))
                map.putString("network_reference_id", it.getString(it.getColumnIndexOrThrow("network_reference_id")))
                map.putString("account_balance", it.getString(it.getColumnIndexOrThrow("account_balance")))
                array.pushMap(map)
            }
        }

        db.close()
        return array
    }
}
