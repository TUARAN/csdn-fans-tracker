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
  ChevronRight,
  Sparkles,
  Zap,
  Brain,
  Code,
  Database,
  Shield,
  Globe,
  Palette,
  Cpu
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

// 当前选中的阶段总结
const currentWeeklySummary = computed(() => {
  if (platformPlan.value.weeklySummaries.length === 0) return null
  return platformPlan.value.weeklySummaries[selectedWeekIndex.value]
})

// 平台信息配置
const platformConfig = {
  csdn: { name: 'CSDN', color: 'red', icon: '📝', bgColor: 'bg-gradient-to-br from-red-50 to-red-100', textColor: 'text-red-600', borderColor: 'border-red-200' },
  juejin: { name: '掘金', color: 'orange', icon: '💎', bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100', textColor: 'text-orange-600', borderColor: 'border-orange-200' },
  toutiao: { name: '头条', color: 'gray', icon: '📰', bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100', textColor: 'text-gray-600', borderColor: 'border-gray-200' },
  zhihu: { name: '知乎', color: 'blue', icon: '🤔', bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100', textColor: 'text-blue-600', borderColor: 'border-blue-200' },
  _51cto: { name: '51CTO', color: 'purple', icon: '💻', bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100', textColor: 'text-purple-600', borderColor: 'border-purple-200' },
  wechat: { name: '微信公众号', color: 'green', icon: '📱', bgColor: 'bg-gradient-to-br from-green-50 to-green-100', textColor: 'text-green-600', borderColor: 'border-green-200' },
  weibo: { name: '微博', color: 'pink', icon: '🐦', bgColor: 'bg-gradient-to-br from-pink-50 to-pink-100', textColor: 'text-pink-600', borderColor: 'border-pink-200' },
  infoq: { name: 'InfoQ', color: 'teal', icon: '📊', bgColor: 'bg-gradient-to-br from-teal-50 to-teal-100', textColor: 'text-teal-600', borderColor: 'border-teal-200' },
  xiaohongshu: { name: '小红书', color: 'red', icon: '📖', bgColor: 'bg-gradient-to-br from-red-50 to-red-100', textColor: 'text-red-600', borderColor: 'border-red-200' }
}

const currentConfig = computed(() => platformConfig[platform.value])

// 当前统计数据
const currentStats = computed(() => {
  // 如果是"安东尼漫长岁月"账号，显示真实的CSDN数据
if (account.value === '安东尼漫长岁月') {
    if (platform.value === 'csdn') {
      return {
        currentFans: 265,
        currentReads: 41583,
        totalArticles: 72,
        weeklyGrowth: 7
      }
    }
    return {
      currentFans: 0,
      currentReads: 0,
      totalArticles: 0,
      weeklyGrowth: 0
    }
  }
  
  // 其他账号使用fans store中的数据
  return fansStore.currentStats[platform.value] || {
    currentFans: 0,
    currentReads: 0,
    totalArticles: 0,
    weeklyGrowth: 0
  }
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
  router.push('/')
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

// 内容分类图标映射
const getCategoryIcon = (title: string) => {
  if (title.includes('基础概念') || title.includes('底层机制')) return Brain
  if (title.includes('架构设计') || title.includes('应用模式')) return Code
  if (title.includes('模型微调') || title.includes('参数高效化')) return Cpu
  if (title.includes('开发框架') || title.includes('生态对比')) return Database
  if (title.includes('大模型与数据')) return Database
  if (title.includes('产品设计') || title.includes('落地')) return Palette
  if (title.includes('安全') || title.includes('隐私') || title.includes('治理')) return Shield
  if (title.includes('多模态') || title.includes('视觉')) return Globe
  if (title.includes('编程') || title.includes('自动化')) return Zap
  if (title.includes('策略') || title.includes('趋势') || title.includes('认知')) return Sparkles
  return BookOpen
}

// 内容分类颜色映射
const getCategoryColor = (title: string) => {
  if (title.includes('基础概念') || title.includes('底层机制')) return 'from-blue-500 to-cyan-500'
  if (title.includes('架构设计') || title.includes('应用模式')) return 'from-purple-500 to-pink-500'
  if (title.includes('模型微调') || title.includes('参数高效化')) return 'from-green-500 to-emerald-500'
  if (title.includes('开发框架') || title.includes('生态对比')) return 'from-orange-500 to-red-500'
  if (title.includes('大模型与数据')) return 'from-indigo-500 to-blue-500'
  if (title.includes('产品设计') || title.includes('落地')) return 'from-pink-500 to-rose-500'
  if (title.includes('安全') || title.includes('隐私') || title.includes('治理')) return 'from-red-500 to-orange-500'
  if (title.includes('多模态') || title.includes('视觉')) return 'from-teal-500 to-cyan-500'
  if (title.includes('编程') || title.includes('自动化')) return 'from-yellow-500 to-orange-500'
  if (title.includes('策略') || title.includes('趋势') || title.includes('认知')) return 'from-violet-500 to-purple-500'
  return 'from-gray-500 to-gray-600'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
    <!-- 顶部导航 -->
    <div class="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <button 
              @click="goBack"
              class="p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft class="w-5 h-5 text-gray-600" />
            </button>
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
                <span class="text-xl">{{ currentConfig.icon }}</span>
              </div>
              <div>
                <h1 class="text-xl font-bold text-gray-900">{{ account }} - {{ currentConfig.name }} 计划</h1>
                <p class="text-sm text-gray-500">平台运营策略与内容规划</p>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-6">
            <div class="text-center">
              <div class="text-sm text-gray-500">当前粉丝</div>
              <div class="text-lg font-bold text-gray-900">{{ formatNumber(currentStats.currentFans) }}</div>
            </div>
            <div class="text-center">
              <div class="text-sm text-gray-500">总阅读</div>
              <div class="text-lg font-bold text-gray-900">{{ formatNumber(currentStats.currentReads) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 第一行：阶段总结 -->
      <div class="mb-8">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-xl font-bold text-gray-900 flex items-center">
              <Calendar class="w-6 h-6 mr-3 text-blue-600" />
              阶段总结
            </h3>
            <div class="flex items-center space-x-4">
              <!-- 周选择器 -->
              <div v-if="platformPlan.weeklySummaries.length > 1" class="flex items-center space-x-3">
                <button 
                  @click="previousWeek"
                  :disabled="selectedWeekIndex === 0"
                  class="p-2 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
                >
                  <ChevronLeft class="w-4 h-4 text-gray-600" />
                </button>
                <div class="flex items-center space-x-2">
                  <button 
                    v-for="(summary, index) in platformPlan.weeklySummaries" 
                    :key="summary.id"
                    @click="selectWeek(index)"
                    :class="`px-4 py-2 text-sm rounded-xl transition-all duration-200 ${
                      selectedWeekIndex === index 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-lg' 
                        : 'text-gray-500 hover:bg-gray-100 hover:scale-105'
                    }`"
                  >
                    {{ summary.weekStart }}
                  </button>
                </div>
                <button 
                  @click="nextWeek"
                  :disabled="selectedWeekIndex === platformPlan.weeklySummaries.length - 1"
                  class="p-2 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
                >
                  <ChevronRight class="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          <div v-if="platformPlan.weeklySummaries.length === 0" class="text-center py-12">
            <Calendar class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p class="text-gray-500 text-lg">暂无阶段总结</p>
          </div>
          <div v-else-if="currentWeeklySummary" class="space-y-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
              <div class="flex items-center justify-between mb-6">
                <h4 class="font-bold text-gray-900 text-lg">
                  {{ currentWeeklySummary.weekStart }} - {{ currentWeeklySummary.weekEnd }}
                </h4>
                <div class="flex items-center space-x-3">
                  <span class="text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl font-medium">阶段总结{{ currentWeeklySummary.version }}</span>
                  <span class="text-sm text-gray-500">第 {{ selectedWeekIndex + 1 }} 阶段</span>
                </div>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div class="text-center bg-white rounded-xl p-4 shadow-sm">
                  <div class="text-2xl font-bold text-blue-600 mb-1">{{ currentWeeklySummary.metrics.articlesPublished }}</div>
                  <div class="text-sm text-gray-500">发布文章</div>
                </div>
                <div class="text-center bg-white rounded-xl p-4 shadow-sm">
                  <div class="text-2xl font-bold text-green-600 mb-1">+{{ currentWeeklySummary.metrics.fansGrowth }}</div>
                  <div class="text-sm text-gray-500">粉丝增长</div>
                </div>
                <div class="text-center bg-white rounded-xl p-4 shadow-sm">
                  <div class="text-2xl font-bold text-purple-600 mb-1">+{{ formatNumber(currentWeeklySummary.metrics.readGrowth) }}</div>
                  <div class="text-sm text-gray-500">阅读增长</div>
                </div>
                <div class="text-center bg-white rounded-xl p-4 shadow-sm">
                  <div class="text-2xl font-bold text-orange-600 mb-1">{{ currentWeeklySummary.metrics.engagementRate }}%</div>
                  <div class="text-sm text-gray-500">互动率</div>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl p-4 shadow-sm">
                  <h5 class="text-sm font-bold text-green-700 mb-3 flex items-center">
                    <CheckCircle class="w-4 h-4 mr-2" />
                    成就
                  </h5>
                  <ul class="text-sm text-gray-600 space-y-2">
                    <li v-for="achievement in currentWeeklySummary.achievements" :key="achievement" 
                        class="flex items-start">
                      <span class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {{ achievement }}
                    </li>
                  </ul>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm">
                  <h5 class="text-sm font-bold text-orange-700 mb-3 flex items-center">
                    <AlertCircle class="w-4 h-4 mr-2" />
                    挑战
                  </h5>
                  <ul class="text-sm text-gray-600 space-y-2">
                    <li v-for="challenge in currentWeeklySummary.challenges" :key="challenge" 
                        class="flex items-start">
                      <span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {{ challenge }}
                    </li>
                  </ul>
                </div>
                <div class="bg-white rounded-xl p-4 shadow-sm">
                  <h5 class="text-sm font-bold text-blue-700 mb-3 flex items-center">
                    <Lightbulb class="w-4 h-4 mr-2" />
                    学习收获
                  </h5>
                  <ul class="text-sm text-gray-600 space-y-2">
                    <li v-for="learning in currentWeeklySummary.learnings" :key="learning" 
                        class="flex items-start">
                      <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
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
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 策略规划 -->
        <div>
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 h-full">
            <div class="flex items-center justify-between mb-8">
              <h3 class="text-xl font-bold text-gray-900 flex items-center">
                <Target class="w-6 h-6 mr-3 text-purple-600" />
                策略规划
              </h3>
            </div>
            
            <!-- 目标规划 -->
            <div class="mb-8">
              <h4 class="text-lg font-bold text-gray-800 mb-6">目标规划</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <h5 class="text-sm font-bold text-blue-700 mb-3">短期目标</h5>
                  <ul class="space-y-2">
                    <li v-for="goal in platformPlan.goals.shortTerm" :key="goal" 
                        class="text-sm text-gray-600 flex items-start">
                      <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {{ goal }}
                    </li>
                  </ul>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <h5 class="text-sm font-bold text-green-700 mb-3">中期目标</h5>
                  <ul class="space-y-2">
                    <li v-for="goal in platformPlan.goals.mediumTerm" :key="goal" 
                        class="text-sm text-gray-600 flex items-start">
                      <span class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {{ goal }}
                    </li>
                  </ul>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <h5 class="text-sm font-bold text-purple-700 mb-3">长期目标</h5>
                  <ul class="space-y-2">
                    <li v-for="goal in platformPlan.goals.longTerm" :key="goal" 
                        class="text-sm text-gray-600 flex items-start">
                      <span class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {{ goal }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- 策略分析 -->
            <div class="mb-8">
              <h4 class="text-lg font-bold text-gray-800 mb-6">策略分析</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <h5 class="text-sm font-bold text-green-700 mb-3">策略</h5>
                  <ul class="space-y-2">
                    <li v-for="strategy in platformPlan.strategies" :key="strategy" 
                        class="text-sm text-gray-600 flex items-start">
                      <span class="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {{ strategy }}
                    </li>
                  </ul>
                </div>
                <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <h5 class="text-sm font-bold text-orange-700 mb-3">挑战</h5>
                  <ul class="space-y-2">
                    <li v-for="challenge in platformPlan.challenges" :key="challenge" 
                        class="text-sm text-gray-600 flex items-start">
                      <span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {{ challenge }}
                    </li>
                  </ul>
                </div>
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <h5 class="text-sm font-bold text-blue-700 mb-3">机会</h5>
                  <ul class="space-y-2">
                    <li v-for="opportunity in platformPlan.opportunities" :key="opportunity" 
                        class="text-sm text-gray-600 flex items-start">
                      <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {{ opportunity }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- 内容规划 -->
            <div>
              <h4 class="text-lg font-bold text-gray-800 mb-6">内容规划</h4>
              <div v-if="platformPlan.writingPlans.length === 0" class="text-center py-8">
                <BookOpen class="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p class="text-gray-500 text-sm">暂无内容规划</p>
              </div>
              <div v-else>
                <!-- 现代化的标签页导航 -->
                <div class="flex flex-wrap gap-3 mb-6">
                  <button
                    v-for="plan in platformPlan.writingPlans"
                    :key="plan.id"
                    @click="selectedContentTab = plan.id"
                    :class="[
                      'px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 flex items-center space-x-2',
                      selectedContentTab === plan.id
                        ? 'shadow-lg transform scale-105'
                        : 'bg-white/60 hover:bg-white/80 hover:scale-105 border border-gray-200/50'
                    ]"
                    :style="selectedContentTab === plan.id ? `background: linear-gradient(135deg, ${getCategoryColor(plan.title)}); color: #1f2937;` : ''"
                  >
                    <component :is="getCategoryIcon(plan.title)" class="w-4 h-4" :style="selectedContentTab === plan.id ? 'color: #1f2937;' : 'color: #6b7280;'" />
                    <span :style="selectedContentTab === plan.id ? 'color: #1f2937;' : 'color: #374151;'">{{ plan.title.split('（')[0] }}</span>
                  </button>
                </div>
                
                <!-- 标签页内容 -->
                <div class="min-h-[300px]">
                  <div v-for="plan in platformPlan.writingPlans" :key="plan.id" 
                       v-show="selectedContentTab === plan.id"
                       class="space-y-4">
                    <div v-if="plan.articles.length === 0" class="text-center py-12">
                      <BookOpen class="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p class="text-gray-500 text-lg">{{ plan.title }} 文章清单</p>
                      <p class="text-gray-400 text-sm mt-2">暂无文章</p>
                    </div>
                    <div v-else class="max-h-[400px] overflow-y-auto space-y-4">
                      <div v-for="article in plan.articles" :key="article.id" 
                           class="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 hover:bg-white/80 transition-all duration-200 hover:scale-105 hover:shadow-lg">
                        <div class="flex items-start">
                          <div class="flex-1">
                            <h5 class="font-bold text-gray-900 text-sm mb-2">{{ article.title }}</h5>
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
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 h-full">
            <div class="flex items-center justify-between mb-8">
              <h3 class="text-xl font-bold text-gray-900 flex items-center">
                <Lightbulb class="w-6 h-6 mr-3 text-yellow-600" />
                思考笔记
              </h3>
            </div>
            <div v-if="platformPlan.thoughtNotes.length === 0" class="text-center py-12">
              <Lightbulb class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p class="text-gray-500 text-lg">暂无思考笔记</p>
            </div>
            <div v-else class="space-y-6">
              <div v-for="note in platformPlan.thoughtNotes" :key="note.id" 
                   class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200/50 hover:shadow-lg transition-all duration-200">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <h4 class="font-bold text-gray-900 mb-2">{{ note.title }}</h4>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <span class="bg-white/60 px-3 py-1 rounded-full text-xs">
                        {{ note.category === 'strategy' ? '策略' : 
                            note.category === 'content' ? '内容' : 
                            note.category === 'growth' ? '增长' : '反思' }}
                      </span>
                      <span>{{ note.createdAt }}</span>
                    </div>
                  </div>
                </div>
                <div class="text-sm text-gray-600 whitespace-pre-line mb-4 bg-white/60 rounded-lg p-4">
                  {{ note.content }}
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="text-xs text-gray-500">相关平台:</span>
                    <div class="flex space-x-2">
                      <span class="text-xs bg-white/60 text-gray-600 px-3 py-1 rounded-full">
                        {{ currentConfig.name }}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span v-for="tag in note.tags" :key="tag" 
                          class="text-xs bg-white/60 text-gray-600 px-3 py-1 rounded-full">
                      {{ tag }}
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
</template>

<style scoped>
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #94a3b8, #64748b);
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>