<!-- src/components/LanguageSwitcher.vue -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale } = useI18n()

const nextLang = computed(() => (locale.value === 'en' ? 'vi' : 'en'))

function switchLocale() {
  locale.value = nextLang.value
}
</script>

<template>
  <el-button :plain="true" @click="switchLocale">Switch to {{ nextLang.toUpperCase() }}</el-button>
</template>
