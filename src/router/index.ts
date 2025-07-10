import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: '数据面板',
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/',
      redirect: '/dashboard'
    }
  ],
})

export default router
