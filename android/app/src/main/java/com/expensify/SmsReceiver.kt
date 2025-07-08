package com.expensify

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.provider.Telephony
import android.util.Log

class SmsReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Telephony.Sms.Intents.SMS_RECEIVED_ACTION) {
            val messages = Telephony.Sms.Intents.getMessagesFromIntent(intent)
            Log.d("call",messages.toString())
            for (sms in messages) {
                val messageBody = sms.messageBody ?: ""
                val sender = sms.displayOriginatingAddress ?: ""

                // 🧪 Mock SMS parser (replace with regex later)
                val isCredit = messageBody.contains("credited", ignoreCase = true)
                val isDebit = messageBody.contains("debited", ignoreCase = true)
                val amount = Regex("""(?:INR|₹|Rs\.?)\s?([\d,]+\.?\d{0,2})""")
                    .find(messageBody)?.groupValues?.get(1)?.replace(",", "") ?: "0"
                val bank = when {
                    sender.contains("HDFC", true) -> "HDFC"
                    sender.contains("ICICI", true) -> "ICICI"
                    else -> "Unknown Bank"
                }

                if (isCredit || isDebit) {
                    NotificationHelper.showTransactionNotePrompt(
                        context,
                        amount,
                        isCredit,
                        bank
                    )
                }
            }
        }
    }
}
