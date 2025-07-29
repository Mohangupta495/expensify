package com.spendo.smsreader

import com.spendo.modules.NativeShowCaseSpec
import com.facebook.react.bridge.ReactApplicationContext

class ShowCaseModule(reactContext: ReactApplicationContext) :
    NativeShowCaseSpec(reactContext) {

    override fun multiply(a: Double, b: Double): Double {
        return a * b
    }
}
