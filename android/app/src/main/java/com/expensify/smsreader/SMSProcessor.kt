package com.expensify.smsreader

import android.app.AlertDialog
import android.content.Context
import android.net.Uri
import android.provider.Telephony
import android.util.Log
import com.expensify.transactiondb.TransactionDBUtils
import org.json.JSONArray
import org.json.JSONObject
import java.util.regex.Pattern

object SMSProcessor {

    fun processAndStoreSMS(context: Context) {
        val configJson = loadConfigJson(context)
        val config = JSONObject(configJson)
        val uri = Uri.parse("content://sms/inbox")
        val contentResolver = context.contentResolver
        val cursor = contentResolver.query(uri, null, null, null, null)

        cursor?.use {
            val addressIdx = it.getColumnIndex(Telephony.Sms.ADDRESS)
            val bodyIdx = it.getColumnIndex(Telephony.Sms.BODY)
            val dateIdx = it.getColumnIndex(Telephony.Sms.DATE)

            while (it.moveToNext()) {
                val sender = it.getString(addressIdx) ?: continue
                val body = it.getString(bodyIdx) ?: continue
                val date = it.getString(dateIdx) ?: ""

                val sms = JSONObject().apply {
                    put("sender", sender)
                    put("body", body)
                    put("date", date)
                }

                val parsed = parseSmsNative(config, sms)

                Log.i("SMSParsed", "Parsed SMS from: $sender -> $parsed")

                parsed?.let { parsedData ->
                    TransactionDBUtils.insertTransaction(
                        context,
                        address = sender,
                        body = body,
                        amount = parsedData.optString("amount"),
                        date = date,
                        type = parsedData.optString("transaction_type"),
                        pan = parsedData.optString("pan"),
                        networkRefId = parsedData.optString("network_reference_id"),
                        accountBalance = parsedData.optString("account_balance")
                    )
                }
            }
        }
    }

    private fun loadConfigJson(context: Context): String {
        return context.assets.open("bank_config.json")
            .bufferedReader()
            .use { it.readText() }
    }

    fun showSimpleDialog(context: Context) {
        AlertDialog.Builder(context)
            .setTitle("Notice")
            .setMessage("This is a simple alert message.")
            .setPositiveButton("OK") { dialog, _ ->
                dialog.dismiss()
            }
            .show()
    }

    private fun parseSmsNative(config: JSONObject, sms: JSONObject): JSONObject? {
        val blacklistRegex = Regex(
            "\\b(password|otp|verification|activation|passcode|osp|netsecure)\\b",
            RegexOption.IGNORE_CASE
        )

        val body = sms.getString("body")
        val sender = sms.getString("sender")

        if (blacklistRegex.containsMatchIn(body)) return null

        val rules = config.optJSONArray("rules") ?: return null

        for (i in 0 until rules.length()) {
            val rule = rules.getJSONObject(i)
            val senders = rule.optJSONArray("senders") ?: JSONArray()

            val senderMatched = (0 until senders.length()).any {
                senders.getString(it).equals(sender, ignoreCase = true)
            }

            if (!senderMatched) continue

            val patterns = rule.optJSONArray("patterns") ?: continue

            for (j in 0 until patterns.length()) {
                val pattern = patterns.getJSONObject(j)
                var patternStr = pattern.getString("regex")
                val flags = mutableSetOf<RegexOption>()

                if (patternStr.startsWith("(?i)")) {
                    flags.add(RegexOption.IGNORE_CASE)
                    patternStr = patternStr.removePrefix("(?i)")
                }

                val regex = Regex(patternStr, flags)
                val match = regex.find(body) ?: continue

                val data = JSONObject()
                val fields = pattern.optJSONObject("data_fields") ?: JSONObject()
                var txnType: String? = null

                for (field in fields.keys()) {
                    if (field == "transaction_type_rule") continue

                    val fieldObj = fields.optJSONObject(field)
                    val groupId = fieldObj?.optInt("group_id", -1) ?: -1
                    val value = match.groupValues.getOrNull(groupId)?.trim()

                    if (!value.isNullOrBlank()) {
                        data.put(field, value)
                    }
                }

                val txnRule = fields.optJSONObject("transaction_type_rule")
                if (txnRule != null) {
                    val groupId = txnRule.optInt("group_id")
                    val groupValue = match.groupValues.getOrNull(groupId)?.lowercase()?.trim() ?: ""
                    val txnRules = txnRule.optJSONArray("rules") ?: JSONArray()

                    for (r in 0 until txnRules.length()) {
                        val tRule = txnRules.getJSONObject(r)
                        val expected = tRule.optString("value").lowercase().trim()

                        if (expected.isEmpty() || groupValue.contains(expected)) {
                            txnType = tRule.optString("txn_type")
                            data.put("transaction_type", txnType + "none")
                            if (tRule.has("pos_override")) {
                                data.put("pos", tRule.optString("pos_override"))
                            }
                            break
                        }
                    }
                }

                if (!data.has("transaction_type")) {
                    val fallbackType = fields.optString("transaction_type")
                        .ifEmpty { pattern.optString("transaction_type") }
                    if (fallbackType.isNotEmpty()) {
                        data.put("transaction_type", fallbackType)
                    }
                }

                Log.d("SMSParser", "Match found for sender: $sender, data: $data")
                return data
            }
        }

        return null
    }
}
