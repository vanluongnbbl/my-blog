<script setup lang="ts">
import { useForm } from 'vee-validate'
import { loginSchema } from '@/validators/loginSchema'
import VTextField from '@/components/common/VTextField.vue'
import { useI18n } from 'vue-i18n'
import { useLogin } from '@/api/auth/useLogin'
import { API_STATUS } from '@/utils/constants'
import { useAlertStore } from '@/stores/useAlertStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { localStorageServices } from '@/utils/localStorageServices'
import { queryClient } from '@/libs/vue-query'
import { useGetHealth } from '@/api/auth/useHealth'
import { onMounted } from 'vue'

const alertStore = useAlertStore()

const { t } = useI18n()
const { handleSubmit } = useForm({
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
      // setIsLoading(false)
    },
    onSuccess: (data) => {
      localStorageServices.setAccessToken(data.data?.accessToken ?? '')
      localStorageServices.setRefreshToken(data.data?.refreshToken ?? '')
      queryClient.removeQueries()
    },
  },
})

const healthApi = useGetHealth({})

const onSubmit = handleSubmit((values) => {
  console.log('✅ Form values:', values)
  loginApi.mutate(values)
})

onMounted(() => {
  console.log(healthApi.data)
})
</script>

<template>
  <div class="flex flex-wrap gap-4 justify-center items-center h-screen">
    <el-card style="width: 480px" shadow="always">
      <el-form @submit.prevent="onSubmit">
        <VTextField name="email" :label="t('login.email')" />
        <VTextField name="password" :label="t('login.password')" type="password" />
        <div class="flex justify-end">
          <el-button type="primary" native-type="submit" size="large">{{ t('login.login') }}</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
