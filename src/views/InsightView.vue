<script setup lang="ts">
import { useFansStore } from '@/stores/fans'
import { useArticlesStore } from '@/stores/articles'

const fansStore = useFansStore()
const articlesStore = useArticlesStore()

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('zh-CN').format(num)
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">增长分析</h1>
      <p class="text-gray-600">深度分析粉丝增长趋势和内容表现</p>
    </div>

    <div class="card">
      <h3 class="text-lg font-semibold mb-4">趋势图表</h3>
      <div class="text-center py-12 text-gray-500">
        <div class="text-4xl mb-4">📊</div>
        <p>图表功能开发中...</p>
        <p class="text-sm mt-2">将使用 ECharts 展示粉丝增长趋势</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card">
        <h3 class="text-lg font-semibold mb-4">增长速率</h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">日增长率</span>
            <span class="font-semibold text-csdn-red">
              {{ fansStore.currentStats.dailyGrowth > 0 ? '+' : '' }}{{ fansStore.currentStats.dailyGrowth }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">周增长率</span>
            <span class="font-semibold text-csdn-red">
              {{ fansStore.currentStats.weeklyGrowth > 0 ? '+' : '' }}{{ fansStore.currentStats.weeklyGrowth }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">月增长率</span>
            <span class="font-semibold text-csdn-red">
              {{ fansStore.currentStats.monthlyGrowth > 0 ? '+' : '' }}{{ fansStore.currentStats.monthlyGrowth }}
            </span>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4">内容统计</h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">总文章数</span>
            <span class="font-semibold">{{ articlesStore.articles.length }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">总阅读量</span>
            <span class="font-semibold">{{ formatNumber(articlesStore.totalReads) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">总点赞数</span>
            <span class="font-semibold">{{ formatNumber(articlesStore.totalLikes) }}</span>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4">分类分布</h3>
        <div class="space-y-3">
          <div
            v-for="(count, category) in articlesStore.categoryStats"
            :key="category"
            class="flex justify-between"
          >
            <span class="text-gray-600">{{ category }}</span>
            <span class="font-semibold">{{ count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 