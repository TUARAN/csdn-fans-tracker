<script setup lang="ts">
import { useFansStore } from '@/stores/fans'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { ExternalLink, Target, Copy, Check } from 'lucide-vue-next'

const fansStore = useFansStore()
const showCopied = ref(false)
const isIntroCollapsed = ref(false)

// 滚动监听
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  isIntroCollapsed.value = scrollTop > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 不同账号的平台数据
const accountPlatformData: Record<string, Record<string, { currentFans: number; currentReads: number; totalArticles: number; weeklyGrowth: number; username: string }>> = {
  '安东尼漫长岁月': {
    csdn: { currentFans: 535, currentReads: 71725, totalArticles: 124, weeklyGrowth: 5, username: '安东尼漫长岁月' },
    juejin: { currentFans: 10871, currentReads: 2188696, totalArticles: 536, weeklyGrowth: 4, username: '安东尼漫长岁月' },
    toutiao: { currentFans: 2800, currentReads: 38000, totalArticles: 65, weeklyGrowth: 120, username: '安东尼漫长岁月' },
    zhihu: { currentFans: 1500, currentReads: 22000, totalArticles: 45, weeklyGrowth: 80, username: '三十而立方' },
    _51cto: { currentFans: 800, currentReads: 12000, totalArticles: 25, weeklyGrowth: 40, username: '安东尼漫长岁月' },
    infoq: { currentFans: 600, currentReads: 8000, totalArticles: 15, weeklyGrowth: 30, username: '安东尼漫长岁月' },
    wechat: { currentFans: 1200, currentReads: 18000, totalArticles: 35, weeklyGrowth: 60, username: '安东尼漫长岁月' },
    segmentfault: { currentFans: 400, currentReads: 6000, totalArticles: 20, weeklyGrowth: 25, username: '安东尼漫长岁月' }
  },
  '代码AI弗森': {
    csdn: { currentFans: 638, currentReads: 78249, totalArticles: 92, weeklyGrowth: 19, username: '代码AI弗森' },
    juejin: { currentFans: 0, currentReads: 0, totalArticles: 0, weeklyGrowth: 0, username: '代码AI弗森' },
    toutiao: { currentFans: 0, currentReads: 0, totalArticles: 0, weeklyGrowth: 0, username: '代码AI弗森' },
    zhihu: { currentFans: 0, currentReads: 0, totalArticles: 0, weeklyGrowth: 0, username: '代码AI弗森' },
    _51cto: { currentFans: 0, currentReads: 0, totalArticles: 0, weeklyGrowth: 0, username: '代码AI弗森' },
    infoq: { currentFans: 0, currentReads: 0, totalArticles: 0, weeklyGrowth: 0, username: '代码AI弗森' },
    wechat: { currentFans: 0, currentReads: 0, totalArticles: 0, weeklyGrowth: 0, username: '代码AI弗森' },
    segmentfault: { currentFans: 0, currentReads: 0, totalArticles: 0, weeklyGrowth: 0, username: '代码AI弗森' }
  }
}

const platforms: { 
  key: import('@/types').CommunityType; 
  name: string; 
  color: string; 
  icon: string;
  homepage: string;
}[] = [
  { key: 'csdn', name: 'CSDN', color: 'csdn-red', icon: '📝', homepage: 'https://blog.csdn.net/Anthony1453' },
  { key: 'juejin', name: '掘金', color: 'orange-500', icon: '💎', homepage: 'https://juejin.cn/user/1521379823340792' },
  { key: 'toutiao', name: '头条', color: 'black', icon: '📰', homepage: 'https://www.toutiao.com/c/user/token/CixsElNHkU9SqBXRGQJEufkWqwP0Bje2WqIrl4KnKLbcWnDDfYA44PkBxzIZbxpJCjwAAAAAAAAAAAAATz11eRsCdm0c3I-f9Mzp8EixSaljSiLIZP9fBCrQqaGNZ-GSMRYj2HVNlV3B-jkdJ1sQte_2DRjDxYPqBCIBA7vgaHk=/?' },
  { key: 'zhihu', name: '知乎', color: 'black', icon: '🤔', homepage: 'https://juejin.cn/user/1521379823340792' },
  { key: '_51cto', name: '51CTO', color: 'black', icon: '💻', homepage: 'https://juejin.cn/user/1521379823340792' },
  { key: 'infoq', name: 'InfoQ', color: 'black', icon: '📊', homepage: 'https://juejin.cn/user/1521379823340792' },
  { key: 'wechat', name: '微信公众号', color: 'black', icon: '📱', homepage: 'https://weixin.sogou.com/weixin?type=1&query=掘金安东尼' },
  { key: 'segmentfault', name: '思否', color: 'black', icon: '🔍', homepage: 'https://segmentfault.com/u/anthony1453' }
]

// 掘金安东尼账号数据
const anthonyData = computed(() => {
  return {
    csdn: { 
      currentFans: fansStore.currentStats.csdn.currentFans, 
      currentReads: fansStore.currentStats.csdn.currentReads, 
      totalArticles: fansStore.currentStats.csdn.totalArticles, 
      weeklyGrowth: fansStore.currentStats.csdn.weeklyGrowth, 
      username: '安东尼漫长岁月' 
    },
    juejin: { 
      currentFans: fansStore.currentStats.juejin.currentFans, 
      currentReads: fansStore.currentStats.juejin.currentReads, 
      totalArticles: fansStore.currentStats.juejin.totalArticles, 
      weeklyGrowth: fansStore.currentStats.juejin.weeklyGrowth, 
      username: '安东尼漫长岁月' 
    },
    toutiao: { 
      currentFans: fansStore.currentStats.toutiao.currentFans, 
      currentReads: fansStore.currentStats.toutiao.currentReads, 
      totalArticles: fansStore.currentStats.toutiao.totalArticles, 
      weeklyGrowth: fansStore.currentStats.toutiao.weeklyGrowth, 
      username: '安东尼漫长岁月' 
    },
    zhihu: { 
      currentFans: fansStore.currentStats.zhihu.currentFans, 
      currentReads: fansStore.currentStats.zhihu.currentReads, 
      totalArticles: fansStore.currentStats.zhihu.totalArticles, 
      weeklyGrowth: fansStore.currentStats.zhihu.weeklyGrowth, 
      username: '三十而立方' 
    },
    _51cto: { 
      currentFans: fansStore.currentStats._51cto.currentFans, 
      currentReads: fansStore.currentStats._51cto.currentReads, 
      totalArticles: fansStore.currentStats._51cto.totalArticles, 
      weeklyGrowth: fansStore.currentStats._51cto.weeklyGrowth, 
      username: '安东尼漫长岁月' 
    },
    infoq: { 
      currentFans: fansStore.currentStats.infoq.currentFans, 
      currentReads: fansStore.currentStats.infoq.currentReads, 
      totalArticles: fansStore.currentStats.infoq.totalArticles, 
      weeklyGrowth: fansStore.currentStats.infoq.weeklyGrowth, 
      username: '安东尼漫长岁月' 
    },
    wechat: { 
      currentFans: fansStore.currentStats.wechat.currentFans, 
      currentReads: fansStore.currentStats.wechat.currentReads, 
      totalArticles: fansStore.currentStats.wechat.totalArticles, 
      weeklyGrowth: fansStore.currentStats.wechat.weeklyGrowth, 
      username: '安东尼漫长岁月' 
    },
    segmentfault: { 
      currentFans: fansStore.currentStats.segmentfault.currentFans, 
      currentReads: fansStore.currentStats.segmentfault.currentReads, 
      totalArticles: fansStore.currentStats.segmentfault.totalArticles, 
      weeklyGrowth: fansStore.currentStats.segmentfault.weeklyGrowth, 
      username: '安东尼漫长岁月' 
    }
  }
})

// 代码AI弗森账号数据
const aifsData = computed(() => {
  return accountPlatformData['代码AI弗森']
})

// 计算账号总计数据
const calculateTotalStats = (accountData: any) => {
  let fans = 0, reads = 0, articles = 0, weekly = 0
  platforms.forEach(p => {
    const s = accountData[p.key] || { currentFans: 0, currentReads: 0, totalArticles: 0, weeklyGrowth: 0 }
    fans += s.currentFans
    reads += s.currentReads
    articles += s.totalArticles
    weekly += s.weeklyGrowth
  })
  return { fans, reads, articles, weekly }
}

// 掘金安东尼总计数据
const anthonyTotalStats = computed(() => calculateTotalStats(anthonyData.value))

// 代码AI弗森总计数据
const aifsTotalStats = computed(() => calculateTotalStats(aifsData.value))

// 计算去重后的总文章数
const dedupedArticles = (articles: number) => Math.round(articles * 0.6)

// 计算总增长率
const calculateGrowthRate = (stats: any) => {
  if (stats.fans === 0) return '0.0%'
  const rate = stats.weekly / stats.fans * 100
  return rate.toFixed(1) + '%'
}

const formatNumber = (num: number) => new Intl.NumberFormat('zh-CN').format(num)

// 跳转到平台主页
const goToHomepage = (url: string, accountName: string) => {
  // 如果是CSDN且是代码AI弗森账号，使用对应的链接
  if (url.includes('csdn.net') && accountName === '代码AI弗森') {
    window.open('https://blog.csdn.net/aifs2025?spm=1000.2115.3001.5343', '_blank')
  } else {
    window.open(url, '_blank')
  }
}

// 复制介绍内容
const copyIntro = async () => {
  const introText = `> 👨‍💻 大家好，我是安东尼漫长岁月，一位专注于 AI 编程、前端架构与数字产品打造的技术创作者。

> 🚀 我已经正式开启个人 IP 之路，网站上线 👉 tuaran.pages.dev

> 🧠 我会持续发布高质量干货内容，覆盖 Vue3 / Python / 大模型落地 / 工程化提升 / 技术创业 等方向。

> 🎁 如果你想进 抽奖群 / 技术群 / 副业群 一起交流成长，欢迎加我微信：atar24 

> 🪐 欢迎关注 + 收藏，一起探索程序员进阶的多维可能！`

  try {
    await navigator.clipboard.writeText(introText)
    showCopied.value = true
    setTimeout(() => {
      showCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto p-6 space-y-6">
      <!-- 个人介绍 - 带收缩效果 -->
      <div 
        class="bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 ease-in-out"
        :class="isIntroCollapsed ? 'p-2' : 'p-4'"
      >
        <div class="flex items-start justify-between">
          <div 
            class="text-gray-700 space-y-2 flex-1 transition-all duration-300"
            :class="isIntroCollapsed ? 'text-xs space-y-1' : 'text-sm space-y-2'"
          >
            <div v-show="!isIntroCollapsed">👨‍💻 大家好，我是安东尼漫长岁月，专注于 AI 编程、前端架构与数字产品打造的技术创作者。</div>
            <div v-show="!isIntroCollapsed">🚀 个人网站上线 👉 <a href="https://tuaran.pages.dev" target="_blank" class="text-blue-600 hover:text-blue-800">tuaran.pages.dev</a> | 涵盖前沿资讯、技术分享、副业创收等多元内容。</div>
            <div v-show="!isIntroCollapsed">🎁 欢迎加微信 <span class="font-mono text-gray-900">atar24</span> 进技术群交流，一起探索程序员进阶的多维可能！</div>
            <div v-show="isIntroCollapsed" class="font-semibold text-gray-900">👨‍💻 安东尼漫长岁月 - AI编程技术创作者</div>
          </div>
          <div class="flex items-center space-x-2">
            <button 
              @click="copyIntro"
              class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              :title="showCopied ? '已复制' : '复制介绍内容'"
            >
              <Check v-if="showCopied" class="w-4 h-4 text-green-600" />
              <Copy v-else class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- 掘金安东尼账号区块 -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-blue-900 mb-2">👨‍💻 安东尼漫长岁月</h2>
          <p class="text-blue-700">AI编程技术创作者 | 前端架构师</p>
        </div>
        
        <!-- 掘金安东尼总计面板 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div class="text-center mb-6">
            <h3 class="text-xl font-bold text-gray-900">数据总览</h3>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">总粉丝数</div>
                  <div class="text-2xl font-bold text-red-600 mb-1">{{ formatNumber(anthonyTotalStats.fans) }}</div>
                  <div class="text-xs text-gray-500">累计关注者</div>
                </div>
              </div>
            </div>
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">总阅读量</div>
                  <div class="text-2xl font-bold text-blue-600 mb-1">{{ formatNumber(anthonyTotalStats.reads) }}</div>
                  <div class="text-xs text-gray-500">内容曝光度</div>
                </div>
              </div>
            </div>
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">总文章数</div>
                  <div class="text-2xl font-bold text-green-600 mb-1">{{ formatNumber(dedupedArticles(anthonyTotalStats.articles)) }}</div>
                  <div class="text-xs text-gray-500">文章数已去重</div>
                </div>
              </div>
            </div>
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">增长率</div>
                  <div class="text-2xl font-bold text-purple-600 mb-1">{{ calculateGrowthRate(anthonyTotalStats) }}</div>
                  <div class="text-xs text-gray-500">本周增长</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 掘金安东尼各平台面板 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="p in platforms" :key="`anthony-${p.key}`" 
               class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div class="p-4">
              <!-- 平台头部 -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-2">
                    <span class="text-lg">{{ p.icon }}</span>
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-gray-900">{{ p.name }}</h4>
                                         <div class="text-xs text-gray-500">
                       {{ anthonyData[p.key]?.username || '安东尼漫长岁月' }}
                     </div>
                  </div>
                </div>
              </div>
              
              <!-- 核心数据 -->
              <div class="grid grid-cols-3 gap-2 mb-3">
                <div class="text-center">
                  <div class="text-sm font-semibold text-gray-900">{{ formatNumber((anthonyData[p.key]?.currentFans) || 0) }}</div>
                  <div class="text-xs text-gray-500">粉丝</div>
                </div>
                <div class="text-center">
                  <div class="text-sm font-semibold text-gray-900">{{ formatNumber((anthonyData[p.key]?.currentReads) || 0) }}</div>
                  <div class="text-xs text-gray-500">阅读</div>
                </div>
                <div class="text-center">
                  <div class="text-sm font-semibold text-gray-900">{{ formatNumber((anthonyData[p.key]?.totalArticles) || 0) }}</div>
                  <div class="text-xs text-gray-500">文章</div>
                </div>
              </div>

              <!-- 操作链接 -->
              <div class="flex items-center justify-between text-xs">
                <button @click="goToHomepage(p.homepage, '安东尼漫长岁月')" 
                        class="flex items-center text-red-500 hover:text-red-700 transition-colors">
                  <ExternalLink class="w-3 h-3 mr-1" />
                  访问主页
                </button>
                <router-link :to="`/plan/${p.key}/安东尼漫长岁月`" 
                             :class="`flex items-center transition-colors ${
                               p.key === 'csdn' || p.key === 'juejin' 
                                 ? 'text-blue-600 hover:text-blue-800' 
                                 : 'text-gray-400 cursor-not-allowed'
                             }`">
                  <Target class="w-3 h-3 mr-1" />
                  查看计划
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 代码AI弗森账号区块 -->
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-green-900 mb-2">🤖 代码AI弗森</h2>
          <p class="text-green-700">AI编程助手 | 技术内容创作者</p>
        </div>
        
        <!-- 代码AI弗森总计面板 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div class="text-center mb-6">
            <h3 class="text-xl font-bold text-gray-900">数据总览</h3>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">总粉丝数</div>
                  <div class="text-2xl font-bold text-red-600 mb-1">{{ formatNumber(aifsTotalStats.fans) }}</div>
                  <div class="text-xs text-gray-500">累计关注者</div>
                </div>
              </div>
            </div>
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">总阅读量</div>
                  <div class="text-2xl font-bold text-blue-600 mb-1">{{ formatNumber(aifsTotalStats.reads) }}</div>
                  <div class="text-xs text-gray-500">内容曝光度</div>
                </div>
              </div>
            </div>
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">总文章数</div>
                  <div class="text-2xl font-bold text-green-600 mb-1">{{ formatNumber(dedupedArticles(aifsTotalStats.articles)) }}</div>
                  <div class="text-xs text-gray-500">文章数已去重</div>
                </div>
              </div>
            </div>
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">增长率</div>
                  <div class="text-2xl font-bold text-purple-600 mb-1">{{ calculateGrowthRate(aifsTotalStats) }}</div>
                  <div class="text-xs text-gray-500">本周增长</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 代码AI弗森各平台面板 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="p in platforms" :key="`aifs-${p.key}`" 
               class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div class="p-4">
              <!-- 平台头部 -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-2">
                    <span class="text-lg">{{ p.icon }}</span>
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-gray-900">{{ p.name }}</h4>
                    <div class="text-xs text-gray-500">
                      {{ aifsData[p.key]?.username || '代码AI弗森' }}
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 核心数据 -->
              <div class="grid grid-cols-3 gap-2 mb-3">
                <div class="text-center">
                  <div class="text-sm font-semibold text-gray-900">{{ formatNumber((aifsData[p.key]?.currentFans) || 0) }}</div>
                  <div class="text-xs text-gray-500">粉丝</div>
                </div>
                <div class="text-center">
                  <div class="text-sm font-semibold text-gray-900">{{ formatNumber((aifsData[p.key]?.currentReads) || 0) }}</div>
                  <div class="text-xs text-gray-500">阅读</div>
                </div>
                <div class="text-center">
                  <div class="text-sm font-semibold text-gray-900">{{ formatNumber((aifsData[p.key]?.totalArticles) || 0) }}</div>
                  <div class="text-xs text-gray-500">文章</div>
                </div>
              </div>

              <!-- 操作链接 -->
              <div class="flex items-center justify-between text-xs">
                <button @click="goToHomepage(p.homepage, '代码AI弗森')" 
                        class="flex items-center text-red-500 hover:text-red-700 transition-colors">
                  <ExternalLink class="w-3 h-3 mr-1" />
                  访问主页
                </button>
                <router-link :to="`/plan/${p.key}/代码AI弗森`" 
                             :class="`flex items-center transition-colors ${
                               p.key === 'csdn' || p.key === 'juejin' 
                                 ? 'text-blue-600 hover:text-blue-800' 
                                 : 'text-gray-400 cursor-not-allowed'
                             }`">
                  <Target class="w-3 h-3 mr-1" />
                  查看计划
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-csdn-red { background: #F13C3C; }
.bg-orange-500 { background: #f97316; }
.text-csdn-red { color: #F13C3C; }
</style>