<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useFansStore } from '@/stores/fans'
import { 
  BarChart3, 
  FileText, 
  Calendar, 
  TrendingUp,
  User,
  Target,
  ChevronDown,
  Send
} from 'lucide-vue-next'

const route = useRoute()
const fansStore = useFansStore()
const showAccountDropdown = ref(false)
const easterEggCount = ref(0)
const showEasterEggMessage = ref(false)

const navItems = [
  { path: '/publish', name: '一键发布', icon: Send }
]

// 彩蛋功能
const triggerEasterEgg = () => {
  easterEggCount.value++
  
  if (easterEggCount.value === 1) {
    showEasterEggMessage.value = true
    setTimeout(() => {
      showEasterEggMessage.value = false
    }, 3000)
  } else if (easterEggCount.value === 5) {
    // 连续点击5次触发特殊效果
    document.body.style.animation = 'rainbow 2s ease-in-out'
    setTimeout(() => {
      document.body.style.animation = ''
    }, 2000)
  } else if (easterEggCount.value === 10) {
    // 连续点击10次触发终极彩蛋
    alert('🎉 恭喜你发现了终极彩蛋！\n\n你是一个细心的开发者！\n\n继续加油，代码写得好，bug少不了！ 😄')
    easterEggCount.value = 0
  }
}

const currentRoute = computed(() => route.path)

// 切换矩阵账号
const switchMatrixAccount = (accountName: string) => {
  fansStore.switchMatrixAccount(accountName)
  showAccountDropdown.value = false
}

// 切换下拉菜单
const toggleAccountDropdown = () => {
  showAccountDropdown.value = !showAccountDropdown.value
}
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <header class="bg-gradient-to-r from-white via-gray-100 to-blue-100 shadow-2xl border-b border-gray-200 sticky top-0 z-40 relative overflow-visible">
      <!-- 背景装饰元素 -->
      <div class="absolute inset-0 opacity-10">
        <!-- 数据曲线 -->
        <svg class="absolute top-4 right-20 w-32 h-16" viewBox="0 0 128 64" fill="none">
          <path d="M0 32 L20 20 L40 40 L60 10 L80 30 L100 25 L120 35 L128 28" stroke="#F13C3C" stroke-width="2" fill="none"/>
          <circle cx="20" cy="20" r="2" fill="#F13C3C"/>
          <circle cx="40" cy="40" r="2" fill="#F13C3C"/>
          <circle cx="60" cy="10" r="2" fill="#F13C3C"/>
          <circle cx="80" cy="30" r="2" fill="#F13C3C"/>
          <circle cx="100" cy="25" r="2" fill="#F13C3C"/>
          <circle cx="120" cy="35" r="2" fill="#F13C3C"/>
        </svg>
        
        <!-- 柱状图 -->
        <svg class="absolute top-6 right-60 w-24 h-16" viewBox="0 0 96 64" fill="none">
          <rect x="8" y="40" width="8" height="24" fill="#F13C3C" opacity="0.8"/>
          <rect x="24" y="30" width="8" height="34" fill="#F13C3C" opacity="0.6"/>
          <rect x="40" y="20" width="8" height="44" fill="#F13C3C" opacity="0.9"/>
          <rect x="56" y="35" width="8" height="29" fill="#F13C3C" opacity="0.7"/>
          <rect x="72" y="25" width="8" height="39" fill="#F13C3C" opacity="0.5"/>
          <rect x="88" y="15" width="8" height="49" fill="#F13C3C" opacity="0.8"/>
        </svg>
        
        <!-- 数据点 -->
        <div class="absolute top-8 right-40 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
        <div class="absolute top-12 right-36 w-1 h-1 bg-red-300 rounded-full animate-pulse" style="animation-delay: 0.5s"></div>
        <div class="absolute top-6 right-44 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" style="animation-delay: 1s"></div>
        
        <!-- 左侧装饰 -->
        <svg class="absolute top-4 left-20 w-20 h-12" viewBox="0 0 80 48" fill="none">
          <path d="M0 24 L15 15 L30 30 L45 8 L60 20 L75 18 L80 22" stroke="#6366F1" stroke-width="1.5" fill="none"/>
        </svg>
        
        <!-- 网格背景 -->
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0); background-size: 20px 20px;"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex justify-between items-center h-20">
          <!-- 左侧标题区域 -->
          <div class="flex items-center">
            <div class="flex items-center space-x-4">
              <!-- 数据图标 -->
              <div class="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-110" @click="triggerEasterEgg">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              
              <!-- 标题和账号切换 -->
              <div class="flex items-center space-x-3">
                <h1 class="text-xl font-bold">
                  <span class="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">{{ fansStore.currentMatrixAccount.name }}</span>
                </h1>
                
                <!-- 账号切换下拉选择器 -->
                <div class="relative">
                  <button 
                    @click="toggleAccountDropdown"
                    class="flex items-center px-2 py-1 bg-white/80 hover:bg-white rounded-lg transition-colors border border-gray-200 shadow-sm"
                  >
                    <span class="text-sm mr-1">{{ fansStore.currentMatrixAccount.avatar }}</span>
                    <ChevronDown class="w-3 h-3 text-gray-500" :class="{ 'rotate-180': showAccountDropdown }" />
                  </button>
                  
                  <!-- 下拉菜单 -->
                  <div v-if="showAccountDropdown" class="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div class="py-1">
                      <button 
                        v-for="account in fansStore.matrixAccounts" 
                        :key="account.id"
                        @click="switchMatrixAccount(account.name)"
                        class="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                        :class="{ 'bg-blue-50 text-blue-700': fansStore.activeMatrixAccount === account.name }"
                      >
                        <span class="text-sm mr-2">{{ account.avatar }}</span>
                        <span class="font-medium">{{ account.name }}</span>
                        <span v-if="account.name === '掘金安东尼'" class="ml-auto text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full">
                          主账号
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 右侧数据装饰 -->
          <div class="flex items-center space-x-6 text-gray-500">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span class="text-sm">实时数据</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style="animation-delay: 0.5s"></div>
              <span class="text-sm">多平台</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style="animation-delay: 1s"></div>
              <span class="text-sm">数据同步</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容区域 -->
    <main class="flex-1">
      <router-view />
    </main>
    
    <!-- 彩蛋消息 -->
    <div v-if="showEasterEggMessage" class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg animate-bounce">
        <span class="text-sm font-medium">🎯 发现彩蛋！继续点击有惊喜...</span>
      </div>
    </div>
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
</style>
