package com.expensify.transactiondb

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper

class TransactionDBHelper(context: Context) :
    SQLiteOpenHelper(context, "transactions.db", null, 3) { // bumped version to 3

    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL("""
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sender TEXT,
                body TEXT,
                sms_type TEXT,
                pattern_UID TEXT,
                sort_UID TEXT,
                account_type TEXT,

                -- extracted fields
                transaction_type TEXT,
                amount TEXT,
                pan TEXT,
                pos TEXT,
                note TEXT,
                date TEXT,
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
