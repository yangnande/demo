import Vue from 'vue'
import MsgBox from './MsgBox.vue'

/*
 * message box
 * @param {Object} options
 * options.msg {String} message of the message box
 * options.confirmText {String} text of the confirm button
 * options.showCancelBtn {Boolean} if a cancel button is displayed
 * options.cancelText {String} text of the cancel button
 * options.confirmFn {Function} callback of confirm
 * options.cancelFn {Function} callback of cancel
 */
const leadeon_MsgBox = options => {
  const magBoxDom = document.querySelector('#leadeon-msgbox')
  if (!magBoxDom) {
    var Profile = Vue.extend(MsgBox)
    var instance = new Profile({
      el: document.createElement('div')
    })
    instance.msg = options.msg || ''
    instance.confirmText = options.confirmText || '确认'
    instance.showCancelBtn = options.showCancelBtn || false
    instance.cancelText = options.cancelText || '取消'
    instance.confirmFn = options.confirmFn
    instance.cancelFn = options.cancelFn
    document.body.appendChild(instance.$el)
  }
}

export default leadeon_MsgBox
export { leadeon_MsgBox }
