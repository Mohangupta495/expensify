package com.expensify.transactiondb

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper

class TransactionDBHelper(context: Context) :
    SQLiteOpenHelper(context, "transactions.db", null, 2) {

    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL("""
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            address TEXT,
            body TEXT,
            amount TEXT,
            date TEXT,
            type TEXT,
            pan TEXT,
            network_reference_id TEXT,
            account_balance TEXT
        );
    """.trimIndent())
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        db.execSQL("DROP TABLE IF EXISTS transactions")
        onCreate(db)
    }
}
