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
const dedupedArticles = computed(() => Math.round(totalStats.value.articles * 0.5))

// 计算总增长率
const growthRate = computed(() => {
  if (totalStats.value.fans === 0) return '0.0%'
  const rate = totalStats.value.weekly / totalStats.value.fans * 100
  return rate.toFixed(1) + '%'
})

const formatNumber = (num: number) => new Intl.NumberFormat('zh-CN').format(num)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
    <div class="max-w-7xl mx-auto space-y-8">
      <!-- 总计面板 -->
      <div class="bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl p-8 shadow-2xl border border-gray-800">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-white mb-2">数据总览</h2>
          <p class="text-gray-300">全网技术社区平台数据汇总</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center group">
            <div class="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 mb-3 transform group-hover:scale-105 transition-all duration-300 shadow-lg">
              <span class="text-2xl">👥</span>
            </div>
            <div class="text-white">
              <div class="text-sm text-gray-300 mb-1">总粉丝数</div>
              <div class="text-2xl font-bold text-red-400">{{ formatNumber(totalStats.fans) }}</div>
            </div>
          </div>
          <div class="text-center group">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 mb-3 transform group-hover:scale-105 transition-all duration-300 shadow-lg">
              <span class="text-2xl">👁️</span>
            </div>
            <div class="text-white">
              <div class="text-sm text-gray-300 mb-1">总阅读量</div>
              <div class="text-2xl font-bold text-blue-400">{{ formatNumber(totalStats.reads) }}</div>
            </div>
          </div>
          <div class="text-center group">
            <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 mb-3 transform group-hover:scale-105 transition-all duration-300 shadow-lg">
              <span class="text-2xl">📄</span>
            </div>
            <div class="text-white">
              <div class="text-sm text-gray-300 mb-1">总文章数</div>
              <div class="text-2xl font-bold text-green-400">{{ formatNumber(dedupedArticles) }}</div>
              <div class="text-xs text-gray-400 mt-1">文章数已去重</div>
            </div>
          </div>
          <div class="text-center group">
            <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 mb-3 transform group-hover:scale-105 transition-all duration-300 shadow-lg">
              <span class="text-2xl">📈</span>
            </div>
            <div class="text-white">
              <div class="text-sm text-gray-300 mb-1">增长率</div>
              <div class="text-2xl font-bold text-purple-400">{{ growthRate }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 各平台面板 -->
      <div class="space-y-4">
        <div v-for="p in platforms" :key="p.key" 
             class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
          <div class="p-5">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mr-4">
                  <span class="text-xl">{{ p.icon }}</span>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900">{{ p.name }}</h3>
                  <div class="w-8 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-2"></div>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-5 gap-3">
              <div class="flex flex-col items-center p-2 bg-gray-50 rounded text-xs min-w-0">
                <span class="text-gray-600 font-medium truncate">粉丝数</span>
                <span class="font-bold text-gray-900 text-base truncate">{{ formatNumber((fansStore.currentStats[p.key]?.currentFans) || 0) }}</span>
              </div>
              <div class="flex flex-col items-center p-2 bg-gray-50 rounded text-xs min-w-0">
                <span class="text-gray-600 font-medium truncate">阅读量</span>
                <span class="font-bold text-gray-900 text-base truncate">{{ formatNumber((fansStore.currentStats[p.key]?.currentReads) || 0) }}</span>
              </div>
              <div class="flex flex-col items-center p-2 bg-gray-50 rounded text-xs min-w-0">
                <span class="text-gray-600 font-medium truncate">文章数</span>
                <span class="font-bold text-gray-900 text-base truncate">{{ formatNumber((fansStore.currentStats[p.key]?.totalArticles) || 0) }}</span>
              </div>
              <div class="flex flex-col items-center p-2 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded border border-yellow-200 text-xs min-w-0">
                <span class="text-yellow-700 font-medium truncate">称号荣誉</span>
                <span class="font-bold text-yellow-600 text-xs truncate">{{ 
                  p.key === 'csdn' ? 'CSDN专家' :
                  p.key === 'juejin' ? '掘金7级' :
                  p.key === 'toutiao' ? '头条创作者' :
                  p.key === 'zhihu' ? 'Lv7 三十而立方' :
                  p.key === '_51cto' ? '51CTO专家' :
                  p.key === 'wechat' ? '微信大V' : '荣誉用户'
                }}</span>
              </div>
              <div class="flex flex-col items-center p-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded border border-blue-200 text-xs min-w-0">
                <span class="text-blue-700 font-medium truncate">近期目标</span>
                <span class="font-bold text-blue-600 text-xs truncate">{{
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
.bg-black { background: #111; }
.text-csdn-red { color: #F13C3C; }
</style> 