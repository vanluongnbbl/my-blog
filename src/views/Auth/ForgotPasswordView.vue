<script setup lang="ts">
import { useForm } from 'vee-validate'
import VTextField from '@/components/common/VTextField.vue'
import { useI18n } from 'vue-i18n'
import { API_STATUS, PATHS } from '@/utils/constants'
import { useAlertStore } from '@/stores/useAlertStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { forgotPasswordSchema, type ForgotPasswordDTO } from '@/validators/forgotPasswordSchema'
import { useForgotPassword } from '@/api/auth/useForgotPassword'

const alertStore = useAlertStore()
const router = useRouter()
const { t } = useI18n()
const { handleSubmit } = useForm<ForgotPasswordDTO>({
  validationSchema: forgotPasswordSchema,
})

const requestResetPassword = useForgotPassword({
  config: {
    onError: (error) => {
      if (error.response?.status === API_STATUS.BAD_REQUEST) {
        alertStore.openAlertConfig({
          type: 'error',
          message: error.response?.data.message,
        })
      }

      if (error.response?.status === API_STATUS.NOT_FOUND) {
        alertStore.openAlertConfig({
          type: 'error',
          message: 'Email not exist!',
        })
      }
    },
    onSuccess: () => {
      alertStore.openAlertConfig({
        type: 'success',
        message: 'Password reset request has been sent.',
      })
    },
  },
})

const onSubmit = handleSubmit((values) => {
  requestResetPassword.mutate(values)
})

const isLoading = computed(() => requestResetPassword.isPending.value)
</script>

<template>
  <div class="flex flex-wrap gap-4 justify-center items-center h-screen">
    <el-card style="width: 480px" shadow="always">
      <el-page-header @back="router.push(PATHS.LOGIN)" class="mb-4" />
      <el-form @submit.prevent="onSubmit">
        <VTextField name="email" :label="t('auth.email')" />
        <div class="flex justify-end">
          <el-button type="primary" native-type="submit" size="large" :loading="isLoading" :disabled="isLoading">{{
            t('auth.resetPassword')
          }}</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
::v-deep(.el-page-header__left .el-divider--vertical) {
  display: none;
}
</style>
