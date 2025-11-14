<script setup lang="ts">
import { useFansStore } from '@/stores/fans'
import { computed, ref, watch, onMounted } from 'vue'
import { Users, Eye, Sparkles, Zap, FileText } from 'lucide-vue-next'

const fansStore = useFansStore()

// 从store获取数据
const activeAccount = computed(() => fansStore.currentSelectedAccount)
const globalStats = computed(() => fansStore.globalStats)

// 获取各账号统计数据
const anthonyStats = computed(() => fansStore.getAccountStats('anthony'))
const anthony404Stats = computed(() => fansStore.getAccountStats('anthony404'))
const frontendWeeklyStats = computed(() => fansStore.getAccountStats('frontend-weekly'))
const aifsStats = computed(() => fansStore.getAccountStats('code-ai-frosen'))
const thirtyStats = computed(() => fansStore.getAccountStats('thirty-cube'))

// 账号切换方法
const switchAccount = (accountName: string) => {
  fansStore.switchSelectedAccount(accountName)
}

// 格式化数字
const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toLocaleString()
}

// 数字从0到目标值的动画
const animatedFans = ref(0)
const animatedReads = ref(0)
const animatedLikes = ref(0)
const animatedArticles = ref(0)
const animatedFansDisplay = computed(() => formatNumber(animatedFans.value))
const animatedReadsDisplay = computed(() => formatNumber(animatedReads.value))
const animatedLikesDisplay = computed(() => formatNumber(animatedLikes.value))
const animatedArticlesDisplay = computed(() => animatedArticles.value)

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

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

// 省略号动画
const dotsCount = ref(1)
const dotsDirection = ref(1) // 1: 增加, -1: 减少

onMounted(() => {
  animateTo(globalStats.value.totalFans, animatedFans)
  animateTo(globalStats.value.totalReads, animatedReads)
  animateTo(globalStats.value.totalLikes, animatedLikes)
  animateTo(globalStats.value.totalArticles, animatedArticles)
  
  // 省略号动画
  setInterval(() => {
    dotsCount.value += dotsDirection.value
    if (dotsCount.value >= 6) {
      dotsDirection.value = -1
    } else if (dotsCount.value <= 1) {
      dotsDirection.value = 1
    }
  }, 200) // 每200ms更新一次
})

watch(globalStats, (val) => {
  animateTo(val.totalFans, animatedFans)
  animateTo(val.totalReads, animatedReads)
  animateTo(val.totalLikes, animatedLikes)
  animateTo(val.totalArticles, animatedArticles)
})

const dotsDisplay = computed(() => '.'.repeat(dotsCount.value))
</script>

<template>
  <div id="app" class="min-h-screen bg-white">
    <!-- 主内容区域 -->
    <div class="min-h-screen">
        <!-- 极简Banner区域 -->
        <div class="relative overflow-hidden">
          <div class="relative z-10 max-w-6xl mx-auto px-6 py-8">
            <!-- 标题和介绍 -->
            <div class="text-center mb-8">
              <h1 class="text-4xl font-bold text-gray-800 mb-3">
                个人矩阵号
              </h1>
              <p class="text-lg text-gray-600 mb-2">
                多平台内容创作者数据追踪与展示平台，实时监控矩阵账号运营数据
              </p>
              <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span>数据更新时间：2025年11月14日</span>
                <span class="flex items-center space-x-2">
                  <span class="relative flex items-center">
                    <span class="absolute w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                    <span class="relative w-2 h-2 bg-amber-500 rounded-full animate-data-capturing"></span>
                  </span>
                  <span class="animate-text-glow font-medium">
                    <span class="inline-block">数据持续捕获中</span><span class="inline-block w-8 text-left">{{ dotsDisplay }}</span>
                  </span>
                </span>
              </div>
            </div>
            
            <!-- 主要统计卡片 -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
              <!-- 矩阵账号 -->
              <div class="bg-white rounded-xl p-6 border border-orange-200 shadow-md hover:shadow-lg transition-all duration-300">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                    <Users class="w-6 h-6 text-white" />
                  </div>
                  <div class="flex-1">
                    <div class="text-3xl font-bold text-orange-700 mb-1">
                      {{ globalStats.totalAccounts }}
                    </div>
                    <div class="text-gray-600 text-sm font-medium">矩阵账号</div>
                  </div>
                </div>
              </div>

              <!-- 全网粉丝量 -->
              <div class="bg-white rounded-xl p-6 border border-amber-200 shadow-md hover:shadow-lg transition-all duration-300">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                    <Users class="w-6 h-6 text-white" />
                  </div>
                  <div class="flex-1">
                    <div class="text-3xl font-bold text-amber-600 mb-1">
                      {{ animatedFansDisplay }}
                    </div>
                    <div class="text-gray-600 text-sm font-medium">全网粉丝量</div>
                  </div>
                </div>
              </div>

              <!-- 全网文章数 -->
              <div class="bg-white rounded-xl p-6 border border-emerald-200 shadow-md hover:shadow-lg transition-all duration-300">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                    <FileText class="w-6 h-6 text-white" />
                  </div>
                  <div class="flex-1">
                    <div class="text-3xl font-bold text-emerald-600 mb-1">
                      {{ animatedArticlesDisplay }}
                    </div>
                    <div class="text-gray-600 text-sm font-medium">全网文章数</div>
                  </div>
                </div>
              </div>

              <!-- 全网阅读量 -->
              <div class="bg-white rounded-xl p-6 border border-orange-200 shadow-md hover:shadow-lg transition-all duration-300">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                    <Eye class="w-6 h-6 text-white" />
                  </div>
                  <div class="flex-1">
                    <div class="text-3xl font-bold text-orange-600 mb-1">
                      {{ animatedReadsDisplay }}
                    </div>
                    <div class="text-gray-600 text-sm font-medium">全网阅读量</div>
                  </div>
                </div>
              </div>

              <!-- 全网点赞量 -->
              <div class="bg-white rounded-xl p-6 border border-yellow-200 shadow-md hover:shadow-lg transition-all duration-300">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                    <Sparkles class="w-6 h-6 text-white" />
                  </div>
                  <div class="flex-1">
                    <div class="text-3xl font-bold text-yellow-600 mb-1">
                      {{ animatedLikesDisplay }}
                    </div>
                    <div class="text-gray-600 text-sm font-medium">全网点赞量</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 路由视图 -->
        <router-view />
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

/* 数据捕获中动画 */
@keyframes dataCapturing {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

@keyframes textGlow {
  0%, 100% {
    color: #6b7280;
  }
  50% {
    color: #f59e0b;
  }
}

.animate-data-capturing {
  animation: dataCapturing 2s ease-in-out infinite;
}

.animate-text-glow {
  animation: textGlow 2s ease-in-out infinite;
}
</style>