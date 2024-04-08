import { createRouter, createWebHistory } from 'vue-router'

import UserList from '@/views/user/index.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: UserList
    }
  ]
})