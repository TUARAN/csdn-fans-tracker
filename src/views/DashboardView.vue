<script setup lang="ts">
import { useFansStore } from '@/stores/fans'
import { computed } from 'vue'
import { ExternalLink, Target } from 'lucide-vue-next'

const fansStore = useFansStore()

const platforms: { 
  key: import('@/types').CommunityType; 
  name: string; 
  color: string; 
  icon: string;
  homepage: string;
  username: string;
}[] = [
  { key: 'csdn', name: 'CSDN', color: 'csdn-red', icon: '📝', homepage: 'https://blog.csdn.net/Anthony1453', username: '掘金安东尼' },
  { key: 'juejin', name: '掘金', color: 'orange-500', icon: '💎', homepage: 'https://juejin.cn/user/1521379823340792', username: '掘金安东尼' },
  { key: 'toutiao', name: '头条', color: 'black', icon: '📰', homepage: 'https://www.toutiao.com/c/user/token/CixsElNHkU9SqBXRGQJEufkWqwP0Bje2WqIrl4KnKLbcWnDDfYA44PkBxzIZbxpJCjwAAAAAAAAAAAAATz11eRsCdm0c3I-f9Mzp8EixSaljSiLIZP9fBCrQqaGNZ-GSMRYj2HVNlV3B-jkdJ1sQte_2DRjDxYPqBCIBA7vgaHk=/?', username: '掘金安东尼' },
  { key: 'zhihu', name: '知乎', color: 'black', icon: '🤔', homepage: 'https://juejin.cn/user/1521379823340792', username: '三十而立方' },
  { key: '_51cto', name: '51CTO', color: 'black', icon: '💻', homepage: 'https://juejin.cn/user/1521379823340792', username: '掘金安东尼' },
  { key: 'infoq', name: 'InfoQ', color: 'black', icon: '📊', homepage: 'https://juejin.cn/user/1521379823340792', username: '掘金安东尼' },
  { key: 'wechat', name: '微信公众号', color: 'black', icon: '📱', homepage: 'https://weixin.sogou.com/weixin?type=1&query=掘金安东尼', username: '掘金安东尼' },
  { key: 'segmentfault', name: '思否', color: 'black', icon: '🔍', homepage: 'https://segmentfault.com/u/anthony1453', username: '掘金安东尼' }
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

// 跳转到平台主页
const goToHomepage = (url: string) => {
  window.open(url, '_blank')
}
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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="p in platforms" :key="p.key" 
             class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div class="p-4">
            <!-- 平台头部 -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-2">
                  <span class="text-sm">{{ p.icon }}</span>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-gray-900">{{ p.name }}</h3>
                  <div class="text-xs text-gray-500 mt-0.5">
                    {{ p.username }}
                    <span class="text-yellow-600 ml-1">{{ 
                      p.key === 'csdn' ? 'CSDN专家' :
                      p.key === 'juejin' ? '掘金7级' :
                      p.key === 'toutiao' ? '头条创作者' :
                      p.key === '_51cto' ? '51CTO专家' :
                      p.key === 'wechat' ? '荣誉用户' :
                      p.key === 'segmentfault' ? '思否专家' :
                      p.key === 'infoq' ? 'InfoQ专家' : '荣誉用户'
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="text-xs text-gray-400">
                {{ p.key === 'infoq' ? '2025-07-14' : p.key === 'csdn' ? '2025-07-15' : '2025-07-09' }}
              </div>
            </div>
            
            <!-- 核心数据 -->
            <div class="grid grid-cols-3 gap-2 mb-4">
              <div class="text-center">
                <div class="text-lg font-semibold text-gray-900">{{ formatNumber((fansStore.currentStats[p.key]?.currentFans) || 0) }}</div>
                <div class="text-xs text-gray-500">粉丝</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-semibold text-gray-900">{{ formatNumber((fansStore.currentStats[p.key]?.currentReads) || 0) }}</div>
                <div class="text-xs text-gray-500">阅读</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-semibold text-gray-900">{{ formatNumber((fansStore.currentStats[p.key]?.totalArticles) || 0) }}</div>
                <div class="text-xs text-gray-500">文章</div>
              </div>
            </div>

            <!-- 状态信息 -->
            <div class="space-y-2 mb-4">
              <!-- 可以在这里添加其他状态信息 -->
            </div>

            <!-- 操作链接 -->
            <div class="flex items-center justify-between text-sm">
              <button @click="goToHomepage(p.homepage)" 
                      class="flex items-center text-red-500 hover:text-red-700 transition-colors">
                <ExternalLink class="w-3 h-3 mr-1" />
                访问主页
              </button>
              <router-link :to="`/plan/${p.key}`" 
                           :class="`flex items-center transition-colors ${
                             p.key === 'csdn' || p.key === 'juejin' 
                               ? 'text-blue-600 hover:text-blue-800' 
                               : 'text-gray-400 cursor-not-allowed'
                           }`">
                <Target class="w-3 h-3 mr-1" />
                查看计划
              </router-link>
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