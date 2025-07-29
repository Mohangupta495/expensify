package com.spendo.smsreader

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.spendo.splash.SplashTurboModule  // Import your new module

class MyPackage : BaseReactPackage() {

    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return when (name) {
            "NativeShowcase" -> ShowCaseModule(reactContext)
            "NativeSMSReader" -> SMSReaderModule(reactContext)
            SplashTurboModule.NAME -> SplashTurboModule(reactContext)
            else -> null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            mapOf(
                "NativeShowcase" to ReactModuleInfo(
                    "NativeShowcase", "NativeShowcase",
                    true, false, false, true
                ),
                "NativeSMSReader" to ReactModuleInfo(
                    "NativeSMSReader", "NativeSMSReader",
                    true, false, false, true
                ),
                SplashTurboModule.NAME to ReactModuleInfo(
                    SplashTurboModule.NAME, SplashTurboModule.NAME,
                    true, false, false, true
                )
            )
        }
    }
}
