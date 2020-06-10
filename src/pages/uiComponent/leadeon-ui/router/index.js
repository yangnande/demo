import Vue from 'vue'
import Router from 'vue-router'

import NavConfig from '../nav.config.json'

Vue.use(Router)

const routes = []
NavConfig.list.map(nav => {
  routes.push({
    path: nav.path,
    name: nav.name,
    component: () => import(`../example${nav.path}.vue`)
  })
})
routes.push({
  path: '/',
  name: 'navbar',
  component: () => import('../example/navbar.vue')
})

export default new Router({
  routes
})
