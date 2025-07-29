package com.spendo.splash

import android.app.Activity
import android.app.Dialog
import com.spendo.R

object SplashDialog {
    private var dialog: Dialog? = null

    fun show(activity: Activity) {
        if (dialog?.isShowing == true) return
        dialog = Dialog(activity, android.R.style.Theme_Translucent_NoTitleBar_Fullscreen).apply {
            setContentView(R.layout.splash_screen)
            setCancelable(false)
            show()
        }
    }

    fun hide() {
        dialog?.dismiss()
        dialog = null
    }
}