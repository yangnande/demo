import Vue from 'vue'
import Toast from './Toast.vue'
/*
* toast
* @param {String} msg
* @param {String} type - success error warning
*/
const leadeon_Toast = (msg, type) => {
  /* eslint-disable */
  clearTimeout(timer)
  /* eslint-enable */
  var Profile = Vue.extend(Toast)
  var instance = new Profile({
    el: document.createElement('div')
  })
  instance.msg = msg || ''
  instance.type = type
  document.body.appendChild(instance.$el)
  const timer = setTimeout(() => {
    const toastDom = document.querySelector('#leadeon-toast')
    toastDom.parentNode.removeChild(toastDom)
  }, 2000)
}

export default leadeon_Toast
export { leadeon_Toast }
