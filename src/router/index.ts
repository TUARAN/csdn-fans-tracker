import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/dashboard',
      redirect: '/'
    },
    {
      path: '/plan/:platform/:account',
      name: '平台计划',
      component: () => import('@/views/PlatformPlanView.vue')
    }
  ],
})

export default router
