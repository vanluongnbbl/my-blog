import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { localStorageServices } from '@/utils/localStorageServices'
import { getUserProfile } from '@/api/auth/useUserProfile'
import { GUEST_ROUTES, PATHS } from '@/utils/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: PATHS.HOME,
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, layout: 'app' },
    },
    {
      path: PATHS.ABOUT,
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true, layout: 'app' },
    },
    {
      path: PATHS.LOGIN,
      name: 'login',
      component: () => import('@/views/Auth/LoginView.vue'),
      meta: { layout: 'none' },
    },
    {
      path: PATHS.REGISTER,
      name: 'register',
      component: () => import('@/views/Auth/RegisterView.vue'),
      meta: { layout: 'none' },
    },
    {
      path: PATHS.FORGOT_PASSWORD,
      name: 'forgot-password',
      component: () => import('@/views/Auth/ForgotPasswordView.vue'),
      meta: { layout: 'none' },
    },
    {
      path: PATHS.RESET_PASSWORD,
      name: 'reset-password',
      component: () => import('@/views/Auth/ResetPasswordView.vue'),
      meta: { layout: 'none' },
    },
    {
      path: PATHS.CHANGE_PASSWORD,
      name: 'change-password',
      component: () => import('@/views/Auth/ChangePasswordView.vue'),
      meta: { layout: 'app' },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  let isAuthenticated = false
  const hasToken = !!localStorageServices.getAccessToken()
  const isGuestRoute = GUEST_ROUTES.includes(to.name as string)

  if (from.path === PATHS.LOGIN && authStore?.auth?.id) {
    return next()
  }

  if (isGuestRoute && !authStore?.auth?.id) {
    try {
      const userProfile = await getUserProfile()
      if (userProfile?.data?.id) {
        authStore.setAuth({
          id: userProfile?.data?.id,
          username: userProfile?.data?.username,
          email: userProfile?.data?.email,
        })

        return next({ name: 'home' })
      }
    } catch (error) {
      return next()
    }
  }

  if (!isGuestRoute) {
    try {
      const userProfile = await getUserProfile()
      if (userProfile?.data?.id) {
        authStore.setAuth({
          id: userProfile?.data?.id,
          username: userProfile?.data?.username,
          email: userProfile?.data?.email,
        })

        isAuthenticated = hasToken && !!userProfile?.data?.id
      }
    } catch (error) {
      return next({ name: 'login' })
    }
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' })
  }
  next()
})

export default router
