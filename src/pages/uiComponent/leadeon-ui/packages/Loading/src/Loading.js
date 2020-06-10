import Vue from 'vue'
import Loading from './Loading.vue'

const leadeon_Loading = () => {
  const loadingDom = document.querySelector('#leadeon-loading')
  if (!loadingDom) {
    var Profile = Vue.extend(Loading)
    var instance = new Profile({
      el: document.createElement('div')
    })
    document.body.appendChild(instance.$el)
  } else {
    loadingDom.style.display = 'block'
  }
}

export default leadeon_Loading
export { leadeon_Loading }
