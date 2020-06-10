import Vue from 'vue'
import Doughnut from './Doughnut.vue'
/*
* Doughnut
*/
const leadeon_DrawDoughnut = options => {
  var Profile = Vue.extend(Doughnut)
  var instance = new Profile({
    el: document.createElement('div')
  })
  instance.outerDiameter = options.outerDiameter || 300
  instance.innerDiameter = options.innerDiameter || 150
  instance.itemsProportion = options.itemsProportion || [20, 20, 20, 20, 20]
  instance.itemsColor = options.itemsColor || ['red', 'orange', 'blue', 'pink', 'yellow']
  setTimeout(() => {
    const mountElement = document.querySelector('#doughnut-mount') || document.body
    mountElement.appendChild(instance.$el)
  }, 300)
}

export default leadeon_DrawDoughnut
export { leadeon_DrawDoughnut }
