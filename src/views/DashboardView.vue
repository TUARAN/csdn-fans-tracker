<script setup lang="ts">
import { useFansStore } from '@/stores/fans'
import { computed, ref, onMounted, watch } from 'vue'
import { ExternalLink, Users, Eye, FileText, TrendingUp, Sparkles, Star, Heart } from 'lucide-vue-next'
import type { CommunityType } from '@/types'

const fansStore = useFansStore()

// 动画效果
const animatedGlobalFans = ref(0)
const animatedGlobalReads = ref(0)
const animatedGlobalLikes = ref(0)
const animatedGlobalArticles = ref(0)
const animatedGlobalAccounts = ref(0)

// 缓动函数
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

// 动画函数
function animateTo(target: number, outRef: { value: number }, duration = 1200) {
  const start = 0
  const startTime = performance.now()
  function tick(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(1, elapsed / duration)
    const eased = easeOutCubic(progress)
    outRef.value = Math.round(start + (target - start) * eased)
    if (progress < 1) requestAnimationFrame(tick)
  }
  outRef.value = 0
  requestAnimationFrame(tick)
}

// 获取所有账号数据并按粉丝数排序
const allAccountsData = computed(() => {
  const accounts = fansStore.matrixAccounts.map(account => {
    const stats = fansStore.getAccountStats(account.id)
    return {
      ...account,
      stats
    }
  })
  
  // 按粉丝数量降序排序
  return accounts.sort((a, b) => b.stats.totalFans - a.stats.totalFans)
})

// 平台配置信息
const platformConfigs: Record<CommunityType, { name: string; icon: string; color: string; url: string; gradient: string }> = {
  csdn: { 
    name: 'CSDN', 
    icon: '📝', 
    color: 'red', 
    url: 'https://blog.csdn.net',
    gradient: 'from-red-500 to-pink-500'
  },
  juejin: { 
    name: '掘金', 
    icon: '⛏️', 
    color: 'blue', 
    url: 'https://juejin.cn',
    gradient: 'from-blue-500 to-cyan-500'
  },
  toutiao: { 
    name: '头条', 
    icon: '📰', 
    color: 'orange', 
    url: 'https://www.toutiao.com',
    gradient: 'from-orange-500 to-yellow-500'
  },
  zhihu: { 
    name: '知乎', 
    icon: '🧠', 
    color: 'cyan', 
    url: 'https://www.zhihu.com',
    gradient: 'from-cyan-500 to-blue-500'
  },
  _51cto: { 
    name: '51CTO', 
    icon: '💻', 
    color: 'green', 
    url: 'https://www.51cto.com',
    gradient: 'from-green-500 to-emerald-500'
  },
  wechat: { 
    name: '微信', 
    icon: '💬', 
    color: 'green', 
    url: 'https://mp.weixin.qq.com',
    gradient: 'from-green-500 to-teal-500'
  },
  weibo: { 
    name: '微博', 
    icon: '🐦', 
    color: 'red', 
    url: 'https://weibo.com',
    gradient: 'from-red-500 to-rose-500'
  },
  infoq: { 
    name: 'InfoQ', 
    icon: 'ℹ️', 
    color: 'purple', 
    url: 'https://www.infoq.cn',
    gradient: 'from-purple-500 to-violet-500'
  },
  xiaohongshu: { 
    name: '小红书', 
    icon: '📖', 
    color: 'pink', 
    url: 'https://www.xiaohongshu.com',
    gradient: 'from-pink-500 to-rose-500'
  }
}


// 格式化数字
const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toLocaleString()
}

// 生命周期钩子
onMounted(() => {
  animateTo(fansStore.globalStats.totalFans, animatedGlobalFans)
  animateTo(fansStore.globalStats.totalReads, animatedGlobalReads)
  animateTo(fansStore.globalStats.totalLikes, animatedGlobalLikes)
  animateTo(fansStore.globalStats.totalArticles, animatedGlobalArticles)
  animateTo(fansStore.globalStats.totalAccounts, animatedGlobalAccounts)
})

// 监听全局统计数据变化
watch(() => fansStore.globalStats, (val) => {
  animateTo(val.totalFans, animatedGlobalFans)
  animateTo(val.totalReads, animatedGlobalReads)
  animateTo(val.totalLikes, animatedGlobalLikes)
  animateTo(val.totalArticles, animatedGlobalArticles)
  animateTo(val.totalAccounts, animatedGlobalAccounts)
})

// 获取增长趋势颜色
const getGrowthColor = (growth: number): string => {
  if (growth > 0) return 'text-emerald-500'
  if (growth < 0) return 'text-red-500'
  return 'text-gray-400'
}
</script>

<template>
  <div class="h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col">
    <!-- 页面标题 -->
    <div class="bg-white/80 backdrop-blur-sm border-b border-amber-200 flex-shrink-0">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Star class="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-800">矩阵IP数据总览</h1>
              <p class="text-gray-600 text-sm">所有账号数据一览，按粉丝数量排序</p>
            </div>
          </div>
          
          <!-- 矩阵IP全览信息 -->
          <div class="flex items-center space-x-6">
            <div class="text-center">
              <div class="text-xl font-bold text-amber-600">
                {{ formatNumber(animatedGlobalFans) }}
              </div>
              <div class="text-gray-600 text-xs">全网粉丝</div>
            </div>
            <div class="text-center">
              <div class="text-xl font-bold text-orange-600">
                {{ formatNumber(animatedGlobalReads) }}
              </div>
              <div class="text-gray-600 text-xs">全网阅读</div>
            </div>
            <div class="text-center">
              <div class="text-xl font-bold text-yellow-600">
                {{ formatNumber(animatedGlobalLikes) }}
              </div>
              <div class="text-gray-600 text-xs">全网点赞</div>
            </div>
            <div class="text-center">
              <div class="text-xl font-bold text-amber-700">
                {{ animatedGlobalArticles }}
              </div>
              <div class="text-gray-600 text-xs">全网文章</div>
            </div>
            <div class="text-center">
              <div class="text-xl font-bold text-orange-700">
                {{ animatedGlobalAccounts }}
              </div>
              <div class="text-gray-600 text-xs">矩阵账号</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="flex-1 max-w-7xl mx-auto px-6 py-6 w-full">
      <!-- 账号数据列表 -->
      <div class="space-y-3 h-full overflow-y-auto">
        <div 
          v-for="(account, index) in allAccountsData" 
          :key="account.id"
          class="bg-white rounded-lg border border-amber-200 hover:shadow-md transition-all duration-200"
        >
          <div class="flex items-center p-4">
            <!-- 排名 -->
            <div class="flex-shrink-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mr-4">
              <span class="text-white font-bold text-xs">{{ index + 1 }}</span>
            </div>

            <!-- 账号信息 -->
            <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mr-4">
              <span class="text-sm">{{ account.avatar }}</span>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center space-x-3 mb-1">
                <h3 class="text-base font-semibold text-gray-800">{{ account.displayName }}</h3>
                <span class="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                  {{ account.status === 'active' ? '活跃' : '暂停' }}
                </span>
                <span v-if="account.isMain" class="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                  主账号
                </span>
              </div>
              <p class="text-gray-600 text-sm mb-2">{{ account.description }}</p>
              
              <!-- 平台标签 -->
              <div class="flex flex-wrap gap-2">
                <div 
                  v-for="platform in account.platforms" 
                  :key="platform"
                  class="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded text-xs"
                >
                  <div class="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span class="text-gray-600 text-xs">{{ platformConfigs[platform]?.name || platform }}</span>
                </div>
              </div>
            </div>

            <!-- 数据统计 -->
            <div class="flex-shrink-0 flex items-center space-x-6 ml-6">
              <!-- 粉丝数 -->
              <div class="text-center">
                <div class="text-xl font-bold text-amber-600">
                  {{ formatNumber(account.stats.totalFans) }}
                </div>
                <div class="text-gray-500 text-xs">粉丝</div>
              </div>

              <!-- 阅读量 -->
              <div class="text-center">
                <div class="text-xl font-bold text-orange-600">
                  {{ formatNumber(account.stats.totalReads) }}
                </div>
                <div class="text-gray-500 text-xs">阅读</div>
              </div>

              <!-- 点赞量 -->
              <div class="text-center">
                <div class="text-xl font-bold text-yellow-600">
                  {{ formatNumber(account.stats.totalLikes) }}
                </div>
                <div class="text-gray-500 text-xs">点赞</div>
              </div>

              <!-- 文章数 -->
              <div class="text-center">
                <div class="text-xl font-bold text-amber-700">
                  {{ account.stats.totalArticles }}
                </div>
                <div class="text-gray-500 text-xs">文章</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 极简滚动条 */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: #f59e0b;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d97706;
}
</style>