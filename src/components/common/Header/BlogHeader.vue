<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore'
import { PATHS } from '@/utils/constants'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const { t } = useI18n()
const authStore = useAuthStore()
</script>

<template>
  <header>
    <nav>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :ellipsis="false"
        @select="handleSelect"
        arr
      >
        <el-menu-item index="1">
          <RouterLink :to="PATHS.HOME"> {{ t('header.home') }} </RouterLink>
        </el-menu-item>

        <el-menu-item index="2">
          <RouterLink :to="PATHS.ABOUT">{{ t('header.about') }} </RouterLink>
        </el-menu-item>
        <div class="menu-spacer ml-auto" />

        <el-sub-menu index="2" class="avatar">
          <template #title>
            <div class="block flex">
              <el-avatar :size="40" :src="circleUrl" />
            </div>
          </template>
          <el-menu-item index="2-1">Profile</el-menu-item>
          <el-menu-item index="2-2">
            <RouterLink :to="PATHS.CHANGE_PASSWORD"> {{ t('header.changePassword') }} </RouterLink>
          </el-menu-item>
          <el-menu-item index="2-3" @click="authStore.clearAuth()">Logout</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </nav>
  </header>
</template>

<style scoped>
.avatar > div.block {
  flex: 1;
  text-align: center;
}

.avatar > div.block:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
</style>
