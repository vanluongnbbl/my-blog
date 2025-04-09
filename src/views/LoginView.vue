<script setup lang="ts">
import { useForm } from 'vee-validate'
import { loginSchema } from '@/validators/loginSchema'
import VTextField from '@/components/common/VTextField.vue'

const { handleSubmit } = useForm({
  validationSchema: loginSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log('✅ Form values:', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <VTextField name="email" label="Email" />
    <VTextField name="password" label="Password" type="password" />
    <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white">Login</button>
  </form>
</template>
