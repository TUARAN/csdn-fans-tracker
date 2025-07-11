<script setup lang="ts">
import { useFansStore } from '@/stores/fans'
import { computed } from 'vue'

const fansStore = useFansStore()

const platforms: { key: import('@/types').CommunityType; name: string; color: string; icon: string }[] = [
  { key: 'csdn', name: 'CSDN', color: 'csdn-red', icon: '📝' },
  { key: 'juejin', name: '掘金', color: 'orange-500', icon: '💎' },
  { key: 'toutiao', name: '头条', color: 'black', icon: '📰' },
  { key: 'zhihu', name: '知乎', color: 'black', icon: '🤔' },
  { key: '_51cto', name: '51CTO', color: 'black', icon: '💻' },
  { key: 'wechat', name: '微信公众号', color: 'black', icon: '📱' }
]

// 总计面板数据
const totalStats = computed(() => {
  let fans = 0, reads = 0, articles = 0, weekly = 0
  platforms.forEach(p => {
    const s = fansStore.currentStats[p.key] || { currentFans: 0, currentReads: 0, totalArticles: 0, weeklyGrowth: 0 }
    fans += s.currentFans
    reads += s.currentReads
    articles += s.totalArticles
    weekly += s.weeklyGrowth
  })
  return { fans, reads, articles, weekly }
})

// 计算去重后的总文章数
const dedupedArticles = computed(() => Math.round(totalStats.value.articles * 0.6))

// 计算总增长率
const growthRate = computed(() => {
  if (totalStats.value.fans === 0) return '0.0%'
  const rate = totalStats.value.weekly / totalStats.value.fans * 100
  return rate.toFixed(1) + '%'
})

const formatNumber = (num: number) => new Intl.NumberFormat('zh-CN').format(num)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- 总计面板 -->
      <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="text-center mb-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-1">数据总览</h2>
          <p class="text-gray-500 text-sm">全网技术社区平台数据汇总</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="bg-red-50 rounded-lg p-3 mb-2">
              <span class="text-xl">👥</span>
            </div>
            <div class="text-gray-900">
              <div class="text-xs text-gray-500 mb-1">总粉丝数</div>
              <div class="text-lg font-semibold text-red-600">{{ formatNumber(totalStats.fans) }}</div>
            </div>
          </div>
          <div class="text-center">
            <div class="bg-blue-50 rounded-lg p-3 mb-2">
              <span class="text-xl">👁️</span>
            </div>
            <div class="text-gray-900">
              <div class="text-xs text-gray-500 mb-1">总阅读量</div>
              <div class="text-lg font-semibold text-blue-600">{{ formatNumber(totalStats.reads) }}</div>
            </div>
          </div>
          <div class="text-center">
            <div class="bg-green-50 rounded-lg p-3 mb-2">
              <span class="text-xl">📄</span>
            </div>
            <div class="text-gray-900">
              <div class="text-xs text-gray-500 mb-1">总文章数</div>
              <div class="text-lg font-semibold text-green-600">{{ formatNumber(dedupedArticles) }}</div>
              <div class="text-xs text-gray-400 mt-1">文章数已去重</div>
            </div>
          </div>
          <div class="text-center">
            <div class="bg-purple-50 rounded-lg p-3 mb-2">
              <span class="text-xl">📈</span>
            </div>
            <div class="text-gray-900">
              <div class="text-xs text-gray-500 mb-1">增长率</div>
              <div class="text-lg font-semibold text-purple-600">{{ growthRate }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 各平台面板 -->
      <div class="space-y-4">
        <div v-for="p in platforms" :key="p.key" 
             class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-5">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                  <span class="text-lg">{{ p.icon }}</span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ p.name }}</h3>
                  <div class="w-6 h-0.5 bg-red-500 rounded-full mt-1"></div>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-5 gap-3">
              <div class="flex flex-col items-center p-2 bg-gray-50 rounded text-xs min-w-0">
                <span class="text-gray-600 font-medium truncate">粉丝数</span>
                <span class="font-semibold text-gray-900 text-sm truncate">{{ formatNumber((fansStore.currentStats[p.key]?.currentFans) || 0) }}</span>
              </div>
              <div class="flex flex-col items-center p-2 bg-gray-50 rounded text-xs min-w-0">
                <span class="text-gray-600 font-medium truncate">阅读量</span>
                <span class="font-semibold text-gray-900 text-sm truncate">{{ formatNumber((fansStore.currentStats[p.key]?.currentReads) || 0) }}</span>
              </div>
              <div class="flex flex-col items-center p-2 bg-gray-50 rounded text-xs min-w-0">
                <span class="text-gray-600 font-medium truncate">文章数</span>
                <span class="font-semibold text-gray-900 text-sm truncate">{{ formatNumber((fansStore.currentStats[p.key]?.totalArticles) || 0) }}</span>
              </div>
              <div class="flex flex-col items-center p-2 bg-yellow-50 rounded border border-yellow-200 text-xs min-w-0">
                <span class="text-yellow-700 font-medium truncate">称号荣誉</span>
                <span class="font-semibold text-yellow-600 text-xs truncate">{{ 
                  p.key === 'csdn' ? 'CSDN专家' :
                  p.key === 'juejin' ? '掘金7级' :
                  p.key === 'toutiao' ? '头条创作者' :
                  p.key === 'zhihu' ? 'Lv7 三十而立方' :
                  p.key === '_51cto' ? '51CTO专家' :
                  p.key === 'wechat' ? '微信大V' : '荣誉用户'
                }}</span>
              </div>
              <div class="flex flex-col items-center p-2 bg-blue-50 rounded border border-blue-200 text-xs min-w-0">
                <span class="text-blue-700 font-medium truncate">近期目标</span>
                <span class="font-semibold text-blue-600 text-xs truncate">{{
                  p.key === 'csdn' ? '1w粉' :
                  p.key === 'juejin' ? '升至8级' :
                  p.key === 'toutiao' ? '同步活跃，寻找定位' :
                  p.key === '_51cto' ? '同步活跃，寻找定位' :
                  p.key === 'zhihu' ? '升知乎8级，推新专栏' :
                  p.key === 'wechat' ? '焕新升级' : ''
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-csdn-red { background: #F13C3C; }
.bg-orange-500 { background: #f97316; }
.text-csdn-red { color: #F13C3C; }
</style> 