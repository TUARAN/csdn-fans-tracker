<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePlansStore } from '@/stores/plans'
import { useFansStore } from '@/stores/fans'
import type { CommunityType, PlanStatus } from '@/types'
import { 
  Calendar, 
  Target, 
  BookOpen, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Eye, 
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const plansStore = usePlansStore()
const fansStore = useFansStore()

const platform = computed(() => route.params.platform as CommunityType)
const account = computed(() => route.params.account as string)
const platformPlan = computed(() => plansStore.getPlatformPlan(platform.value, account.value))

// 当前选中的周索引
const selectedWeekIndex = ref(0)

// 当前选中的内容标签页
const selectedContentTab = ref('')

// 当前选中的周总结
const currentWeeklySummary = computed(() => {
  if (platformPlan.value.weeklySummaries.length === 0) return null
  return platformPlan.value.weeklySummaries[selectedWeekIndex.value]
})

// 平台信息配置
const platformConfig = {
  csdn: { name: 'CSDN', color: 'red', icon: '📝', bgColor: 'bg-red-50', textColor: 'text-red-600' },
  juejin: { name: '掘金', color: 'orange', icon: '💎', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
  toutiao: { name: '头条', color: 'gray', icon: '📰', bgColor: 'bg-gray-50', textColor: 'text-gray-600' },
  zhihu: { name: '知乎', color: 'blue', icon: '🤔', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
  _51cto: { name: '51CTO', color: 'purple', icon: '💻', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
  wechat: { name: '微信公众号', color: 'green', icon: '📱', bgColor: 'bg-green-50', textColor: 'text-green-600' },
  segmentfault: { name: '思否', color: 'indigo', icon: '🔍', bgColor: 'bg-indigo-50', textColor: 'text-indigo-600' },
  infoq: { name: 'InfoQ', color: 'teal', icon: '📊', bgColor: 'bg-teal-50', textColor: 'text-teal-600' }
}

const currentConfig = computed(() => platformConfig[platform.value])

// 当前统计数据
const currentStats = computed(() => fansStore.currentStats[platform.value] || {
  currentFans: 0,
  currentReads: 0,
  totalArticles: 0,
  weeklyGrowth: 0
})

// 状态颜色映射
const statusColors = {
  planning: 'bg-purple-100 text-purple-600',
  in_progress: 'bg-blue-100 text-blue-600',
  completed: 'bg-green-100 text-green-600',
  overdue: 'bg-red-100 text-red-600'
}

// 格式化数字
const formatNumber = (num: number) => new Intl.NumberFormat('zh-CN').format(num)

// 返回数据面板
const goBack = () => {
  router.push('/dashboard')
}

// 获取状态图标
const getStatusIcon = (status: PlanStatus) => {
  switch (status) {
    case 'planning': return Clock
    case 'in_progress': return BarChart3
    case 'completed': return CheckCircle
    case 'overdue': return AlertCircle
    default: return Clock
  }
}

// 切换到上一周
const previousWeek = () => {
  if (selectedWeekIndex.value > 0) {
    selectedWeekIndex.value--
  }
}

// 切换到下一周
const nextWeek = () => {
  if (selectedWeekIndex.value < platformPlan.value.weeklySummaries.length - 1) {
    selectedWeekIndex.value++
  }
}

// 选择特定周
const selectWeek = (index: number) => {
  selectedWeekIndex.value = index
}

// 监听内容规划变化，自动选中第一个标签页
const updateSelectedContentTab = () => {
  if (platformPlan.value.writingPlans.length > 0) {
    selectedContentTab.value = platformPlan.value.writingPlans[0].id
  }
}

// 组件挂载时初始化
onMounted(() => {
  updateSelectedContentTab()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <button 
              @click="goBack"
              class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft class="w-5 h-5 text-gray-600" />
            </button>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <span class="text-lg">{{ currentConfig.icon }}</span>
              </div>
              <div>
                <h1 class="text-xl font-semibold text-gray-900">{{ account }} - {{ currentConfig.name }} 计划</h1>
                <p class="text-sm text-gray-500">平台运营策略与内容规划</p>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <div class="text-sm text-gray-500">当前粉丝</div>
              <div class="text-lg font-semibold text-gray-900">{{ formatNumber(currentStats.currentFans) }}</div>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-500">总阅读</div>
              <div class="text-lg font-semibold text-gray-900">{{ formatNumber(currentStats.currentReads) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- 第一行：周总结 -->
      <div class="mb-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">周总结</h3>
            <div class="flex items-center space-x-3">
              <!-- 周选择器 -->
              <div v-if="platformPlan.weeklySummaries.length > 1" class="flex items-center space-x-2">
                <!-- 调试信息 -->
                <div class="text-xs text-gray-400 mr-2">
                  当前: {{ selectedWeekIndex + 1 }}/{{ platformPlan.weeklySummaries.length }}
                </div>
                <button 
                  @click="previousWeek"
                  :disabled="selectedWeekIndex === 0"
                  class="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft class="w-4 h-4 text-gray-600" />
                </button>
                <div class="flex items-center space-x-1">
                  <button 
                    v-for="(summary, index) in platformPlan.weeklySummaries" 
                    :key="summary.id"
                    @click="selectWeek(index)"
                    :class="`px-2 py-1 text-xs rounded transition-colors ${
                      selectedWeekIndex === index 
                        ? 'bg-blue-100 text-blue-600 font-medium' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`"
                  >
                    {{ summary.weekStart }}
                  </button>
                </div>
                <button 
                  @click="nextWeek"
                  :disabled="selectedWeekIndex === platformPlan.weeklySummaries.length - 1"
                  class="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight class="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Calendar class="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
          <div v-if="platformPlan.weeklySummaries.length === 0" class="text-center py-8">
            <Calendar class="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p class="text-gray-500">暂无周总结</p>
          </div>
          <div v-else-if="currentWeeklySummary" class="space-y-4">
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="font-medium text-gray-900">
                  {{ currentWeeklySummary.weekStart }} - {{ currentWeeklySummary.weekEnd }}
                </h4>
                <div class="flex items-center space-x-2">
                  <span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">周总结</span>
                  <span class="text-xs text-gray-500">第 {{ selectedWeekIndex + 1 }} 周</span>
                </div>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div class="text-center">
                  <div class="text-lg font-semibold text-blue-600">{{ currentWeeklySummary.metrics.articlesPublished }}</div>
                  <div class="text-xs text-gray-500">发布文章</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-semibold text-green-600">+{{ currentWeeklySummary.metrics.fansGrowth }}</div>
                  <div class="text-xs text-gray-500">粉丝增长</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-semibold text-purple-600">+{{ formatNumber(currentWeeklySummary.metrics.readGrowth) }}</div>
                  <div class="text-xs text-gray-500">阅读增长</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-semibold text-orange-600">{{ currentWeeklySummary.metrics.engagementRate }}%</div>
                  <div class="text-xs text-gray-500">互动率</div>
                </div>
              </div>
              <div class="space-y-3">
                <div>
                  <h5 class="text-sm font-medium text-green-700 mb-1">成就</h5>
                  <ul class="text-sm text-gray-600 space-y-1">
                    <li v-for="achievement in currentWeeklySummary.achievements" :key="achievement" 
                        class="flex items-start">
                      <span class="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {{ achievement }}
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 class="text-sm font-medium text-orange-700 mb-1">挑战</h5>
                  <ul class="text-sm text-gray-600 space-y-1">
                    <li v-for="challenge in currentWeeklySummary.challenges" :key="challenge" 
                        class="flex items-start">
                      <span class="w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {{ challenge }}
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 class="text-sm font-medium text-blue-700 mb-1">学习收获</h5>
                  <ul class="text-sm text-gray-600 space-y-1">
                    <li v-for="learning in currentWeeklySummary.learnings" :key="learning" 
                        class="flex items-start">
                      <span class="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {{ learning }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 第二行：策略规划和思考笔记并排 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 策略规划 -->
        <div>
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">策略规划</h3>
              <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Target class="w-4 h-4 text-gray-600" />
              </div>
            </div>
            
            <!-- 目标规划 -->
            <div class="mb-6">
              <h4 class="text-md font-medium text-gray-800 mb-3">目标规划</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 class="text-sm font-medium text-blue-700 mb-2">短期目标</h5>
                  <ul class="space-y-1">
                    <li v-for="goal in platformPlan.goals.shortTerm" :key="goal" 
                        class="text-sm text-gray-600 flex items-start">
                      <span class="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {{ goal }}
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 class="text-sm font-medium text-green-700 mb-2">中期目标</h5>
                  <ul class="space-y-1">
                    <li v-for="goal in platformPlan.goals.mediumTerm" :key="goal" 
                        class="text-sm text-gray-600 flex items-start">
                      <span class="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {{ goal }}
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 class="text-sm font-medium text-purple-700 mb-2">长期目标</h5>
                  <ul class="space-y-1">
                    <li v-for="goal in platformPlan.goals.longTerm" :key="goal" 
                        class="text-sm text-gray-600 flex items-start">
                      <span class="w-1 h-1 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {{ goal }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- 策略分析 -->
            <div class="mb-6">
              <h4 class="text-md font-medium text-gray-800 mb-3">策略分析</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 class="text-sm font-medium text-green-700 mb-2">策略</h5>
                  <ul class="space-y-1">
                    <li v-for="strategy in platformPlan.strategies" :key="strategy" 
                        class="text-sm text-gray-600 flex items-start">
                      <span class="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {{ strategy }}
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 class="text-sm font-medium text-orange-700 mb-2">挑战</h5>
                  <ul class="space-y-1">
                    <li v-for="challenge in platformPlan.challenges" :key="challenge" 
                        class="text-sm text-gray-600 flex items-start">
                      <span class="w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {{ challenge }}
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 class="text-sm font-medium text-blue-700 mb-2">机会</h5>
                  <ul class="space-y-1">
                    <li v-for="opportunity in platformPlan.opportunities" :key="opportunity" 
                        class="text-sm text-gray-600 flex items-start">
                      <span class="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {{ opportunity }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- 内容规划 -->
            <div>
              <h4 class="text-md font-medium text-gray-800 mb-3">内容规划</h4>
              <div v-if="platformPlan.writingPlans.length === 0" class="text-center py-4">
                <BookOpen class="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p class="text-gray-500 text-sm">暂无内容规划</p>
              </div>
              <div v-else>
                <!-- 标签页导航 -->
                <div class="flex space-x-1 mb-4 border-b border-gray-200">
                  <button
                    v-for="plan in platformPlan.writingPlans"
                    :key="plan.id"
                    @click="selectedContentTab = plan.id"
                    :class="[
                      'px-4 py-2 text-sm font-medium rounded-t-lg transition-colors',
                      selectedContentTab === plan.id
                        ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    {{ plan.title }}
                  </button>
                </div>
                
                <!-- 标签页内容 -->
                <div class="min-h-[200px]">
                  <div v-for="plan in platformPlan.writingPlans" :key="plan.id" 
                       v-show="selectedContentTab === plan.id"
                       class="space-y-3">
                    <div v-if="plan.articles.length === 0" class="text-center py-8">
                      <BookOpen class="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p class="text-gray-500 text-sm">{{ plan.title }} 文章清单</p>
                      <p class="text-gray-400 text-xs mt-1">暂无文章</p>
                    </div>
                    <div v-else class="max-h-[400px] overflow-y-auto">
                      <div v-for="article in plan.articles" :key="article.id" 
                           class="border-b border-gray-100 py-2 hover:bg-gray-50 transition-colors">
                        <div class="flex items-start">
                          <div class="flex-1">
                            <h5 class="font-medium text-gray-900 text-sm mb-1">{{ article.title }}</h5>
                            <p class="text-xs text-gray-600">{{ article.description }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 思考笔记 -->
        <div>
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">思考笔记</h3>
              <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Lightbulb class="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div v-if="platformPlan.thoughtNotes.length === 0" class="text-center py-8">
              <Lightbulb class="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p class="text-gray-500">暂无思考笔记</p>
            </div>
            <div v-else class="space-y-4">
              <div v-for="note in platformPlan.thoughtNotes" :key="note.id" 
                   class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-900 mb-1">{{ note.title }}</h4>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{{ note.category === 'strategy' ? '策略' : 
                              note.category === 'content' ? '内容' : 
                              note.category === 'growth' ? '增长' : '反思' }}</span>
                      <span>{{ note.createdAt }}</span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span v-for="tag in note.tags" :key="tag" 
                          class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {{ tag }}
                    </span>
                  </div>
                </div>
                <div class="text-sm text-gray-600 whitespace-pre-line mb-3">
                  {{ note.content }}
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="text-xs text-gray-500">相关平台:</span>
                    <div class="flex space-x-1">
                      <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {{ currentConfig.name }}
                      </span>
                    </div>
                  </div>
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