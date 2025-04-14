<script setup lang="ts">
import { useForm } from 'vee-validate'
import VTextField from '@/components/common/VTextField.vue'
import { useI18n } from 'vue-i18n'
import { API_STATUS, PATHS } from '@/utils/constants'
import { useAlertStore } from '@/stores/useAlertStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { registerSchema, type RegisterDTO } from '@/validators/registerSchema'
import { useRegister } from '@/api/auth/useRegister'

const alertStore = useAlertStore()
const router = useRouter()
const { t } = useI18n()
const { handleSubmit } = useForm<RegisterDTO>({
  validationSchema: registerSchema,
})
const registerApi = useRegister({
  config: {
    onError: (error) => {
      if (error.response?.status === API_STATUS.BAD_REQUEST) {
        alertStore.openAlertConfig({
          type: 'error',
          message: error.response?.data.error.code,
        })
      }
    },
    onSuccess: () => {
      alertStore.openAlertConfig({
        type: 'success',
        message: t('message.success.register'),
      })
      router.push(PATHS.LOGIN)
    },
  },
})

const onSubmit = handleSubmit((values) => {
  console.log('values', values)

  registerApi.mutate({
    username: values.userName,
    email: values.email,
    password: values.password,
  })
})

const isLoading = computed(() => registerApi.isPending.value)
</script>

<template>
  <div class="flex flex-wrap gap-4 justify-center items-center h-screen">
    <el-card style="width: 480px" shadow="always">
      <el-form @submit.prevent="onSubmit">
        <VTextField name="userName" :label="t('auth.userName')" />
        <VTextField name="email" :label="t('auth.email')" />
        <VTextField name="password" :label="t('auth.password')" type="password" />
        <VTextField name="confirmPassword" :label="t('auth.confirmPassword')" type="password" />
        <el-link type="primary" @click="router.push(PATHS.LOGIN)">{{ t('auth.login') }}</el-link>
        <div class="flex justify-end">
          <el-button type="primary" native-type="submit" size="large" :loading="isLoading" :disabled="isLoading">{{
            t('auth.signUp')
          }}</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
