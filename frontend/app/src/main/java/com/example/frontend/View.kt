package com.example.frontend

import android.content.res.TypedArray
import android.util.AttributeSet
import android.util.TypedValue
import android.view.View
import androidx.cardview.widget.CardView

inline fun View.parseTypedArray(
    attrs: AttributeSet,
    styleableRes: IntArray,
    block: TypedArray.() -> Unit
) {
    val typedArray = context.obtainStyledAttributes(attrs, styleableRes)
    block(typedArray)
    typedArray.recycle()
}

inline fun View.dpToPx(dp: Int): Float = TypedValue.applyDimension(
    TypedValue.COMPLEX_UNIT_DIP, dp.toFloat(),
    context.resources.displayMetrics
)

inline fun CardView.setForegroundSelectable() {
    val typedValue = android.util.TypedValue()
    context.theme.resolveAttribute(android.R.attr.selectableItemBackground, typedValue, true)
    this.foreground = context.drawable(typedValue.resourceId)
}