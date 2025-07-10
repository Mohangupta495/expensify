package com.expensify.smsreader

import android.content.Context
import com.facebook.react.bridge.*
import com.expensify.modules.NativeSMSReaderSpec
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter


class SMSReaderModule(reactContext: ReactApplicationContext) :
    NativeSMSReaderSpec(reactContext) {

    override fun getAllSMS(promise: Promise) {
        try {
            SMSProcessor.processAndStoreSMS(reactApplicationContext) { progress ->
                sendProgressEvent(reactApplicationContext, progress)
            }
            promise.resolve(true)
        } catch (e: Exception) {
            promise.resolve(false) // Not rejecting, just returning false as requested
        }
    }
    fun sendProgressEvent(context: ReactApplicationContext, progress: Int) {
        context
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit("SMS_PROGRESS", progress)
    }
}
