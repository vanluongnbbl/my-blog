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
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Auth/RegisterView.vue'),
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

  if (!isGuestRoute) {
    const userProfile = await getUserProfile()
    if (userProfile?.data?.id) {
      authStore.setAuth({
        id: userProfile?.data?.id,
        username: userProfile?.data?.username,
        email: userProfile?.data?.email,
      })

      isAuthenticated = hasToken && !!userProfile?.data?.id
    }
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' })
  }
  next()
})

export default router
