<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
const input = ref('')
defineProps<{
  name: string
  label?: string
  placeholder?: string
  type?: string
  clearable?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <div class="mb-4">
    <label :for="name" class="block mb-1">{{ label }}</label>
    <Field :name="name" v-slot="{ field, meta }">
      <el-input
        v-bind="field"
        :id="name"
        :type="type || 'text'"
        :clearable="clearable"
        :disabled="disabled"
        :status="!meta.valid && meta.touched ? 'error' : ''"
        style="width: 240px"
        v-model="input"
      />
    </Field>

    <ErrorMessage :name="name" v-slot="{ message }">
      <div class="text-xs text-red-500 mt-1">
        {{ message }}
      </div>
    </ErrorMessage>
  </div>
</template>
