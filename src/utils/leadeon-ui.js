import leadeon_Toast from '../pages/uiComponent/leadeon-ui/packages/Toast/index'
import leadeon_MsgBox from '../pages/uiComponent/leadeon-ui/packages/MsgBox/index'
import leadeon_Loading from '../pages/uiComponent/leadeon-ui/packages/Loading/index'
import leadeon_DrawDoughnut from '../pages/uiComponent/leadeon-ui/packages/Doughnut/index'
import leadeon_NavBar from '../pages/uiComponent/leadeon-ui/packages/NavBar/index'

const leadeon_EndLoading = () => {
  const loadingDom = document.querySelector('#leadeon-loading')
  loadingDom.style.display = 'none'
}

const install = function (Vue) {
  if (install.installed) return

  Vue.component(leadeon_NavBar.name, leadeon_NavBar)

  Vue.$leadeon_Toast = Vue.prototype.$leadeon_Toast = leadeon_Toast
  Vue.$leadeon_MsgBox = Vue.prototype.$leadeon_MsgBox = leadeon_MsgBox
  Vue.$leadeon_Loading = Vue.prototype.$leadeon_Loading = leadeon_Loading
  Vue.$leadeon_EndLoading = Vue.prototype.$leadeon_EndLoading = leadeon_EndLoading
  Vue.$leadeon_DrawDoughnut = Vue.prototype.$leadeon_DrawDoughnut = leadeon_DrawDoughnut
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
};

export {
  install,
  leadeon_Toast,
  leadeon_MsgBox,
  leadeon_Loading,
  leadeon_EndLoading,
  leadeon_DrawDoughnut,
  leadeon_NavBar
}
