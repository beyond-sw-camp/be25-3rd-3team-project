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

// 내비게이션 가드(Navigation Guard)
// - 라우팅이 일어날 때 프로르래밍 방식으로 내비게이션을 안전하게 보호하는 기능을 수행한다.
// - 라우팅 경로 변경, 새로 고침 시에 리프레시 토큰으로 액세스 토큰을 재발급 받는다.
// - beforeEach에 전달하는 인자 중 to는 이동하려는 경로를 나타내고 from은 이동 전 현재 경로 정보이다.
// router.beforeEach((to, from) =>{
//   // console.log(to);
//   // console.log(from);
//   // const authStore = useAuthStore();
//   try {
//     if (authStore.tokenInfo.accessToken === ''){
//       // await authStore.refreshAccessToken();
//     }
    
//     if(to.name === 'login' && authStore.tokenInfo.accessToken){
//       return {name: 'home'};
//     }
//   } catch (error){
//     if (to.name !== 'login'){
//       return {name : login};
//     }
//   }
// });

export default router
