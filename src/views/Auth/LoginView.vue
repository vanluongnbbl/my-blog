<script setup lang="ts">
import { useForm } from 'vee-validate'
import { loginSchema, type LoginDTO } from '@/validators/loginSchema'
import VTextField from '@/components/common/VTextField.vue'
import { useI18n } from 'vue-i18n'
import { useLogin } from '@/api/auth/useLogin'
import { API_STATUS, PATHS } from '@/utils/constants'
import { useAlertStore } from '@/stores/useAlertStore'
import { localStorageServices } from '@/utils/localStorageServices'
import { queryClient } from '@/libs/vue-query'
import { computed, watch } from 'vue'
import { useUserProfile } from '@/api/auth/useUserProfile'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'

const alertStore = useAlertStore()
const authStore = useAuthStore()
const router = useRouter()

const { t } = useI18n()
const { handleSubmit } = useForm<LoginDTO>({
  validationSchema: loginSchema,
})

const loginApi = useLogin({
  config: {
    onError: (error) => {
      if (error.response?.status === API_STATUS.BAD_REQUEST) {
        alertStore.openAlertConfig({
          type: 'error',
          message: error.response?.data.error.code,
        })
      }
    },
    onSuccess: (data) => {
      localStorageServices.setAccessToken(data.data?.accessToken ?? '')
      localStorageServices.setRefreshToken(data.data?.refreshToken ?? '')
      queryClient.removeQueries()
      userProfile.refetch()
    },
  },
})

const userProfile = useUserProfile({
  config: {
    enabled: false,
  },
})

watch(
  () => userProfile.data.value,
  (newData) => {
    if (newData && userProfile.isSuccess) {
      authStore.setAuth({
        id: newData.data.id,
        username: newData.data.username,
        email: newData.data.email,
      })
      router.push(PATHS.HOME)
    }
  },
)

const onSubmit = handleSubmit((values) => {
  loginApi.mutate(values)
})

const isLoading = computed(() => loginApi.isPending.value)
</script>

<template>
  <div class="flex flex-wrap gap-4 justify-center items-center h-screen">
    <el-card style="width: 480px" shadow="always">
      <el-form @submit.prevent="onSubmit">
        <VTextField name="email" :label="t('auth.email')" />
        <VTextField name="password" :label="t('auth.password')" type="password" />
        <el-link type="primary" @click="router.push(PATHS.REGISTER)">{{ t('auth.signUp') }}</el-link>
        <div class="flex justify-end">
          <el-button type="primary" native-type="submit" size="large" :loading="isLoading" :disabled="isLoading">{{
            t('auth.login')
          }}</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
