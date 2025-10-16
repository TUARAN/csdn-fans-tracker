<script setup lang="ts">
import { useFansStore } from '@/stores/fans'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { ExternalLink, Target } from 'lucide-vue-next'

const fansStore = useFansStore()

// 从store获取当前激活的账号
const activeAccount = computed(() => fansStore.currentSelectedAccount)

// 监听账号切换，这里可以添加响应逻辑
const switchAccount = (account: string) => {
  fansStore.switchSelectedAccount(account)
}

// 滚动监听
const handleScroll = () => {
  // 保留滚动监听功能，可能用于其他用途
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})


// 不同账号的平台数据
const accountPlatformData: Record<string, Record<string, { currentFans: number; currentReads: number; totalArticles: number; weeklyGrowth: number; username: string; tags: number | string }>> = {
  '安东尼漫长岁月': {
    csdn: { currentFans: 535, currentReads: 71725, totalArticles: 124, weeklyGrowth: 5, username: '安东尼漫长岁月', tags: 187 },
    juejin: { currentFans: 10871, currentReads: 2188696, totalArticles: 536, weeklyGrowth: 4, username: '安东尼漫长岁月', tags: 187 },
    toutiao: { currentFans: 2800, currentReads: 38000, totalArticles: 65, weeklyGrowth: 120, username: '安东尼漫长岁月', tags: 187 },
    zhihu: { currentFans: 1500, currentReads: 22000, totalArticles: 45, weeklyGrowth: 80, username: '三十而立方', tags: 187 },
    _51cto: { currentFans: 800, currentReads: 12000, totalArticles: 25, weeklyGrowth: 40, username: '安东尼漫长岁月', tags: '187微信' },
    infoq: { currentFans: 600, currentReads: 8000, totalArticles: 15, weeklyGrowth: 30, username: '安东尼漫长岁月', tags: 198 },
    wechat: { currentFans: 1200, currentReads: 18000, totalArticles: 35, weeklyGrowth: 60, username: '安东尼漫长岁月', tags: '187微信' },
    weibo: { currentFans: 400, currentReads: 6000, totalArticles: 20, weeklyGrowth: 25, username: '安东尼漫长岁月', tags: 198 }
  },
  '代码AI弗森': {
    csdn: { currentFans: 638, currentReads: 78249, totalArticles: 92, weeklyGrowth: 19, username: '代码AI弗森', tags: 198 },
    juejin: { currentFans: 0, currentReads: 0, totalArticles: 0, weeklyGrowth: 0, username: '代码AI弗森', tags: 198 },
    toutiao: { currentFans: 0, currentReads: 0, totalArticles: 0, weeklyGrowth: 0, username: '代码AI弗森', tags: 0 },
    zhihu: { currentFans: 0, currentReads: 0, totalArticles: 0, weeklyGrowth: 0, username: '代码AI弗森', tags: 0 },
    _51cto: { currentFans: 20, currentReads: 160000, totalArticles: 218, weeklyGrowth: 10, username: '代码AI弗森', tags: 0 },
    infoq: { currentFans: 0, currentReads: 0, totalArticles: 0, weeklyGrowth: 0, username: '代码AI弗森', tags: 0 },
    wechat: { currentFans: 3500, currentReads: 10000, totalArticles: 10, weeklyGrowth: 0, username: '前端周看', tags: 0 },
    weibo: { currentFans: 0, currentReads: 0, totalArticles: 0, weeklyGrowth: 0, username: '代码AI弗森', tags: 0 }
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
  { key: 'weibo', name: '微博', color: 'black', icon: '📱', homepage: 'https://weibo.com/anthony1453' },
  { key: 'xiaohongshu', name: '小红书', color: 'red', icon: '📖', homepage: 'https://www.xiaohongshu.com' }
]

// 掘金安东尼账号数据
const anthonyData = computed(() => {
  return {
    csdn: { 
      currentFans: fansStore.currentStats.csdn.currentFans, 
      currentReads: fansStore.currentStats.csdn.currentReads, 
      totalArticles: fansStore.currentStats.csdn.totalArticles, 
      weeklyGrowth: fansStore.currentStats.csdn.weeklyGrowth, 
      username: '掘金安东尼',
      tags: 187
    },
    juejin: { 
      currentFans: fansStore.currentStats.juejin.currentFans, 
      currentReads: fansStore.currentStats.juejin.currentReads, 
      totalArticles: fansStore.currentStats.juejin.totalArticles, 
      weeklyGrowth: fansStore.currentStats.juejin.weeklyGrowth, 
      username: '掘金安东尼',
      tags: 187
    },
    toutiao: { 
      currentFans: fansStore.currentStats.toutiao.currentFans, 
      currentReads: fansStore.currentStats.toutiao.currentReads, 
      totalArticles: fansStore.currentStats.toutiao.totalArticles, 
      weeklyGrowth: fansStore.currentStats.toutiao.weeklyGrowth, 
      username: '掘金安东尼',
      tags: 187
    },
    zhihu: { 
      currentFans: fansStore.currentStats.zhihu.currentFans, 
      currentReads: fansStore.currentStats.zhihu.currentReads, 
      totalArticles: fansStore.currentStats.zhihu.totalArticles, 
      weeklyGrowth: fansStore.currentStats.zhihu.weeklyGrowth, 
      username: '三十而立方',
      tags: 187
    },
    xiaohongshu: { 
      currentFans: 2400, 
      currentReads: 100000, 
      totalArticles: 50, 
      weeklyGrowth: 0, 
      username: '安东尼404',
      tags: 187
    },
    infoq: { 
      currentFans: fansStore.currentStats.infoq.currentFans, 
      currentReads: fansStore.currentStats.infoq.currentReads, 
      totalArticles: fansStore.currentStats.infoq.totalArticles, 
      weeklyGrowth: fansStore.currentStats.infoq.weeklyGrowth, 
      username: '掘金安东尼',
      tags: 198
    },
    wechat: { 
      currentFans: fansStore.currentStats.wechat.currentFans, 
      currentReads: fansStore.currentStats.wechat.currentReads, 
      totalArticles: fansStore.currentStats.wechat.totalArticles, 
      weeklyGrowth: fansStore.currentStats.wechat.weeklyGrowth, 
      username: '掘金安东尼',
      tags: '187微信'
    },
    weibo: { 
      currentFans: fansStore.currentStats.weibo.currentFans, 
      currentReads: fansStore.currentStats.weibo.currentReads, 
      totalArticles: fansStore.currentStats.weibo.totalArticles, 
      weeklyGrowth: fansStore.currentStats.weibo.weeklyGrowth, 
      username: '掘金安东尼',
      tags: 198
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

// 过滤有粉丝的平台并按粉丝量排序
const anthonyPlatformsWithFans = computed(() => {
  return platforms
    .filter(p => (anthonyData.value as any)[p.key]?.currentFans > 0)
    .sort((a, b) => {
      const fansA = (anthonyData.value as any)[a.key]?.currentFans || 0
      const fansB = (anthonyData.value as any)[b.key]?.currentFans || 0
      return fansB - fansA // 降序排序，粉丝多的在前
    })
})

const aifsPlatformsWithFans = computed(() => {
  return platforms
    .filter(p => (aifsData.value as any)[p.key]?.currentFans > 0)
    .sort((a, b) => {
      const fansA = (aifsData.value as any)[a.key]?.currentFans || 0
      const fansB = (aifsData.value as any)[b.key]?.currentFans || 0
      return fansB - fansA // 降序排序，粉丝多的在前
    })
})


// 跳转到平台主页
const goToHomepage = (url: string, accountName: string) => {
  // 如果是CSDN且是代码AI弗森账号，使用对应的链接
  if (url.includes('csdn.net') && accountName === '代码AI弗森') {
    window.open('https://blog.csdn.net/aifs2025?spm=1000.2115.3001.5343', '_blank')
  } else {
    window.open(url, '_blank')
  }
}

</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 主内容区域 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

      <!-- 掘金安东尼账号区块 -->
      <div v-if="activeAccount === '掘金安东尼'" class="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 border border-orange-200">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-orange-900 mb-2">👨‍💻 掘金安东尼</h2>
          <p class="text-orange-700">技术创作者 | 前端架构师</p>
        </div>
        
        <!-- 掘金安东尼总计面板 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div class="text-center mb-6">
            <h3 class="text-xl font-bold text-gray-900">数据总览</h3>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">总粉丝数</div>
                  <div class="text-2xl font-bold text-orange-600 mb-1">{{ formatNumber(anthonyTotalStats.fans) }}</div>
                  <div class="text-xs text-gray-500">累计关注者</div>
                </div>
              </div>
            </div>
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">总阅读量</div>
                  <div class="text-2xl font-bold text-yellow-600 mb-1">{{ formatNumber(anthonyTotalStats.reads) }}</div>
                  <div class="text-xs text-gray-500">内容曝光度</div>
                </div>
              </div>
            </div>
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">总文章数</div>
                  <div class="text-2xl font-bold text-amber-600 mb-1">{{ formatNumber(dedupedArticles(anthonyTotalStats.articles)) }}</div>
                  <div class="text-xs text-gray-500">文章数已去重</div>
                </div>
              </div>
            </div>
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">增长率</div>
                  <div class="text-2xl font-bold text-orange-700 mb-1">{{ calculateGrowthRate(anthonyTotalStats) }}</div>
                  <div class="text-xs text-gray-500">本周增长</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 掘金安东尼各平台面板 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="p in anthonyPlatformsWithFans" :key="`anthony-${p.key}`" 
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
                      {{ (anthonyData as any)[p.key]?.username || '安东尼漫长岁月' }}
                    </div>
                                    <div v-if="(anthonyData as any)[p.key]?.tags" class="text-xs text-blue-600 font-medium mt-1">
                  🏷️ {{ (anthonyData as any)[p.key]?.tags }}
                </div>
                  </div>
                </div>
              </div>
              
              <!-- 核心数据 -->
              <div class="grid grid-cols-3 gap-2 mb-3">
                <div class="text-center">
                  <div class="text-sm font-semibold text-gray-900">{{ formatNumber(((anthonyData as any)[p.key]?.currentFans) || 0) }}</div>
                  <div class="text-xs text-gray-500">粉丝</div>
                </div>
                <div class="text-center">
                  <div class="text-sm font-semibold text-gray-900">{{ formatNumber(((anthonyData as any)[p.key]?.currentReads) || 0) }}</div>
                  <div class="text-xs text-gray-500">阅读</div>
                </div>
                <div class="text-center">
                  <div class="text-sm font-semibold text-gray-900">{{ formatNumber(((anthonyData as any)[p.key]?.totalArticles) || 0) }}</div>
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
      <div v-if="activeAccount === '代码AI弗森'" class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-6 border border-amber-200">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-amber-900 mb-2">🤖 代码AI弗森</h2>
          <p class="text-amber-700">Vibe编程 | 大模型实践者</p>
        </div>
        
        <!-- 代码AI弗森总计面板 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div class="text-center mb-6">
            <h3 class="text-xl font-bold text-gray-900">数据总览</h3>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">总粉丝数</div>
                  <div class="text-2xl font-bold text-orange-600 mb-1">{{ formatNumber(aifsTotalStats.fans) }}</div>
                  <div class="text-xs text-gray-500">累计关注者</div>
                </div>
              </div>
            </div>
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">总阅读量</div>
                  <div class="text-2xl font-bold text-yellow-600 mb-1">{{ formatNumber(aifsTotalStats.reads) }}</div>
                  <div class="text-xs text-gray-500">内容曝光度</div>
                </div>
              </div>
            </div>
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">总文章数</div>
                  <div class="text-2xl font-bold text-amber-600 mb-1">{{ formatNumber(dedupedArticles(aifsTotalStats.articles)) }}</div>
                  <div class="text-xs text-gray-500">文章数已去重</div>
                </div>
              </div>
            </div>
            <div class="text-center transform hover:scale-105 transition-transform duration-200">
              <div class="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-4 mb-3 shadow-sm">
                <div class="text-gray-900">
                  <div class="text-sm font-semibold text-gray-700 mb-1">增长率</div>
                  <div class="text-2xl font-bold text-orange-700 mb-1">{{ calculateGrowthRate(aifsTotalStats) }}</div>
                  <div class="text-xs text-gray-500">本周增长</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 代码AI弗森各平台面板 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="p in aifsPlatformsWithFans" :key="`aifs-${p.key}`" 
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
                                    <div v-if="aifsData[p.key]?.tags" class="text-xs text-indigo-600 font-medium mt-1">
                  🏷️ {{ aifsData[p.key]?.tags }}
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
                        class="flex items-center text-orange-500 hover:text-orange-700 transition-colors">
                  <ExternalLink class="w-3 h-3 mr-1" />
                  访问主页
                </button>
                <router-link :to="`/plan/${p.key}/代码AI弗森`" 
                             :class="`flex items-center transition-colors ${
                               p.key === 'csdn' || p.key === 'juejin' 
                                 ? 'text-orange-600 hover:text-orange-800' 
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

/* 统一温暖色系配色 */
.warm-gradient {
  background: linear-gradient(135deg, #fed7aa 0%, #fde68a 100%);
}

.warm-card {
  background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%);
  border: 1px solid #fed7aa;
}
</style>