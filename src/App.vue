<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

import { 
  BarChart3, 
  FileText, 
  Calendar, 
  TrendingUp,
  User,
  Target
} from 'lucide-vue-next'

const route = useRoute()

const currentRoute = computed(() => route.path)


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
              <!-- 标题和图标 -->
              <div class="flex items-center space-x-3">
                <h1 class="text-xl font-bold">
                  <span class="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
                    安东尼的漫长编程岁月
                  </span>
                </h1>
                
                <!-- 炫酷账号图标组 -->
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg animate-bounce" style="animation-delay: 0s">
                    <span class="text-white text-sm">👨‍💻</span>
                  </div>
                  <div class="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg animate-bounce" style="animation-delay: 0.2s">
                    <span class="text-white text-xs">⚡</span>
                  </div>
                  <div class="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg animate-bounce" style="animation-delay: 0.4s">
                    <span class="text-white text-xs">🔥</span>
                  </div>
                  <div class="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg animate-bounce" style="animation-delay: 0.6s">
                    <span class="text-white text-xs">🎯</span>
                  </div>
                  <div class="w-6 h-6 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg animate-bounce" style="animation-delay: 0.8s">
                    <span class="text-white text-xs">✨</span>
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
