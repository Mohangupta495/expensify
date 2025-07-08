package com.expensify.transactiondb

import android.content.Context
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray

object TransactionDBUtils {
    fun insertTransaction(
        context: Context,
        address: String,
        body: String,
        amount: String,
        date: String,
        type: String
    ) {
        val dbHelper = TransactionDBHelper(context)
        val db = dbHelper.writableDatabase
        db.execSQL(
            "INSERT INTO transactions (address, body, amount, date, type) VALUES (?, ?, ?, ?, ?)",
            arrayOf(address, body, amount, date, type)
        )
        db.close()
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
                array.pushMap(map)
            }
        }

        db.close()
        return array
    }
}
