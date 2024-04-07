import { createRouter, createWebHistory } from 'vue-router'

import UserList from '@/views/user/index.vue'
import Edit from '@/views/user/edit.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/user',
      component: UserList
    }
  ]
})