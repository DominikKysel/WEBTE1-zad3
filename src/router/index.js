import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LineView from '../views/LineView.vue'

const router = createRouter({
  history: createWebHistory('/~xkyseld/graface'),
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/line-view',
      name: 'line-view',
      component: LineView
    }
  ]
})

export default router
