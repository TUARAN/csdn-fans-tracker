<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { 
  BarChart3, 
  FileText, 
  Calendar, 
  TrendingUp,
  User,
  Target
} from 'lucide-vue-next'

const route = useRoute()

const navItems = [
  { path: '/dashboard', name: '数据面板', icon: BarChart3 },
  { path: '/articles', name: '文章管理', icon: FileText },
  { path: '/calendar', name: '发布日历', icon: Calendar },
  { path: '/insight', name: '增长分析', icon: TrendingUp }
]

const currentRoute = computed(() => route.path)
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo和标题 -->
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-csdn-red rounded-lg flex items-center justify-center">
              <User class="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">掘金安东尼</h1>
              <p class="text-sm text-gray-500">技术博主 · <a href="https://tuaran.pages.dev" target="_blank" class="text-blue-600 hover:text-blue-800 underline">个人主页</a></p>
            </div>
          </div>

          <!-- 目标显示 -->
          <div class="hidden md:flex items-center space-x-6">
            <div class="flex items-center space-x-2 text-sm">
              <Target class="w-4 h-4 text-csdn-red" />
              <span class="text-gray-600">目标：</span>
              <span class="font-semibold text-csdn-red">1万粉丝</span>
            </div>
            <div class="flex items-center space-x-2 text-sm">
              <span class="text-gray-600">更多内容：</span>
              <a href="https://tuaran.pages.dev" target="_blank" class="text-blue-600 hover:text-blue-800 underline">tuaran.pages.dev</a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 主导航 -->
    <nav class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center space-x-2 py-4 px-1 border-b-2 text-sm font-medium transition-colors duration-200"
            :class="currentRoute === item.path 
              ? 'border-csdn-red text-csdn-red' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            <component :is="item.icon" class="w-4 h-4" />
            <span>{{ item.name }}</span>
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- 主内容区域 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
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
</style>
