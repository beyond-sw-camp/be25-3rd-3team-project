import { createRouter, createWebHistory } from 'vue-router'
import api from '../api/axios'

// 주소와 화면을 연결 시킨다.
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile/info',
    name: 'profile-info',
    component: () => import('../views/ProfileInfoView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile/edit',
    name: 'profile-edit',
    component: () => import('../views/ProfileEditView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile/delete',
    name: 'profile-delete',
    component: () => import('../views/ProfileDeleteView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/find-id',
    name: 'find-id',
    component: () => import('../views/FindIdView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/find-password',
    name: 'find-password',
    component: () => import('../views/FindPasswordView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/app',
    component: () => import('../layouts/Layout.vue'),
    meta: { requiresAuth: true },
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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const guestOnly = to.matched.some((record) => record.meta.guestOnly)

  let isLoggedIn = false

  try {
    await api.get('/api/users/me')
    isLoggedIn = true
  } catch {
    isLoggedIn = false
  }

  if (requiresAuth && !isLoggedIn) {
    return '/login'
  }

  if (guestOnly && isLoggedIn) {
    return '/'
  }

  return true
})

export default router
