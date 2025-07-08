package com.expensify

import android.annotation.SuppressLint
import android.app.NotificationManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.widget.Toast
import androidx.core.app.NotificationCompat
import androidx.core.app.RemoteInput

class NotificationActionReceiver : BroadcastReceiver() {
    @SuppressLint("ServiceCast")
    override fun onReceive(context: Context, intent: Intent) {
        val userInput = RemoteInput.getResultsFromIntent(intent)
            ?.getCharSequence("reply_text")?.toString()

        val amount = intent.getStringExtra("txn_amount") ?: "0"
        val txnType = intent.getStringExtra("txn_type") ?: "transaction"
        val bank = intent.getStringExtra("bank") ?: "bank"

        if (!userInput.isNullOrEmpty()) {
            Toast.makeText(context, "Note saved: \"$userInput\"", Toast.LENGTH_SHORT).show()

            val confirmation = NotificationCompat.Builder(context, "transaction_note_channel")
                .setSmallIcon(R.drawable.ic_small_bankbot)
                .setContentTitle("Note Saved for ₹$amount")
                .setContentText("Tagged as \"$userInput\" for your $txnType with $bank.")
                .setStyle(
                    NotificationCompat.BigTextStyle().bigText(
                        "Your note \"$userInput\" has been saved for the ₹$amount $txnType from $bank."
                    )
                )
                .setAutoCancel(true)
                .build()

            val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            manager.notify(1002, confirmation)
        }
    }
}
