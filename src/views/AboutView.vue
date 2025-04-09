<script setup lang="ts">
import BlogHeader from '@/components/common/Header/BlogHeader.vue'
import { useAlertStore } from '@/stores/useAlertStore'
import { useAuthStore } from '@/stores/useAuthStore'
const alertStore = useAlertStore()
const authStore = useAuthStore()
</script>

<template>
  <div class="about">
    <BlogHeader />
  </div>
  <el-button :plain="true" @click="alertStore.openAlertConfig({ type: 'success', message: 'thanh cong roi!' })"
    >Success</el-button
  >

  <button @click="authStore.clearAuth()">Logout</button>
</template>

<style></style>
