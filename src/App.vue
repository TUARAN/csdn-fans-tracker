<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import { useFansStore } from '@/stores/fans'

import { 
  BarChart3, 
  FileText, 
  Calendar, 
  TrendingUp,
  User,
  Target
} from 'lucide-vue-next'

const route = useRoute()
const fansStore = useFansStore()

const currentRoute = computed(() => route.path)

// 自动计算全网总粉丝数（所有矩阵账号的总和）
const totalFans = computed(() => {
  return anthonyTotalFans.value + aifsTotalFans.value
})

// 动画粉丝数
const animatedFans = ref(0)

// 数字动画函数
const animateNumber = (start: number, end: number, duration: number = 2000) => {
  const startTime = Date.now()
  const range = end - start
  
  const updateNumber = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 使用缓动函数让动画更自然
    const easeOutCubic = 1 - Math.pow(1 - progress, 3)
    const currentValue = Math.floor(start + range * easeOutCubic)
    
    animatedFans.value = currentValue
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber)
    } else {
      animatedFans.value = end
    }
  }
  
  requestAnimationFrame(updateNumber)
}

// 账号选择状态
const activeAccount = computed(() => fansStore.currentSelectedAccount)


// 掘金安东尼账号数据（源数据）
const anthonyAccountData = {
  csdn: { currentFans: 535 },
  juejin: { currentFans: 10871 },
  zhihu: { currentFans: 318 },
  toutiao: { currentFans: 692 },
  xiaohongshu: { currentFans: 2400 },
  infoq: { currentFans: 12 },
  wechat: { currentFans: 1200 },
  weibo: { currentFans: 400 }
}

// 代码AI弗森账号数据（源数据）
const aifsAccountData = {
  csdn: { currentFans: 638 },
  _51cto: { currentFans: 20 },
  wechat: { currentFans: 3500 }
}

// 自动计算各账号的总粉丝数
const anthonyTotalFans = computed(() => {
  return Object.values(anthonyAccountData).reduce((total, platform) => total + platform.currentFans, 0)
})

const aifsTotalFans = computed(() => {
  return Object.values(aifsAccountData).reduce((total, platform) => total + platform.currentFans, 0)
})

// 切换账号
const switchAccount = (account: string) => {
  fansStore.switchSelectedAccount(account)
}

// 组件挂载后开始动画
onMounted(() => {
  // 延迟一点开始动画，让页面先渲染
  setTimeout(() => {
    animateNumber(0, totalFans.value, 2500)
  }, 500)
})

</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <!-- 优化的Banner区域 -->
    <div class="relative bg-gradient-to-br from-orange-50 via-yellow-50/50 to-amber-100/30 overflow-hidden">
      <!-- 现代化背景装饰 -->
      <div class="absolute inset-0">
        <!-- 浮动几何图形 -->
        <div class="absolute top-10 right-20 w-32 h-32 bg-orange-200/30 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute top-20 right-40 w-20 h-20 bg-yellow-200/30 rounded-full blur-lg animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute top-5 left-20 w-24 h-24 bg-amber-300/30 rounded-full blur-xl animate-pulse" style="animation-delay: 2s"></div>
        
        <!-- 网格图案 -->
        <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 2px 2px, rgba(251, 146, 60, 0.15) 1px, transparent 0); background-size: 24px 24px;"></div>
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- 右上角联系信息 -->
        <div class="absolute top-4 right-4 flex items-center space-x-4 text-sm">
          <a href="https://tuaran.pages.dev" target="_blank" 
             class="flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors duration-200">
            <span class="text-orange-500">🚀</span>
            <span class="font-medium">tuaran.pages.dev</span>
          </a>
          <div class="flex items-center space-x-1 text-gray-700">
            <span class="text-orange-500">🎁</span>
            <span class="font-medium">微信: </span>
            <span class="font-bold text-orange-800 bg-orange-100 px-2 py-1 rounded text-xs">atar24</span>
          </div>
        </div>
        
        <!-- 主要内容区域 -->
        <div class="text-center space-y-6">
          <!-- 主要标题：全网粉丝量 -->
          <div>
            <h1 class="text-5xl font-bold mb-3">
              <span class="text-gray-800 transition-all duration-300 hover:scale-105 inline-block">
                全网粉丝量：<span class="text-orange-600">{{ animatedFans.toLocaleString() }}</span>
              </span>
            </h1>
            <div class="w-32 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto"></div>
          </div>
          
          <!-- IP号有区域 -->
          <div>
            <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-orange-200/50 p-6 max-w-4xl mx-auto">
              <div class="flex items-center justify-center space-x-8">
                <span class="text-xl font-bold text-gray-800">📊 矩阵IP</span>
                <button 
                  @click="switchAccount('掘金安东尼')"
                  class="flex items-center px-6 py-4 rounded-xl transition-all duration-200 transform hover:scale-105"
                  :class="activeAccount === '掘金安东尼' 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : 'bg-white hover:bg-orange-50 text-gray-700 border border-orange-200 shadow-md'"
                >
                  <div class="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <span class="text-white text-lg">👨‍💻</span>
                  </div>
                  <div class="text-left">
                    <div class="font-bold text-lg">掘金安东尼</div>
                    <div class="text-sm opacity-75">粉丝：{{ anthonyTotalFans.toLocaleString() }}</div>
                  </div>
                </button>
                
                <button 
                  @click="switchAccount('代码AI弗森')"
                  class="flex items-center px-6 py-4 rounded-xl transition-all duration-200 transform hover:scale-105"
                  :class="activeAccount === '代码AI弗森' 
                    ? 'bg-amber-500 text-white shadow-lg' 
                    : 'bg-white hover:bg-amber-50 text-gray-700 border border-amber-200 shadow-md'"
                >
                  <div class="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <span class="text-white text-lg">🤖</span>
                  </div>
                  <div class="text-left">
                    <div class="font-bold text-lg">代码AI弗森</div>
                    <div class="text-sm opacity-75">粉丝：{{ aifsTotalFans.toLocaleString() }}</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>


    <!-- 主内容区域 -->
    <main class="flex-1">
      <router-view />
    </main>
    

  </div>
</template>

<style scoped>
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 彩虹动画 */
@keyframes rainbow {
  0% { filter: hue-rotate(0deg); }
  25% { filter: hue-rotate(90deg); }
  50% { filter: hue-rotate(180deg); }
  75% { filter: hue-rotate(270deg); }
  100% { filter: hue-rotate(360deg); }
}

/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}


</style>
