import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

// 주소와 화면을 연결 시킨다.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/app',
      component: () => import('../layouts/Layout.vue'),
      children: [
        { path: '', redirect: '/app/sourcing/category' },
        {
          path: 'sourcing/category',
          name: 'app-category-sourcing',
          component: () => import('../views/app/PageCategorySourcing.vue'),
        },
        {
          path: 'sourcing/sites',
          name: 'app-site-integration',
          component: () => import('../views/app/PageSiteIntegration.vue'),
        },
        {
          path: 'products/collected',
          name: 'app-products-collected',
          component: () => import('../views/app/PageProductsCollected.vue'),
        },
        {
          path: 'orders/all',
          name: 'app-orders-all',
          component: () => import('../views/app/PageOrdersAll.vue'),
        },
        {
          path: 'orders/auto',
          name: 'app-orders-auto',
          component: () => import('../views/app/PageOrdersAuto.vue'),
        },
        {
          path: 'orders/cancel-refund',
          name: 'app-orders-cancel',
          component: () => import('../views/app/PageOrdersCancel.vue'),
        },
        {
          path: 'payment/methods',
          name: 'app-payment-methods',
          component: () => import('../views/app/PagePaymentMethods.vue'),
        },
        {
          path: 'payment/failures',
          name: 'app-payment-failures',
          component: () => import('../views/app/PagePaymentFailures.vue'),
        },
        {
          path: 'revenue/monthly',
          name: 'app-revenue-monthly',
          component: () => import('../views/app/PageRevenueMonthly.vue'),
        },
        {
          path: 'revenue/margin',
          name: 'app-revenue-margin',
          component: () => import('../views/app/PageRevenueMargin.vue'),
        },
        {
          path: 'settings/upload-markets',
          name: 'app-upload-markets',
          component: () => import('../views/app/PageUploadMarkets.vue'),
        },
        {
          path: 'settings/excluded-keywords',
          name: 'app-excluded-keywords',
          component: () => import('../views/app/PageExcludedKeywords.vue'),
        },
      ],
    },
    {
      path: '/dev',
      name: 'dev',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
