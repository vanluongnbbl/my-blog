<script setup lang="ts">
import BlogHeader from '@/components/common/Header/BlogHeader.vue'
</script>

<template>
  <BlogHeader />
  <el-container>
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>
