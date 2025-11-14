<script setup lang="ts">
import { useFansStore } from '@/stores/fans'
import { computed, ref, onMounted, watch } from 'vue'
import { ExternalLink, Users, Eye, FileText, TrendingUp, Sparkles, Star, Heart } from 'lucide-vue-next'
import type { CommunityType } from '@/types'

// 获取平台URL
const getPlatformUrl = (account: any, platform: CommunityType): string | undefined => {
  return account.stats?.platformStats?.[platform]?.url
}

// 获取平台颜色样式
const getPlatformColors = (platform: CommunityType) => {
  const colorMap: Record<CommunityType, { bg: string; hoverBg: string; border: string; hoverBorder: string; dot: string; text: string; icon: string }> = {
    csdn: {
      bg: 'bg-red-50',
      hoverBg: 'hover:bg-red-100',
      border: 'border-red-200',
      hoverBorder: 'hover:border-red-300',
      dot: 'bg-red-500',
      text: 'text-gray-700',
      icon: 'text-red-600'
    },
    juejin: {
      bg: 'bg-blue-50',
      hoverBg: 'hover:bg-blue-100',
      border: 'border-blue-200',
      hoverBorder: 'hover:border-blue-300',
      dot: 'bg-blue-500',
      text: 'text-gray-700',
      icon: 'text-blue-600'
    },
    toutiao: {
      bg: 'bg-orange-50',
      hoverBg: 'hover:bg-orange-100',
      border: 'border-orange-200',
      hoverBorder: 'hover:border-orange-300',
      dot: 'bg-orange-500',
      text: 'text-gray-700',
      icon: 'text-orange-600'
    },
    zhihu: {
      bg: 'bg-cyan-50',
      hoverBg: 'hover:bg-cyan-100',
      border: 'border-cyan-200',
      hoverBorder: 'hover:border-cyan-300',
      dot: 'bg-cyan-500',
      text: 'text-gray-700',
      icon: 'text-cyan-600'
    },
    _51cto: {
      bg: 'bg-green-50',
      hoverBg: 'hover:bg-green-100',
      border: 'border-green-200',
      hoverBorder: 'hover:border-green-300',
      dot: 'bg-green-500',
      text: 'text-gray-700',
      icon: 'text-green-600'
    },
    wechat: {
      bg: 'bg-emerald-50',
      hoverBg: 'hover:bg-emerald-100',
      border: 'border-emerald-200',
      hoverBorder: 'hover:border-emerald-300',
      dot: 'bg-emerald-500',
      text: 'text-gray-700',
      icon: 'text-emerald-600'
    },
    weibo: {
      bg: 'bg-rose-50',
      hoverBg: 'hover:bg-rose-100',
      border: 'border-rose-200',
      hoverBorder: 'hover:border-rose-300',
      dot: 'bg-rose-500',
      text: 'text-gray-700',
      icon: 'text-rose-600'
    },
    infoq: {
      bg: 'bg-purple-50',
      hoverBg: 'hover:bg-purple-100',
      border: 'border-purple-200',
      hoverBorder: 'hover:border-purple-300',
      dot: 'bg-purple-500',
      text: 'text-gray-700',
      icon: 'text-purple-600'
    },
    xiaohongshu: {
      bg: 'bg-pink-50',
      hoverBg: 'hover:bg-pink-100',
      border: 'border-pink-200',
      hoverBorder: 'hover:border-pink-300',
      dot: 'bg-pink-500',
      text: 'text-gray-700',
      icon: 'text-pink-600'
    }
  }
  return colorMap[platform] || colorMap.csdn
}

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
    name: '公众号', 
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

// 获取文章/帖子显示文本
const getArticleLabel = (platforms: CommunityType[]): string => {
  return platforms.includes('xiaohongshu') ? '帖子' : '文章'
}
</script>

<template>
  <div class="h-screen bg-white flex flex-col">
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
              <div class="flex items-center space-x-3 mb-2 flex-wrap">
                <h3 class="text-base font-semibold text-gray-800">{{ account.displayName }}</h3>
                <span class="text-gray-500 text-sm">{{ account.description }}</span>
                <span class="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                  {{ account.status === 'active' ? '活跃' : '暂停' }}
                </span>
                <span v-if="account.isMain" class="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                  主账号
                </span>
              </div>
              
              <!-- 平台标签 -->
              <div class="flex flex-wrap gap-3">
                <template v-for="platform in account.platforms" :key="platform">
                  <a
                    v-if="getPlatformUrl(account, platform)"
                    :href="getPlatformUrl(account, platform)"
                    target="_blank"
                    rel="noopener noreferrer"
                    :class="[
                      'flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium transition-all cursor-pointer hover:shadow-md',
                      getPlatformColors(platform).bg,
                      getPlatformColors(platform).hoverBg,
                      getPlatformColors(platform).border,
                      getPlatformColors(platform).hoverBorder
                    ]"
                  >
                    <div :class="['w-2.5 h-2.5 rounded-full', getPlatformColors(platform).dot]"></div>
                    <span :class="getPlatformColors(platform).text">{{ platformConfigs[platform]?.name || platform }}</span>
                    <ExternalLink :class="['w-4 h-4 ml-0.5', getPlatformColors(platform).icon]" />
                  </a>
                  <div
                    v-else
                    class="flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium cursor-default"
                  >
                    <div class="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
                    <span class="text-gray-600">{{ platformConfigs[platform]?.name || platform }}</span>
                  </div>
                </template>
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

              <!-- 文章数/帖子数 -->
              <div class="text-center">
                <div class="text-xl font-bold text-amber-700">
                  {{ account.stats.totalArticles }}{{ account.platforms.includes('xiaohongshu') ? '+' : '' }}
                </div>
                <div class="text-gray-500 text-xs">{{ getArticleLabel(account.platforms) }}</div>
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