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
  <div id="app" class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- 主要内容布局 -->
    <div class="flex">
      <!-- 左侧：矩阵IP侧边栏 -->
      <aside class="hidden lg:block w-64 border-r border-white/10 bg-black/20 backdrop-blur-xl flex-shrink-0">
        <div class="h-screen flex flex-col p-4 space-y-4">
          <div class="text-center py-2">
            <span class="text-lg font-bold text-white">矩阵IP</span>
          </div>
          <div class="flex-1 overflow-y-auto space-y-3 pr-1">
            <button 
              @click="switchAccount('掘金安东尼')"
              class="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300"
              :class="activeAccount === '掘金安东尼' 
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-2xl' 
                : 'bg-white/10 hover:bg-white/20 text-gray-300 border border-white/20 shadow-lg'"
            >
              <div class="text-left">
                <div class="font-bold text-sm">掘金安东尼</div>
                <div class="text-xs opacity-75">{{ formatNumber(anthonyStats.totalFans) }}粉丝</div>
              </div>
            </button>
            <button 
              @click="switchAccount('安东尼404')"
              class="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300"
              :class="activeAccount === '安东尼404' 
                ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-2xl' 
                : 'bg-white/10 hover:bg-white/20 text-gray-300 border border-white/20 shadow-lg'"
            >
              <div class="text-left">
                <div class="font-bold text-sm">安东尼404</div>
                <div class="text-xs opacity-75">{{ formatNumber(anthony404Stats.totalFans) }}粉丝</div>
              </div>
            </button>
            <button 
              @click="switchAccount('前端周看')"
              class="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300"
              :class="activeAccount === '前端周看' 
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-2xl' 
                : 'bg-white/10 hover:bg-white/20 text-gray-300 border border-white/20 shadow-lg'"
            >
              <div class="text-left">
                <div class="font-bold text-sm">前端周看</div>
                <div class="text-xs opacity-75">{{ formatNumber(frontendWeeklyStats.totalFans) }}粉丝</div>
              </div>
            </button>
            <button 
              @click="switchAccount('代码AI弗森')"
              class="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300"
              :class="activeAccount === '代码AI弗森' 
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-2xl' 
                : 'bg-white/10 hover:bg-white/20 text-gray-300 border border-white/20 shadow-lg'"
            >
              <div class="text-left">
                <div class="font-bold text-sm">代码AI弗森</div>
                <div class="text-xs opacity-75">{{ formatNumber(aifsStats.totalFans) }}粉丝</div>
              </div>
            </button>
            <button 
              @click="switchAccount('三十而立方')"
              class="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300"
              :class="activeAccount === '三十而立方' 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-2xl' 
                : 'bg-white/10 hover:bg-white/20 text-gray-300 border border-white/20 shadow-lg'"
            >
              <div class="text-left">
                <div class="font-bold text-sm">三十而立方</div>
                <div class="text-xs opacity-75">{{ formatNumber(thirtyStats.totalFans) }}粉丝</div>
              </div>
            </button>
          </div>
        </div>
      </aside>

      <!-- 右侧：主内容区域 -->
      <div class="flex-1 min-h-screen">
        <!-- 多巴胺风格Banner区域 -->
        <div class="relative overflow-hidden">
          <!-- 动态背景装饰 -->
          <div class="absolute inset-0">
            <!-- 浮动几何图形 -->
            <div class="absolute top-8 right-16 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div class="absolute top-16 right-32 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" style="animation-delay: 1s"></div>
            <div class="absolute top-4 left-16 w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full blur-2xl animate-pulse" style="animation-delay: 2s"></div>
            
            <!-- 网格图案 -->
            <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(circle at 2px 2px, rgba(236, 72, 153, 0.3) 1px, transparent 0); background-size: 24px 24px;"></div>
          </div>
          
          <div class="relative z-10 max-w-6xl mx-auto px-6 py-8">
            <!-- 主标题 -->
            <div class="text-center space-y-3 mb-8">
              <h1 class="text-4xl font-bold bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                TUARAN 粉丝追踪器
              </h1>
              <p class="text-lg text-gray-300">多账号矩阵数据管理中心</p>
            </div>
            
            <!-- 主要统计卡片 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- 全网粉丝量 -->
              <div class="relative group">
                <div class="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <div class="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-pink-400/30 shadow-2xl">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-4xl font-bold text-white mb-2 counter-animation">
                        {{ animatedFansDisplay }}
                      </div>
                      <div class="text-pink-200 text-lg font-medium">全网粉丝量</div>
                    </div>
                    <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <Users class="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- 全网阅读量 -->
              <div class="relative group">
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <div class="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-cyan-400/30 shadow-2xl">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-4xl font-bold text-white mb-2 counter-animation">
                        {{ animatedReadsDisplay }}
                      </div>
                      <div class="text-cyan-200 text-lg font-medium">全网阅读量</div>
                    </div>
                    <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <Eye class="w-8 h-8 text-white" />
                    </div>
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
  </div>
</template>

<style scoped>
/* 多巴胺动画效果 */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.4); }
  50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.8); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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
  animation: float 4s ease-in-out infinite;
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

/* 按钮悬停效果 */
button:hover {
  transform: translateY(-2px);
}

/* 卡片悬停效果 */
.group:hover {
  box-shadow: 0 25px 50px -12px rgba(236, 72, 153, 0.25);
}
</style>