package com.expensify

import android.app.*
import android.content.Context
import android.content.Intent
import android.os.Build
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.RemoteInput

object NotificationHelper {

    fun showTransactionNotePrompt(context: Context, amount: String, isCredit: Boolean, bank: String) {
        val channelId = "transaction_note_channel"
        Log.d("call","called msg")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                channelId,
                "Transaction Notes",
                NotificationManager.IMPORTANCE_HIGH
            )
            val manager = context.getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)
        }

        val remoteInput = RemoteInput.Builder("reply_text")
            .setLabel("Purpose of this transaction")
            .build()

        val replyIntent = Intent(context, NotificationActionReceiver::class.java).apply {
            action = "com.expensify.REPLY_ACTION"
            putExtra("txn_amount", amount)
            putExtra("txn_type", if (isCredit) "credit" else "debit")
            putExtra("bank", bank)
        }

        val replyPendingIntent = PendingIntent.getBroadcast(
            context,
            0,
            replyIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE
        )

        val replyAction = NotificationCompat.Action.Builder(
            R.drawable.ic_send_note,
            "Add Note",
            replyPendingIntent
        ).addRemoteInput(remoteInput).build()

        val verb = if (isCredit) "received" else "paid"
        val text = "You $verb ₹$amount from $bank. Add a note?"

        val notification = NotificationCompat.Builder(context, channelId)
            .setSmallIcon(R.drawable.ic_small_bankbot)
            .setContentTitle("Bank Transaction")
            .setContentText(text)
            .addAction(replyAction)
            .setAutoCancel(true)
            .build()

        val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        manager.notify(1002, notification)
    }
}
