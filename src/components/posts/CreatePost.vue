<script setup lang="ts">
import { createPostSchema, type PostDTO } from '@/validators/createPostSchema'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useForm } from 'vee-validate'
import { reactive, ref } from 'vue'
import VTextField from '../common/VTextField.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const form = reactive({
  title: '',
  paragraph: '',
})

const dialogFormVisible = ref(false)
const { handleSubmit } = useForm<PostDTO>({
  validationSchema: createPostSchema,
})

const onSubmit = handleSubmit((values) => {
  // loginApi.mutate(values)
})
</script>

<template>
  <div class="flex flex-wrap gap-4 cursor-pointer">
    <div class="flex justify-end w-full">
      <el-button type="primary" :icon="Plus" size="medium" @click="dialogFormVisible = true"> Create Post </el-button>
    </div>

    <el-dialog v-model="dialogFormVisible" title="Create post" width="500">
      <el-form :model="form" @submit.prevent="onSubmit">
        <VTextField name="title" placeholder="Title..." />
        <VTextField name="content" placeholder="Paragraph..." type="textarea" :minRows="10" :maxRows="20" />
        <!-- <el-input
          v-model="form.paragraph"
          :autosize="{ minRows: 10, maxRows: 20 }"
          type="textarea"
          placeholder="Paragraph..."
          size="large"
        /> -->

        <div class="mt-4">
          <el-button type="primary" size="medium">
            Upload
            <el-icon class="el-icon--right"><Upload /> </el-icon>
          </el-button>
        </div>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="medium">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false" size="medium">Confirm</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
