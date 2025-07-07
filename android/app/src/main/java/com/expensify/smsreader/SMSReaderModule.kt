package com.expensify.smsreader

import android.database.Cursor
import android.net.Uri
import android.provider.Telephony
import com.facebook.react.bridge.*
import com.expensify.modules.NativeSMSReaderSpec

class SMSReaderModule(reactContext: ReactApplicationContext) :
    NativeSMSReaderSpec(reactContext) {

    override fun getAllSMS(promise: Promise) {
        try {
            val smsList = Arguments.createArray()
            val uri = Uri.parse("content://sms/inbox")
            val cursor: Cursor? = reactApplicationContext.contentResolver.query(uri, null, null, null, null)

            cursor?.use {
                val addressIdx = cursor.getColumnIndex(Telephony.Sms.ADDRESS)
                val bodyIdx = cursor.getColumnIndex(Telephony.Sms.BODY)
                val dateIdx = cursor.getColumnIndex(Telephony.Sms.DATE)

                while (cursor.moveToNext()) {
                    val sms = Arguments.createMap()
                    sms.putString("address", cursor.getString(addressIdx))
                    sms.putString("body", cursor.getString(bodyIdx))
                    sms.putString("date", cursor.getString(dateIdx))
                    smsList.pushMap(sms)
                }
            }

            promise.resolve(smsList)
        } catch (e: Exception) {
            promise.reject("SMS_ERROR", "Failed to fetch SMS", e)
        }
    }
}
