<script setup lang="ts">
import { useUserProfile } from '@/api/auth/useUserProfile'
import BlogHeader from '@/components/common/Header/BlogHeader.vue'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const userProfile = useUserProfile({
  config: {
    enabled: false,
  },
})
</script>

<template>
  <BlogHeader />
  <main>
    <h1>{{ t('home.title') }}</h1>
    <p>{{ t('home.description') }}</p>
    <p>{{ t('home.test.test2') }}</p>
  </main>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
  <button @click="userProfile.refetch()">get userProfile</button>
  <LanguageSwitcher />
</template>
