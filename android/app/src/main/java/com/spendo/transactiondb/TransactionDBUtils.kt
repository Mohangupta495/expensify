package com.spendo.transactiondb

import android.content.ContentValues
import android.content.Context
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import androidx.core.database.sqlite.transaction

object TransactionDBUtils {

    fun insertTransaction(
        context: Context,
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
        networkRefId: String,
        accountBalance: String
    ) {
        val dbHelper = TransactionDBHelper(context)
        val db = dbHelper.writableDatabase

        val values = ContentValues().apply {
            put("sender", sender)
            put("body", body)
            put("sms_type", smsType)
            put("pattern_UID", patternUID)
            put("sort_UID", sortUID)
            put("account_type", accountType)

            put("transaction_type", transactionType)
            put("amount", amount)
            put("pan", pan)
            put("pos", pos)
            put("note", note)
            put("date", date)
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
                        put("sender", txn["sender"] ?: "")
                        put("body", txn["body"] ?: "")
                        put("sms_type", txn["sms_type"] ?: "")
                        put("pattern_UID", txn["pattern_UID"] ?: "")
                        put("sort_UID", txn["sort_UID"] ?: "")
                        put("account_type", txn["account_type"] ?: "")

                        put("transaction_type", txn["transaction_type"] ?: "")
                        put("amount", txn["amount"] ?: "")
                        put("pan", txn["pan"] ?: "")
                        put("pos", txn["pos"] ?: "")
                        put("note", txn["note"] ?: "")
                        put("date", txn["date"] ?: "")
                        put("network_reference_id", txn["network_reference_id"] ?: "")
                        put("account_balance", txn["account_balance"] ?: "")
                    }
                    insert("transactions", null, values)
                }
            } finally {
                db.close()
            }
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
                map.putString("sender", it.getString(it.getColumnIndexOrThrow("sender")))
                map.putString("body", it.getString(it.getColumnIndexOrThrow("body")))
                map.putString("sms_type", it.getString(it.getColumnIndexOrThrow("sms_type")))
                map.putString("pattern_UID", it.getString(it.getColumnIndexOrThrow("pattern_UID")))
                map.putString("sort_UID", it.getString(it.getColumnIndexOrThrow("sort_UID")))
                map.putString("account_type", it.getString(it.getColumnIndexOrThrow("account_type")))

                map.putString("transaction_type", it.getString(it.getColumnIndexOrThrow("transaction_type")))
                map.putString("amount", it.getString(it.getColumnIndexOrThrow("amount")))
                map.putString("pan", it.getString(it.getColumnIndexOrThrow("pan")))
                map.putString("pos", it.getString(it.getColumnIndexOrThrow("pos")))
                map.putString("note", it.getString(it.getColumnIndexOrThrow("note")))
                map.putString("date", it.getString(it.getColumnIndexOrThrow("date")))
                map.putString("network_reference_id", it.getString(it.getColumnIndexOrThrow("network_reference_id")))
                map.putString("account_balance", it.getString(it.getColumnIndexOrThrow("account_balance")))
                array.pushMap(map)
            }
        }

        db.close()
        return array
    }
    fun clearAllTransactions(context: Context) {
        val dbHelper = TransactionDBHelper(context)
        val db = dbHelper.writableDatabase
        db.delete("transactions", null, null)
        db.close()
    }

    fun deleteDatabaseFile(context: Context): Boolean {
        val dbName = "transactions.db"
        return context.deleteDatabase(dbName)
    }
}
