<script setup lang="ts">
import { ref } from 'vue'
import { 
  ExternalLink, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Key,
  Eye,
  EyeOff,
  Cookie
} from 'lucide-vue-next'
import type { CommunityType } from '@/types'

const expandedPlatforms = ref<Record<CommunityType, boolean>>({
  csdn: false,
  juejin: false,
  zhihu: false,
  toutiao: false,
  _51cto: false,
  segmentfault: false,
  wechat: false,
  infoq: false
})

const togglePlatform = (platform: CommunityType) => {
  expandedPlatforms.value[platform] = !expandedPlatforms.value[platform]
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const platformGuides = {
  csdn: {
    name: 'CSDN',
    icon: '📝',
    cookieFields: ['UserToken', 'access_token', 'session'],
    steps: [
      '1. 打开 CSDN 官网并登录',
      '2. 按 F12 打开开发者工具',
      '3. 进入 Application → Cookies → https://www.csdn.net',
      '4. 找到 UserToken 或 access_token 字段',
      '5. 复制对应的值到配置中'
    ],
    publishUrl: 'https://bizapi.csdn.net/blog-console-api/v3/mdeditor/saveArticle',
    cookieFormat: 'UserToken=xxxxx; access_token=xxxxx'
  },
  juejin: {
    name: '掘金',
    icon: '💎',
    cookieFields: ['sessionid', 'uid', 'token'],
    steps: [
      '1. 打开掘金官网并登录',
      '2. 按 F12 打开开发者工具',
      '3. 进入 Application → Cookies → https://juejin.cn',
      '4. 找到 sessionid、uid、token 字段',
      '5. 复制对应的值到配置中'
    ],
    publishUrl: 'https://api.juejin.cn/content_api/v1/article_draft/create',
    cookieFormat: 'sessionid=xxxxx; uid=xxxxx; token=xxxxx'
  },
  zhihu: {
    name: '知乎',
    icon: '🤔',
    cookieFields: ['z_c0', 'session_id', 'uid'],
    steps: [
      '1. 打开知乎官网并登录',
      '2. 按 F12 打开开发者工具',
      '3. 进入 Application → Cookies → https://www.zhihu.com',
      '4. 找到 z_c0、session_id、uid 字段',
      '5. 复制对应的值到配置中'
    ],
    publishUrl: 'https://www.zhihu.com/api/v4/articles',
    cookieFormat: 'z_c0=xxxxx; session_id=xxxxx; uid=xxxxx'
  },
  toutiao: {
    name: '头条',
    icon: '📰',
    cookieFields: ['sessionid', 'uid', 'token'],
    steps: [
      '1. 打开头条号官网并登录',
      '2. 按 F12 打开开发者工具',
      '3. 进入 Application → Cookies → https://mp.toutiao.com',
      '4. 找到 sessionid、uid、token 字段',
      '5. 复制对应的值到配置中'
    ],
    publishUrl: 'https://mp.toutiao.com/api/pc/feed/publish',
    cookieFormat: 'sessionid=xxxxx; uid=xxxxx; token=xxxxx'
  },
  _51cto: {
    name: '51CTO',
    icon: '💻',
    cookieFields: ['sessionid', 'uid', 'token'],
    steps: [
      '1. 打开51CTO官网并登录',
      '2. 按 F12 打开开发者工具',
      '3. 进入 Application → Cookies → https://blog.51cto.com',
      '4. 找到 sessionid、uid、token 字段',
      '5. 复制对应的值到配置中'
    ],
    publishUrl: 'https://blog.51cto.com/api/article/create',
    cookieFormat: 'sessionid=xxxxx; uid=xxxxx; token=xxxxx'
  },
  segmentfault: {
    name: '思否',
    icon: '🔍',
    cookieFields: ['sessionid', 'uid', 'token'],
    steps: [
      '1. 打开思否官网并登录',
      '2. 按 F12 打开开发者工具',
      '3. 进入 Application → Cookies → https://segmentfault.com',
      '4. 找到 sessionid、uid、token 字段',
      '5. 复制对应的值到配置中'
    ],
    publishUrl: 'https://segmentfault.com/api/articles',
    cookieFormat: 'sessionid=xxxxx; uid=xxxxx; token=xxxxx'
  },
  wechat: {
    name: '微信公众号',
    icon: '📱',
    cookieFields: ['sessionid', 'token'],
    steps: [
      '1. 需要微信公众平台开发者权限',
      '2. 获取 AppID 和 AppSecret',
      '3. 目前暂不支持直接发布',
      '4. 建议使用微信公众平台网页版'
    ],
    publishUrl: 'https://api.weixin.qq.com/cgi-bin/draft/add',
    cookieFormat: '需要开发者权限'
  },
  infoq: {
    name: 'InfoQ',
    icon: '📊',
    cookieFields: ['sessionid', 'token'],
    steps: [
      '1. 需要InfoQ邀请码',
      '2. 联系InfoQ编辑获取权限',
      '3. 目前暂不支持直接发布',
      '4. 建议通过官方渠道投稿'
    ],
    publishUrl: 'https://www.infoq.cn/api/article/create',
    cookieFormat: '需要邀请码'
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-lg font-medium text-gray-900">Cookie 获取指南</h3>
        <p class="text-sm text-gray-600 mt-1">参考 WeChatSync 项目，按照以下步骤获取各平台的 Cookie</p>
      </div>
      <div class="flex items-center space-x-2">
        <Cookie class="w-5 h-5 text-blue-600" />
        <span class="text-sm text-blue-600 font-medium">Cookie 指南</span>
      </div>
    </div>

    <!-- WeChatSync 项目说明 -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div class="flex items-start space-x-3">
        <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
          <span class="text-sm">📚</span>
        </div>
        <div>
          <h4 class="font-medium text-blue-900 mb-1">参考项目：WeChatSync</h4>
          <p class="text-sm text-blue-700 mb-2">
            本项目参考了 <a href="https://github.com/wechatsync/Wechatsync" target="_blank" class="underline hover:text-blue-900">WeChatSync</a> 项目的设计理念，
            使用 Cookie 模拟登录方式，支持一键同步文章到多个内容平台，包括 CSDN、掘金、知乎、头条等主流平台。
          </p>
          <p class="text-sm text-blue-600">
            WeChatSync 是一个成熟的浏览器插件，支持 20+ 个平台，本项目在此基础上进行了现代化改造。
          </p>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <div 
        v-for="(guide, platform) in platformGuides" 
        :key="platform"
        class="border border-gray-200 rounded-lg overflow-hidden"
      >
        <!-- 平台标题 -->
        <div 
          @click="togglePlatform(platform as CommunityType)"
          class="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <span class="text-sm">{{ guide.icon }}</span>
            </div>
            <div>
              <div class="font-medium text-gray-900">{{ guide.name }}</div>
              <div class="text-sm text-gray-500">点击查看详细步骤</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <ChevronDown v-if="expandedPlatforms[platform as CommunityType]" class="w-4 h-4 text-gray-500" />
            <ChevronRight v-else class="w-4 h-4 text-gray-500" />
          </div>
        </div>

        <!-- 详细步骤 -->
        <div v-if="expandedPlatforms[platform as CommunityType]" class="p-4 border-t border-gray-200">
          <div class="space-y-4">
            <!-- 步骤列表 -->
            <div>
              <h4 class="font-medium text-gray-900 mb-2">获取步骤：</h4>
              <div class="space-y-2">
                <div 
                  v-for="step in guide.steps" 
                  :key="step"
                  class="flex items-start space-x-2 text-sm text-gray-700"
                >
                  <span class="text-blue-600 font-medium">{{ step.split('.')[0] }}.</span>
                  <span>{{ step.split('.')[1] }}</span>
                </div>
              </div>
            </div>

            <!-- 需要的 Cookie 字段 -->
            <div>
              <h4 class="font-medium text-gray-900 mb-2">需要的 Cookie 字段：</h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="field in guide.cookieFields" 
                  :key="field"
                  class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-mono"
                >
                  {{ field }}
                </span>
              </div>
            </div>

            <!-- Cookie 格式示例 -->
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Cookie 格式示例：</h4>
              <div class="bg-gray-100 p-3 rounded-lg">
                <div class="flex items-center justify-between">
                  <code class="text-sm text-gray-800 font-mono break-all">{{ guide.cookieFormat }}</code>
                  <button 
                    @click="copyToClipboard(guide.cookieFormat)"
                    class="ml-2 p-1 text-gray-600 hover:text-gray-800"
                  >
                    <Copy class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- 发布接口 -->
            <div>
              <h4 class="font-medium text-gray-900 mb-2">发布接口：</h4>
              <div class="bg-gray-100 p-3 rounded-lg">
                <div class="flex items-center justify-between">
                  <code class="text-sm text-gray-800 font-mono break-all">{{ guide.publishUrl }}</code>
                  <button 
                    @click="copyToClipboard(guide.publishUrl)"
                    class="ml-2 p-1 text-gray-600 hover:text-gray-800"
                  >
                    <Copy class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- 注意事项 -->
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div class="flex items-start space-x-2">
                <AlertCircle class="w-4 h-4 text-yellow-600 mt-0.5" />
                <div class="text-sm text-yellow-800">
                  <strong>注意事项：</strong>
                  <ul class="mt-1 space-y-1">
                    <li>• Cookie 有效期有限，过期需要重新获取</li>
                    <li>• 请勿泄露 Cookie 信息，避免账号被盗</li>
                    <li>• 建议定期更新 Cookie 配置</li>
                    <li>• 如遇到发布失败，请检查 Cookie 是否有效</li>
                  </ul>
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
/* 自定义样式 */
</style>