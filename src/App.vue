<script setup lang="ts">
import { useFansStore } from '@/stores/fans'
import { computed, ref, watch, onMounted } from 'vue'
import { Users, Eye, Sparkles, Zap } from 'lucide-vue-next'

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
const animatedFansDisplay = computed(() => formatNumber(animatedFans.value))
const animatedReadsDisplay = computed(() => formatNumber(animatedReads.value))

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

onMounted(() => {
  animateTo(globalStats.value.totalFans, animatedFans)
  animateTo(globalStats.value.totalReads, animatedReads)
})

watch(globalStats, (val) => {
  animateTo(val.totalFans, animatedFans)
  animateTo(val.totalReads, animatedReads)
})
</script>

<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
    <!-- 主内容区域 -->
    <div class="min-h-screen">
        <!-- 极简Banner区域 -->
        <div class="relative overflow-hidden">
          <div class="relative z-10 max-w-6xl mx-auto px-6 py-8">
            <!-- 主标题 -->
            <div class="text-center space-y-3 mb-8">
              <h1 class="text-4xl font-bold text-gray-800">
                TUARAN 粉丝追踪器
              </h1>
              <p class="text-lg text-gray-600">多账号矩阵数据管理中心</p>
            </div>
            
            <!-- 主要统计卡片 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- 全网粉丝量 -->
              <div class="bg-white rounded-2xl p-8 border border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-4xl font-bold text-amber-600 mb-2">
                      {{ animatedFansDisplay }}
                    </div>
                    <div class="text-gray-600 text-lg font-medium">全网粉丝量</div>
                  </div>
                  <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users class="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              <!-- 全网阅读量 -->
              <div class="bg-white rounded-2xl p-8 border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-4xl font-bold text-orange-600 mb-2">
                      {{ animatedReadsDisplay }}
                    </div>
                    <div class="text-gray-600 text-lg font-medium">全网阅读量</div>
                  </div>
                  <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Eye class="w-8 h-8 text-white" />
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
</style>