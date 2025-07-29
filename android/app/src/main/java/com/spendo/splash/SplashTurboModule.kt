package com.spendo.splash

import com.spendo.modules.NativeSplashTurboModuleSpec
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.Promise

@ReactModule(name = SplashTurboModule.NAME)
class SplashTurboModule(
    reactContext: ReactApplicationContext
) : NativeSplashTurboModuleSpec(reactContext) {

    companion object {
        const val NAME = "SplashTurboModule"
    }

    override fun getName(): String {
        return NAME
    }

    override fun showSplashScreen(promise: Promise) {
        val activity = reactApplicationContext.currentActivity
        if (activity != null) {
            SplashDialog.show(activity)
            promise.resolve(null)
        } else {
            promise.reject("NO_ACTIVITY", "Activity is null")
        }
    }

    override fun hideSplashScreen(promise: Promise) {
        SplashDialog.hide()
        promise.resolve(null)
    }
}
