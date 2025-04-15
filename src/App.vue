<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import AppLayout from './layouts/AppLayout.vue'

const route = useRoute()
</script>

<template>
  <AppLayout v-if="route.meta.layout === 'app'">
    <RouterView />
  </AppLayout>
  <RouterView v-else />
</template>
