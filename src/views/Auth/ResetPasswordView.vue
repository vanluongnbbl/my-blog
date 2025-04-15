<script setup lang="ts">
import { useForm } from 'vee-validate'
import VTextField from '@/components/common/VTextField.vue'
import { useI18n } from 'vue-i18n'
import { API_STATUS, PATHS } from '@/utils/constants'
import { useAlertStore } from '@/stores/useAlertStore'
import { computed } from 'vue'
import { changePasswordSchema, type ChangePasswordDTO } from '@/validators/changePasswordSchema'
import { useRouter } from 'vue-router'
import { useResetPassword } from '@/api/auth/useResetPassword'

const router = useRouter()
const alertStore = useAlertStore()
const { t } = useI18n()
const { handleSubmit } = useForm<ChangePasswordDTO>({
  validationSchema: changePasswordSchema,
})

const changePasswordApi = useResetPassword({
  config: {
    onError: (error) => {
      if (error.response?.status === API_STATUS.BAD_REQUEST) {
        alertStore.openAlertConfig({
          type: 'error',
          message: error.response?.data.message,
        })
      }
    },
    onSuccess: () => {
      alertStore.openAlertConfig({
        type: 'success',
        message: 'Reset Password Successfully!',
      })
      router.push(PATHS.LOGIN)
    },
  },
})

const onSubmit = handleSubmit((values) => {
  changePasswordApi.mutate({
    password: values.password,
    passwordConfirm: values.confirmPassword,
  })
})

const isLoading = computed(() => changePasswordApi.isPending.value)
</script>

<template>
  <div class="flex flex-wrap gap-4 justify-center items-center h-screen">
    <el-card style="width: 480px" shadow="always">
      <el-form @submit.prevent="onSubmit">
        <VTextField name="password" :label="t('auth.newPassword')" type="password" />
        <VTextField name="confirmPassword" :label="t('auth.confirmPassword')" type="password" />
        <div class="flex justify-end">
          <el-button type="primary" native-type="submit" size="large" :loading="isLoading" :disabled="isLoading">{{
            t('auth.resetPassword')
          }}</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
