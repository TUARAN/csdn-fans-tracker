<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useFansStore } from '@/stores/fans'
import dayjs from 'dayjs'

const fansStore = useFansStore()

const showDataForm = ref(false)
const dataForm = reactive({
  date: dayjs().format('YYYY-MM-DD'),
  fansCount: 0,
  readCount: 0,
  articleCount: 0
})

const addData = () => {
  const latestData = fansStore.fanDataList[fansStore.fanDataList.length - 1]
  const dailyFansGrowth = latestData ? dataForm.fansCount - latestData.fansCount : 0
  const dailyReadGrowth = latestData ? dataForm.readCount - latestData.readCount : 0

  fansStore.addFanData({
    date: dataForm.date,
    fansCount: dataForm.fansCount,
    readCount: dataForm.readCount,
    articleCount: dataForm.articleCount,
    dailyFansGrowth,
    dailyReadGrowth
  })

  Object.assign(dataForm, {
    date: dayjs().format('YYYY-MM-DD'),
    fansCount: 0,
    readCount: 0,
    articleCount: 0
  })
  showDataForm.value = false
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('zh-CN').format(num)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">数据面板</h1>
        <p class="text-gray-600">实时追踪粉丝增长和内容表现</p>
      </div>
      <button
        @click="showDataForm = true"
        class="btn-primary"
      >
        录入数据
      </button>
    </div>

    <div v-if="showDataForm" class="card">
      <h3 class="text-lg font-semibold mb-4">录入今日数据</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">日期</label>
          <input
            v-model="dataForm.date"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-csdn-red focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">粉丝数</label>
          <input
            v-model.number="dataForm.fansCount"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-csdn-red focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">阅读量</label>
          <input
            v-model.number="dataForm.readCount"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-csdn-red focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">文章数</label>
          <input
            v-model.number="dataForm.articleCount"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-csdn-red focus:border-transparent"
          />
        </div>
      </div>
      <div class="flex justify-end space-x-3 mt-4">
        <button
          @click="showDataForm = false"
          class="btn-secondary"
        >
          取消
        </button>
        <button
          @click="addData"
          class="btn-primary"
        >
          保存数据
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">当前粉丝数</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ formatNumber(fansStore.currentStats.currentFans) }}
            </p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <span class="text-csdn-red text-xl">👥</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">总阅读量</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ formatNumber(fansStore.currentStats.currentReads) }}
            </p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 text-xl">👁️</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">文章总数</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ formatNumber(fansStore.currentStats.totalArticles) }}
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <span class="text-green-600 text-xl">📄</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">本周增长</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ formatNumber(fansStore.currentStats.weeklyGrowth) }}
            </p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <span class="text-purple-600 text-xl">📈</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 