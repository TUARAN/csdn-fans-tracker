<script setup lang="ts">
import { ref } from 'vue'
import { useArticlesStore } from '@/stores/articles'
import dayjs from 'dayjs'

const articlesStore = useArticlesStore()
const currentDate = ref(dayjs())

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const previousMonth = () => {
  currentDate.value = currentDate.value.subtract(1, 'month')
}

const nextMonth = () => {
  currentDate.value = currentDate.value.add(1, 'month')
}

const goToToday = () => {
  currentDate.value = dayjs()
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">发布日历</h1>
        <p class="text-gray-600">可视化内容发布计划</p>
      </div>
      <button @click="goToToday" class="btn-secondary">
        回到今天
      </button>
    </div>

    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <button @click="previousMonth" class="p-2 hover:bg-gray-100 rounded-lg">
          ←
        </button>
        <h2 class="text-xl font-semibold">
          {{ currentDate.format('YYYY年MM月') }}
        </h2>
        <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded-lg">
          →
        </button>
      </div>

      <div class="grid grid-cols-7 gap-1 mb-2">
        <div
          v-for="day in weekDays"
          :key="day"
          class="p-2 text-center text-sm font-medium text-gray-500"
        >
          {{ day }}
        </div>
      </div>

      <div class="text-center py-8 text-gray-500">
        日历功能开发中...
      </div>
    </div>
  </div>
</template> 