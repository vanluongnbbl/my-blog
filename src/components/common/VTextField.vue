<script setup lang="ts">
import { Field } from 'vee-validate'

withDefaults(
  defineProps<{
    name: string
    label?: string
    placeholder?: string
    type?: string
    clearable?: boolean
    disabled?: boolean
    minRows?: number
    maxRows?: number
  }>(),
  {
    minRows: 2,
    maxRows: 4,
  },
)
</script>

<template>
  <div class="mb-2">
    <label :for="name" class="block mb-1">{{ label }}</label>
    <Field :name="name" v-slot="{ field, meta, errorMessage }" :validateOnChange="false" :validateOnModelUpdate="false">
      <el-form-item :error="meta.touched && errorMessage ? errorMessage : ''">
        <el-input
          :id="name"
          :type="type || 'text'"
          :placeholder="placeholder"
          :clearable="clearable"
          :disabled="disabled"
          :status="!meta.valid && meta.touched ? 'error' : ''"
          size="large"
          :autosize="{ minRows, maxRows }"
          :model-value="field.value"
          @input="(val: string) => (field.value = val)"
          v-bind="field"
          @blur="
            () => {
              field.value = field.value?.trim?.()
            }
          "
        />
      </el-form-item>
    </Field>
  </div>
</template>
