<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useFansStore } from '@/stores/fans'
import { publishService, type PublishResult, type ArticleData, type CookieConfig } from '@/services/publishService'
import TokenGuide from '@/components/TokenGuide.vue'
import { 
  Send, 
  Globe, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  Clock,
  ExternalLink,
  Copy,
  Download,
  Upload,
  Plus,
  Trash2,
  Cookie
} from 'lucide-vue-next'
import type { CommunityType } from '@/types'

const fansStore = useFansStore()

// 发布状态
const publishStatus = ref<'idle' | 'publishing' | 'success' | 'error'>('idle')
const publishProgress = ref(0)
const publishResults = ref<Array<{
  platform: string
  status: 'success' | 'error' | 'pending'
  message: string
  url?: string
}>>([])

// 文章表单
const articleForm = reactive({
  title: '',
  content: '',
  summary: '',
  tags: [] as string[],
  coverImage: '',
  isOriginal: true,
  allowComments: true,
  publishTime: 'now' as 'now' | 'schedule',
  scheduleTime: '',
  category: '技术文章'
})

// 平台选择
const selectedPlatforms = ref<CommunityType[]>(['csdn', 'juejin'])

// 从发布服务获取平台配置
const platformConfigs = publishService.getAllPlatformConfigs()
const platformConfig = Object.keys(platformConfigs).reduce((acc, key) => {
  const config = platformConfigs[key as CommunityType]
  acc[key as CommunityType] = {
    ...config,
    account: fansStore.currentMatrixAccount.name
  }
  return acc
}, {} as Record<CommunityType, any>)

// 标签输入
const tagInput = ref('')
const addTag = () => {
  if (tagInput.value.trim() && !articleForm.tags.includes(tagInput.value.trim())) {
    articleForm.tags.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

const removeTag = (tag: string) => {
  const index = articleForm.tags.indexOf(tag)
  if (index > -1) {
    articleForm.tags.splice(index, 1)
  }
}

// 平台选择
const togglePlatform = (platform: CommunityType) => {
  const index = selectedPlatforms.value.indexOf(platform)
  if (index > -1) {
    selectedPlatforms.value.splice(index, 1)
  } else {
    selectedPlatforms.value.push(platform)
  }
}

const selectAllPlatforms = () => {
  selectedPlatforms.value = Object.keys(platformConfig).filter(
    key => platformConfig[key as CommunityType].enabled
  ) as CommunityType[]
}

const clearAllPlatforms = () => {
  selectedPlatforms.value = []
}

// 移除预览模式，简化界面

// Cookie指南显示状态
const showTokenGuide = ref(false)
const toggleTokenGuide = () => {
  showTokenGuide.value = !showTokenGuide.value
}

// 认证状态
const authStatus = ref<Record<CommunityType, boolean>>({
  csdn: false,
  juejin: false,
  zhihu: false,
  toutiao: false,
  _51cto: false,
  segmentfault: false,
  wechat: false,
  infoq: false
})

// Cookie 配置输入
const cookieConfigs = ref<Record<CommunityType, CookieConfig>>({
  csdn: {},
  juejin: {},
  zhihu: {},
  toutiao: {},
  _51cto: {},
  segmentfault: {},
  wechat: {},
  infoq: {}
})

// Cookie 自动获取状态
const cookieLoading = ref<Record<CommunityType, boolean>>({
  csdn: false,
  juejin: false,
  zhihu: false,
  toutiao: false,
  _51cto: false,
  segmentfault: false,
  wechat: false,
  infoq: false
})

// 设置 Cookie 配置
const setCookieConfig = (platform: CommunityType) => {
  const config = cookieConfigs.value[platform]
  const platformConfig = publishService.getPlatformConfig(platform)
  
  // 检查必需的 Cookie 字段
  const missingFields = platformConfig.cookieFields.filter(field => !config[field])
  
  if (missingFields.length > 0) {
    alert(`请填写以下必需的 Cookie 字段：${missingFields.join('、')}`)
    return
  }

  publishService.setCookieConfig(platform, config)
  authStatus.value[platform] = true
  alert(`${platformConfig.name} Cookie 配置成功！`)
}

// 清除认证
const clearAuth = (platform: CommunityType) => {
  publishService.clearAuth(platform)
  authStatus.value[platform] = false
  cookieConfigs.value[platform] = {}
  alert(`${platformConfig[platform].name} 认证已清除`)
}

// 检查认证状态
const checkAuthStatus = () => {
  Object.keys(platformConfig).forEach(platform => {
    authStatus.value[platform as CommunityType] = publishService.isAuthenticated(platform as CommunityType)
  })
}

// 自动获取 Cookie
const autoGetCookies = async (platform: CommunityType) => {
  if (authStatus.value[platform]) {
    alert(`${platformConfig[platform].name} 已认证，无需重复获取。`)
    return
  }

  cookieLoading.value[platform] = true
  try {
    const cookies = await publishService.autoGetCookies(platform)
    if (cookies) {
      cookieConfigs.value[platform] = cookies
      authStatus.value[platform] = true
      alert(`${platformConfig[platform].name} Cookie 自动获取成功！`)
    } else {
      alert(`${platformConfig[platform].name} Cookie 自动获取失败。请手动配置。`)
    }
  } catch (error) {
    alert(`${platformConfig[platform].name} Cookie 自动获取过程中出现错误：${error instanceof Error ? error.message : '未知错误'}`)
  } finally {
    cookieLoading.value[platform] = false
  }
}

// 移除演示模式，统一使用真实发布逻辑

// 发布文章
const publishArticle = async () => {
  if (!articleForm.title.trim() || !articleForm.content.trim()) {
    alert('请填写文章标题和内容')
    return
  }

  if (selectedPlatforms.value.length === 0) {
    alert('请至少选择一个发布平台')
    return
  }

  // 检查认证状态
  const unauthenticatedPlatforms = selectedPlatforms.value.filter(
    platform => !publishService.isAuthenticated(platform)
  )
  
  if (unauthenticatedPlatforms.length > 0) {
    const platformNames = unauthenticatedPlatforms.map(p => platformConfig[p].name).join('、')
    alert(`请先配置以下平台的 Cookie：${platformNames}`)
    return
  }

  publishStatus.value = 'publishing'
  publishProgress.value = 0
  publishResults.value = []

  try {
    // 准备文章数据
    const articleData: ArticleData = {
      title: articleForm.title,
      content: articleForm.content,
      summary: articleForm.summary,
      tags: articleForm.tags,
      coverImage: articleForm.coverImage,
      isOriginal: articleForm.isOriginal,
      allowComments: articleForm.allowComments,
      category: articleForm.category
    }

    // 批量发布到选中的平台
    const results = await publishService.publishToMultiplePlatforms(selectedPlatforms.value, articleData)
    
    publishResults.value = results
    publishProgress.value = 100
    
    const successCount = results.filter(r => r.status === 'success').length
    const totalCount = results.length
    
    if (successCount === totalCount) {
      publishStatus.value = 'success'
      alert(`发布成功！共发布到 ${successCount} 个平台`)
    } else {
      publishStatus.value = 'error'
      alert(`发布完成，成功 ${successCount}/${totalCount} 个平台`)
    }
  } catch (error) {
    publishStatus.value = 'error'
    alert(`发布过程中出现错误：${error instanceof Error ? error.message : '未知错误'}`)
  }
}

// 复制文章内容
const copyContent = async () => {
  try {
    const content = `标题：${articleForm.title}\n\n${articleForm.content}`
    await navigator.clipboard.writeText(content)
    alert('文章内容已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 导入文章
const importArticle = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.md,.txt'
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        // 简单解析：第一行作为标题，其余作为内容
        const lines = content.split('\n')
        articleForm.title = lines[0] || ''
        articleForm.content = lines.slice(1).join('\n')
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

// 导出文章
const exportArticle = () => {
  const content = `# ${articleForm.title}\n\n${articleForm.content}`
  const blob = new Blob([content], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${articleForm.title || '文章'}.md`
  a.click()
  URL.revokeObjectURL(url)
}

// 字数统计
const wordCount = computed(() => articleForm.content.length)
const readingTime = computed(() => Math.ceil(wordCount.value / 300)) // 假设每分钟300字

// 初始化时检查认证状态
checkAuthStatus()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- 页面标题 -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              一键发布到多平台
            </h1>
            <p class="text-gray-600 mt-2 text-lg">支持 CSDN、掘金、知乎、头条等主流平台，一次编辑，多平台同步发布</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="toggleTokenGuide"
              class="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Cookie class="w-4 h-4 mr-2" />
              {{ showTokenGuide ? '隐藏指南' : 'Cookie指南' }}
            </button>
            <button 
              @click="publishArticle"
              :disabled="publishStatus === 'publishing'"
              class="flex items-center px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Send v-if="publishStatus !== 'publishing'" class="w-5 h-5 mr-2" />
              <div v-else class="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
              {{ publishStatus === 'publishing' ? '发布中...' : '🚀 一键发布' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Cookie指南 -->
      <div v-if="showTokenGuide" class="animate-fade-in">
        <TokenGuide />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 左侧：文章编辑 -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 文章表单 -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
            <div class="space-y-6">
              <!-- 标题 -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">📝 文章标题</label>
                <input 
                  v-model="articleForm.title"
                  type="text"
                  placeholder="请输入一个吸引人的标题..."
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                />
              </div>

              <!-- 摘要 -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">📄 文章摘要</label>
                <textarea 
                  v-model="articleForm.summary"
                  rows="3"
                  placeholder="请输入文章摘要，让读者快速了解内容..."
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              <!-- 标签 -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">🏷️ 标签</label>
                <div class="flex items-center space-x-3 mb-3">
                  <input 
                    v-model="tagInput"
                    @keyup.enter="addTag"
                    type="text"
                    placeholder="输入标签后按回车添加..."
                    class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <button 
                    @click="addTag"
                    class="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200"
                  >
                    <Plus class="w-5 h-5" />
                  </button>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="tag in articleForm.tags" 
                    :key="tag"
                    class="tag inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium shadow-sm"
                  >
                    #{ tag }
                    <button 
                      @click="removeTag(tag)"
                      class="ml-2 hover:text-red-600 transition-colors"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </span>
                </div>
              </div>

              <!-- 内容 -->
              <div>
                <div class="flex items-center justify-between mb-3">
                  <label class="block text-sm font-semibold text-gray-700">📝 文章内容</label>
                  <div class="flex items-center space-x-4 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    <span>📊 {{ wordCount }} 字</span>
                    <span>⏱️ {{ readingTime }} 分钟</span>
                  </div>
                </div>
                <textarea 
                  v-model="articleForm.content"
                  rows="20"
                  placeholder="请输入文章内容，支持Markdown格式...&#10;&#10;示例：&#10;# 标题&#10;## 子标题&#10;- 列表项&#10;1. 有序列表&#10;**粗体** *斜体* `代码`"
                  class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-sm leading-relaxed resize-none"
                />
              </div>

              <!-- 发布设置 -->
              <div class="border-t border-gray-200 pt-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Settings class="w-5 h-5 mr-2 text-blue-600" />
                  发布设置
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="flex items-center p-4 bg-gray-50 rounded-xl">
                    <input 
                      v-model="articleForm.isOriginal"
                      type="checkbox"
                      class="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label class="ml-3 text-sm font-medium text-gray-700">原创文章</label>
                  </div>
                  <div class="flex items-center p-4 bg-gray-50 rounded-xl">
                    <input 
                      v-model="articleForm.allowComments"
                      type="checkbox"
                      class="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label class="ml-3 text-sm font-medium text-gray-700">允许评论</label>
                  </div>
                  <div class="p-4 bg-gray-50 rounded-xl">
                    <label class="block text-sm font-medium text-gray-700 mb-2">发布时间</label>
                    <select 
                      v-model="articleForm.publishTime"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="now">⏰ 立即发布</option>
                      <option value="schedule">📅 定时发布</option>
                    </select>
                  </div>
                  <div v-if="articleForm.publishTime === 'schedule'" class="p-4 bg-gray-50 rounded-xl">
                    <label class="block text-sm font-medium text-gray-700 mb-2">定时时间</label>
                    <input 
                      v-model="articleForm.scheduleTime"
                      type="datetime-local"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div class="flex items-center justify-center space-x-4">
              <button 
                @click="copyContent"
                class="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200"
              >
                <Copy class="w-4 h-4 mr-2" />
                复制内容
              </button>
              <button 
                @click="importArticle"
                class="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200"
              >
                <Upload class="w-4 h-4 mr-2" />
                导入文章
              </button>
              <button 
                @click="exportArticle"
                class="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200"
              >
                <Download class="w-4 h-4 mr-2" />
                导出文章
              </button>
            </div>
          </div>
        </div>

        <!-- 右侧：平台选择 -->
        <div class="space-y-6">
          <!-- 平台选择 -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-semibold text-gray-900 flex items-center">
                <Globe class="w-5 h-5 mr-2 text-blue-600" />
                选择发布平台
              </h3>
              <div class="flex items-center space-x-2">
                <button 
                  @click="selectAllPlatforms"
                  class="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  全选
                </button>
                <span class="text-gray-300">|</span>
                <button 
                  @click="clearAllPlatforms"
                  class="text-sm text-gray-600 hover:text-gray-800 font-medium"
                >
                  清空
                </button>
              </div>
            </div>

            <div class="space-y-4">
                              <div 
                  v-for="(config, platform) in platformConfig" 
                  :key="platform"
                  class="platform-card p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg"
                  :class="`${
                    selectedPlatforms.includes(platform as CommunityType)
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  } ${!config.enabled ? 'opacity-50' : ''}`"
                >
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-sm">
                      <span class="text-xl">{{ config.icon }}</span>
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900 text-lg">{{ config.name }}</div>
                      <div class="text-sm text-gray-500">{{ config.description }}</div>
                      <div class="text-xs text-gray-400">@{{ config.account }}</div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <!-- 认证状态 -->
                    <div v-if="config.requiresAuth" class="flex items-center">
                      <div v-if="authStatus[platform as CommunityType]" class="text-green-600">
                        <CheckCircle class="w-5 h-5" />
                      </div>
                      <div v-else class="text-red-600">
                        <AlertCircle class="w-5 h-5" />
                      </div>
                    </div>
                    <!-- 选择状态 -->
                    <div v-if="selectedPlatforms.includes(platform as CommunityType)" class="text-blue-500">
                      <CheckCircle class="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <!-- 自动获取 Cookie -->
                <div v-if="config.requiresAuth && !authStatus[platform as CommunityType]" class="mb-4">
                  <button 
                    @click="autoGetCookies(platform as CommunityType)"
                    :disabled="cookieLoading[platform as CommunityType]"
                    class="w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-200 font-medium"
                  >
                    <div v-if="cookieLoading[platform as CommunityType]" class="flex items-center justify-center">
                      <div class="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      自动获取中...
                    </div>
                    <div v-else class="flex items-center justify-center">
                      <Cookie class="w-4 h-4 mr-2" />
                      自动获取 Cookie
                    </div>
                  </button>
                </div>

                <!-- 手动配置 Cookie -->
                <div v-if="config.requiresAuth && !authStatus[platform as CommunityType]" class="mb-4">
                  <div class="text-xs text-gray-600 mb-3">或手动配置 Cookie：</div>
                  <div class="space-y-2">
                    <div 
                      v-for="field in config.cookieFields" 
                      :key="field"
                      class="flex items-center space-x-2"
                    >
                      <input 
                        v-model="cookieConfigs[platform as CommunityType][field]"
                        type="text"
                        :placeholder="`${field} 值`"
                        class="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button 
                      @click="setCookieConfig(platform as CommunityType)"
                      class="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors"
                    >
                      <Cookie class="w-3 h-3 mr-1" />
                      手动配置
                    </button>
                  </div>
                </div>

                <!-- 清除认证 -->
                <div v-if="authStatus[platform as CommunityType]" class="mb-4">
                  <button 
                    @click="clearAuth(platform as CommunityType)"
                    class="w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg transition-colors"
                  >
                    清除认证
                  </button>
                </div>

                <!-- 平台选择按钮 -->
                <div class="flex items-center justify-between">
                  <button 
                    v-if="config.enabled && (!config.requiresAuth || authStatus[platform as CommunityType])"
                    @click="togglePlatform(platform as CommunityType)"
                    class="text-sm px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                    :class="selectedPlatforms.includes(platform as CommunityType)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                  >
                    {{ selectedPlatforms.includes(platform as CommunityType) ? '已选择' : '选择' }}
                  </button>
                  <div v-else class="text-xs text-gray-500">
                    {{ config.requiresAuth ? '需要认证' : '暂不支持' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 发布进度 -->
          <div v-if="publishStatus !== 'idle'" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Clock class="w-5 h-5 mr-2 text-blue-600" />
              发布进度
            </h3>
            
            <!-- 进度条 -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm text-gray-600 font-medium">发布进度</span>
                <span class="text-sm text-gray-600 font-medium">{{ Math.round(publishProgress) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  class="progress-bar bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                  :style="{ width: `${publishProgress}%` }"
                />
              </div>
            </div>

            <!-- 发布结果 -->
            <div class="space-y-3">
              <div 
                v-for="result in publishResults" 
                :key="result.platform"
                class="flex items-center justify-between p-4 rounded-xl border transition-all duration-200"
                :class="{
                  'border-green-200 bg-green-50': result.status === 'success',
                  'border-red-200 bg-red-50': result.status === 'error',
                  'border-gray-200 bg-gray-50': result.status === 'pending'
                }"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center">
                    <CheckCircle v-if="result.status === 'success'" class="w-5 h-5 text-green-600" />
                    <AlertCircle v-else-if="result.status === 'error'" class="w-5 h-5 text-red-600" />
                    <Clock v-else class="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">{{ platformConfig[result.platform as CommunityType]?.name }}</div>
                    <div class="text-sm text-gray-600">{{ result.message }}</div>
                  </div>
                </div>
                <a 
                  v-if="result.url && result.status === 'success'"
                  :href="result.url"
                  target="_blank"
                  class="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ExternalLink class="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 自定义动画 */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

/* 渐变背景动画 */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradient-shift 15s ease infinite;
}

/* 按钮悬停效果 */
button {
  transition: all 0.2s ease;
}

/* 输入框焦点效果 */
input:focus, textarea:focus, select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 平台卡片悬停效果 */
.platform-card {
  transition: all 0.2s ease;
}

.platform-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 进度条动画 */
.progress-bar {
  transition: width 0.3s ease;
}

/* 标签动画 */
.tag {
  animation: tag-appear 0.2s ease;
}

@keyframes tag-appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .space-x-3 > * + * {
    margin-left: 0.5rem;
  }
  
  .space-x-4 > * + * {
    margin-left: 0.75rem;
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style> 