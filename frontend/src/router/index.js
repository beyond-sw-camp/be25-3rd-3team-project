import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ProfileView from '../views/ProfileView.vue'
import ProfileInfoView from '../views/ProfileInfoView.vue'
import ProfileEditView from '../views/ProfileEditView.vue'
import ProfileDeleteView from '../views/ProfileDeleteView.vue'
import api from '../api/axios'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { guestOnly: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    meta: { guestOnly: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/info',
    name: 'profile-info',
    component: ProfileInfoView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/edit',
    name: 'profile-edit',
    component: ProfileEditView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/delete',
    name: 'profile-delete',
    component: ProfileDeleteView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const requiresAuth = to.meta.requiresAuth
  const guestOnly = to.meta.guestOnly

  let isLoggedIn = false

  try {
    await api.get('/users/me')
    isLoggedIn = true
  } catch (err) {
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