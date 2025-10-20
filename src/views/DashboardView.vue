<script setup lang="ts">
import { useFansStore } from '@/stores/fans'
import { computed } from 'vue'
import { ExternalLink, Users, Eye, FileText, TrendingUp, Sparkles } from 'lucide-vue-next'
import type { CommunityType } from '@/types'

const fansStore = useFansStore()

// 从store获取当前激活的账号
const currentAccount = computed(() => fansStore.currentMatrixAccount)

// 获取当前账号的平台数据
const currentAccountStats = computed(() => {
  const accountId = fansStore.activeMatrixAccount
  return fansStore.getAccountStats(accountId)
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

// 获取平台数据
const getPlatformData = (platform: CommunityType) => {
  const platformStats = currentAccountStats.value.platformStats[platform]
  if (!platformStats) {
    return {
      fans: 0,
      reads: 0,
      articles: 0,
      weeklyGrowth: 0,
      level: '新用户'
    }
  }
  return platformStats
}

// 格式化数字
const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toLocaleString()
}

// 获取增长趋势颜色
const getGrowthColor = (growth: number): string => {
  if (growth > 0) return 'text-emerald-500'
  if (growth < 0) return 'text-red-500'
  return 'text-gray-400'
}

// 过滤有数据的平台
const activePlatforms = computed(() => {
  return Object.entries(platformConfigs).filter(([platform]) => {
    const data = getPlatformData(platform as CommunityType)
    return data.fans > 0 || data.reads > 0 || data.articles > 0
  })
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- 页面标题 -->
    <div class="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-gradient-to-br from-pink-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="text-lg">{{ currentAccount.avatar }}</span>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white">{{ currentAccount.displayName }}</h1>
              <p class="text-pink-200 text-sm">{{ currentAccount.description }}</p>
            </div>
          </div>
          
          <!-- 账号统计概览 -->
          <div class="flex items-center space-x-8">
            <div class="text-center">
              <div class="text-2xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent counter-animation">
                {{ formatNumber(currentAccountStats.totalFans) }}
              </div>
              <div class="text-pink-200 text-xs">粉丝</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent counter-animation">
                {{ formatNumber(currentAccountStats.totalReads) }}
              </div>
              <div class="text-cyan-200 text-xs">阅读</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent counter-animation">
                {{ currentAccountStats.totalArticles }}
              </div>
              <div class="text-emerald-200 text-xs">文章</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="max-w-6xl mx-auto px-6 py-8">
      <!-- 空状态提示 -->
      <div v-if="activePlatforms.length === 0" class="text-center py-16">
        <div class="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-pink-400/30">
          <Sparkles class="w-8 h-8 text-pink-400" />
        </div>
        <h3 class="text-xl font-bold text-white mb-2">暂无平台数据</h3>
        <p class="text-gray-400">该账号暂未在任何平台发布内容</p>
      </div>

      <!-- 平台数据区域 -->
      <div v-else>
        <!-- 平台数据网格 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="([platform, config]) in activePlatforms" 
            :key="platform"
            class="group relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
          >
            <!-- 渐变背景 -->
            <div :class="`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`"></div>
            
            <div class="relative p-6">
              <!-- 平台头部 -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div :class="`w-8 h-8 bg-gradient-to-br ${config.gradient} rounded-lg flex items-center justify-center shadow-lg`">
                    <span class="text-sm">{{ config.icon }}</span>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-white">{{ config.name }}</h3>
                    <p class="text-gray-400 text-xs">{{ getPlatformData(platform as CommunityType).level }}</p>
                  </div>
                </div>
                <a 
                  :href="config.url" 
                  target="_blank" 
                  class="p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  <ExternalLink class="w-4 h-4 text-gray-400" />
                </a>
              </div>

              <!-- 数据展示 -->
              <div class="space-y-4">
                <!-- 粉丝数 -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                      <Users class="w-4 h-4 text-white" />
                    </div>
                    <span class="text-gray-300 text-sm">粉丝</span>
                  </div>
                  <div class="text-right">
                    <div class="text-xl font-bold text-white">
                      {{ formatNumber(getPlatformData(platform as CommunityType).fans) }}
                    </div>
                    <div class="flex items-center space-x-1 text-xs">
                      <span :class="getGrowthColor(getPlatformData(platform as CommunityType).weeklyGrowth)">
                        {{ getPlatformData(platform as CommunityType).weeklyGrowth > 0 ? '+' : '' }}{{ getPlatformData(platform as CommunityType).weeklyGrowth }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- 阅读量 -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Eye class="w-4 h-4 text-white" />
                    </div>
                    <span class="text-gray-300 text-sm">阅读</span>
                  </div>
                  <div class="text-xl font-bold text-white">
                    {{ formatNumber(getPlatformData(platform as CommunityType).reads) }}
                  </div>
                </div>

                <!-- 文章数 -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                      <FileText class="w-4 h-4 text-white" />
                    </div>
                    <span class="text-gray-300 text-sm">文章</span>
                  </div>
                  <div class="text-xl font-bold text-white">
                    {{ getPlatformData(platform as CommunityType).articles }}
                  </div>
                </div>
              </div>

              <!-- 平台链接按钮 -->
              <div class="mt-6 pt-4 border-t border-white/10">
                <a 
                  :href="config.url" 
                  target="_blank"
                  :class="`w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r ${config.gradient} hover:shadow-lg rounded-xl transition-all duration-300 text-white font-medium text-sm transform hover:scale-105`"
                >
                  <span>访问{{ config.name }}</span>
                  <ExternalLink class="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 数据统计区域 -->
        <div v-if="activePlatforms.length > 0" class="mt-12">
          <!-- 数据统计卡片 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- 总粉丝数 -->
            <div class="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-3xl font-bold mb-1">{{ formatNumber(currentAccountStats.totalFans) }}</div>
                  <div class="text-pink-100 text-sm">总粉丝数</div>
                </div>
                <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Users class="w-5 h-5" />
                </div>
              </div>
            </div>

            <!-- 总阅读量 -->
            <div class="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-3xl font-bold mb-1">{{ formatNumber(currentAccountStats.totalReads) }}</div>
                  <div class="text-cyan-100 text-sm">总阅读量</div>
                </div>
                <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Eye class="w-5 h-5" />
                </div>
              </div>
            </div>

            <!-- 总文章数 -->
            <div class="bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-3xl font-bold mb-1">{{ currentAccountStats.totalArticles }}</div>
                  <div class="text-emerald-100 text-sm">总文章数</div>
                </div>
                <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <FileText class="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <!-- 增长趋势 -->
          <div class="mt-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6">
            <h3 class="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <TrendingUp class="w-5 h-5 text-emerald-400" />
              <span>增长趋势</span>
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-400/20">
                <div>
                  <div class="text-sm text-gray-300 mb-1">周增长</div>
                  <div class="text-2xl font-bold text-emerald-400">+{{ currentAccountStats.weeklyGrowth }}</div>
                </div>
                <div class="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <span class="text-emerald-400 text-sm">📈</span>
                </div>
              </div>
              <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-400/20">
                <div>
                  <div class="text-sm text-gray-300 mb-1">月增长</div>
                  <div class="text-2xl font-bold text-blue-400">+{{ currentAccountStats.monthlyGrowth }}</div>
                </div>
                <div class="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span class="text-blue-400 text-sm">📊</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 多巴胺动画效果 */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3); }
  50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.6); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes countUp {
  0% { 
    transform: scale(0.8);
    opacity: 0;
  }
  50% { 
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% { 
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes numberGlow {
  0%, 100% { 
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
  50% { 
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.3);
  }
}

.float-animation {
  animation: float 3s ease-in-out infinite;
}

.glow-animation {
  animation: glow 2s ease-in-out infinite alternate;
}

.pulse-animation {
  animation: pulse 2s ease-in-out infinite;
}

.counter-animation {
  animation: countUp 1.5s ease-out, numberGlow 2s ease-in-out infinite;
}

/* 渐变文字动画 */
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ec4899, #8b5cf6);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #be185d, #7c3aed);
}
</style>