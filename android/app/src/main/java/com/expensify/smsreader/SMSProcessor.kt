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
                val fullSender = it.getString(addressIdx) ?: continue
                val sender = fullSender.split("-").let { parts ->
                    if (parts.size >= 2) parts[1] else fullSender
                }
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
        val sender = sms.getString("sender")
        val body = sms.getString("body")

//        Log.d("SMSParser", "Processing SMS from: $sender")
//        Log.d("SMSParser", "SMS body: $body")

        // Check blacklist
        val blacklistRegex = config.optString("blacklist_regex")
        if (blacklistRegex.isNotEmpty()) {
            var regexPattern = blacklistRegex
            val flags = mutableSetOf<RegexOption>()

            // Handle embedded case-insensitive flag
            if (regexPattern.startsWith("(?i)")) {
                flags.add(RegexOption.IGNORE_CASE)
                regexPattern = regexPattern.removePrefix("(?i)")
            }

            val regex = Regex(regexPattern, flags)

            if (regex.containsMatchIn(body)) {
//                Log.d("SMSParser", "SMS blocked by blacklist regex")
                return null
            }
        }

        val rules = config.optJSONArray("rules")
        if (rules == null) {
//            Log.d("SMSParser", "No rules found in config")
            return null
        }

//        Log.d("SMSParser", "Found ${rules.length()} rules")

        for (i in 0 until rules.length()) {
            val rule = rules.getJSONObject(i)
            val ruleName = rule.optString("name", "Unknown")
//            Log.d("SMSParser", "Processing rule: $ruleName")

            val senders = rule.optJSONArray("senders")

            // Check if sender matches (if senders array exists and is not empty)
            if (senders != null && senders.length() > 0) {
                val senderMatched = (0 until senders.length()).any {
                    val configSender = senders.getString(it)
//                    Log.d("SMSParser", "Checking sender '$sender' against '$configSender'")
                    configSender.equals(sender, ignoreCase = true)
                }
                if (!senderMatched) {
//                    Log.d("SMSParser", "Sender '$sender' did not match any configured senders for rule $ruleName")
                    continue
                }
            } else {
//                Log.d("SMSParser", "No sender restrictions for rule $ruleName")
            }

            val patterns = rule.optJSONArray("patterns")
            if (patterns == null) {
//                Log.d("SMSParser", "No patterns found for rule $ruleName")
                continue
            }

//            Log.d("SMSParser", "Found ${patterns.length()} patterns for rule $ruleName")

            for (j in 0 until patterns.length()) {
                val pattern = patterns.getJSONObject(j)
                val patternUID = pattern.optString("pattern_UID", "Unknown")
//                Log.d("SMSParser", "Testing pattern: $patternUID")

                var patternStr = pattern.getString("regex")
                val flags = mutableSetOf<RegexOption>()

                // Handle embedded case-insensitive flag
                if (patternStr.startsWith("(?i)")) {
                    flags.add(RegexOption.IGNORE_CASE)
                    patternStr = patternStr.removePrefix("(?i)")
                }

//                Log.d("SMSParser", "Regex pattern: $patternStr")

                val regex = try {
                    Regex(patternStr, flags)
                } catch (e: Exception) {
//                    Log.e("SMSParser", "Invalid regex pattern: $patternStr", e)
                    continue
                }

                val match = regex.find(body)
                if (match == null) {
//                    Log.d("SMSParser", "Pattern $patternUID did not match")
                    continue
                }

//                Log.d("SMSParser", "Pattern $patternUID matched! Groups: ${match.groupValues}")

                val data = JSONObject()
                val fields = pattern.optJSONObject("data_fields") ?: JSONObject()
                var txnType: String? = null

                // Process all fields except transaction_type_rule
                for (field in fields.keys()) {
                    if (field == "transaction_type_rule") continue

                    val fieldConfig = fields.get(field)

                    // Handle different field config types
                    when (fieldConfig) {
                        is JSONObject -> {
                            val groupId = fieldConfig.optInt("group_id", -1)
                            val value = if (groupId >= 0) match.groupValues.getOrNull(groupId)?.trim() else null

                            if (!value.isNullOrBlank()) {
                                data.put(field, value)
//                                Log.d("SMSParser", "Extracted field '$field' = '$value' from group $groupId")
                            }
                        }
                        is String -> {
                            // Direct string value
                            data.put(field, fieldConfig)
//                            Log.d("SMSParser", "Set field '$field' = '$fieldConfig' (static value)")
                        }
                    }
                }

                // Handle transaction_type_rule
                val txnRule = fields.optJSONObject("transaction_type_rule")
                if (txnRule != null) {
                    val groupId = txnRule.optInt("group_id", -1)
                    val groupValue = if (groupId >= 0) {
                        match.groupValues.getOrNull(groupId)?.lowercase()?.trim() ?: ""
                    } else ""

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

                // Fallback if transaction_type_rule didn't resolve anything
                if (txnType == null) {
                    val fallbackType = fields.optString("transaction_type")
                        .ifEmpty { pattern.optString("transaction_type") }
                    if (fallbackType.isNotEmpty()) {
                        data.put("transaction_type", fallbackType)
                    }
                }

//                Log.d("SMSParser", "Final extracted data: $data")

                // Return result object matching JavaScript structure
                return JSONObject().apply {
                    put("sender", sender)
                    put("body", body)
                    put("sms_type", pattern.optString("sms_type"))
                    put("extracted", data)
                    put("pattern_UID", pattern.optString("pattern_UID"))
                    put("sort_UID", pattern.optString("sort_UID"))
                    put("account_type", pattern.optString("account_type"))
                }
            }
        }

//        Log.d("SMSParser", "No patterns matched for sender: $sender")
        return null
    }
}
