import { createRouter, createWebHashHistory } from 'vue-router'
import Threads from '../views/Threads.vue'
import Thread from '../views/Thread.vue'
import Detalhes from '../views/Detalhes.vue'

const routes = [
  {
    path: '/',
    name: 'Threads',
    component: Threads
  },
  {
    path: '/Thread',
    name: 'Thread',
    component: Thread
  },
  {
    path: '/Detalhes/:codigo',
    name: 'Detalhes',
    component: Detalhes
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
