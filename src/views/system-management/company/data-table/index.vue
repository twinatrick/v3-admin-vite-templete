<script setup lang="ts">
import CustomTable from "@/components/CustomTable/index.vue"
import type { CustomTableOptionType } from "@/components/CustomTable/types/Option"
import { Company } from "../type"

const prop = defineProps<{
  data: Company[]
  loading: boolean
}>()

const emit = defineEmits<{
  (event: "edit", row: Company): void
  (event: "delete", row: Company): void
  (event: "scrape", row: Company): void
}>()

const options: CustomTableOptionType = {
  table: {
    border: true
  },
  pagination: {
    layout: "total, prev, pager, next, jumper"
  }
}

function handleScrape(row: Company) {
  emit("scrape", row)
}
</script>

<template>
  <custom-table :data="prop.data" :option="options" :total="prop.data.length" :loading="prop.loading" class="h-100%">
    <template #body>
      <el-table-column prop="name" label="公司名稱" min-width="150" />
      <el-table-column prop="websites" label="網址" min-width="200">
        <template #default="{ row }">
          <template v-if="row.websites && row.websites.length > 0">
            <div v-for="site in row.websites" :key="site">
              <el-link type="primary" :href="site" target="_blank">{{ site }}</el-link>
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="emit('edit', row)">編輯</el-button>
          <el-button size="small" type="warning" @click="handleScrape(row)">Scrape</el-button>
          <el-button size="small" type="danger" @click="emit('delete', row)">刪除</el-button>
        </template>
      </el-table-column>
    </template>
  </custom-table>
</template>
