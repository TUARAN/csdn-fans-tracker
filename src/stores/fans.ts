import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { 
  FanData, 
  Stats, 
  CommunityStats, 
  CommunityType, 
  MatrixAccount, 
  AccountStats, 
  PlatformStats, 
  GlobalStats 
} from '@/types'
import dayjs from 'dayjs'

export const useFansStore = defineStore('fans', () => {
  // 状态
  const fanDataList = ref<FanData[]>([])
  const goals = ref<{ [community: string]: { [date: string]: number } }>({
    csdn: {},
    juejin: {}
  })

  // 矩阵账号状态
  const activeMatrixAccount = ref('anthony')
  
  // 当前选中的账号（用于UI显示）
  const currentSelectedAccount = ref('掘金安东尼')

  // 矩阵账号数据
  const matrixAccounts = ref<MatrixAccount[]>([
    {
      id: 'anthony',
      name: '安东尼漫长岁月',
      displayName: '掘金安东尼',
      description: '主账号 - 技术创作者 | 前端架构师',
      avatar: '👨‍💻',
      themeColor: 'orange',
      status: 'active',
      platforms: ['csdn', 'juejin', 'toutiao', 'infoq', 'weibo'],
      isMain: true
    },
    {
      id: 'anthony404',
      name: '安东尼404',
      displayName: '安东尼404',
      description: '科技资讯发布 | 前沿技术分享',
      avatar: '🚀',
      themeColor: 'pink',
      status: 'active',
      platforms: ['xiaohongshu'],
      isMain: false
    },
    {
      id: 'frontend-weekly',
      name: '前端周看',
      displayName: '前端周看',
      description: '前端视野洞察 | 技术趋势分析',
      avatar: '🔍',
      themeColor: 'green',
      status: 'active',
      platforms: ['wechat'],
      isMain: false
    },
    {
      id: 'code-ai-frosen',
      name: '代码AI弗森',
      displayName: '代码AI弗森',
      description: 'Vibe编程 | 大模型实践者',
      avatar: '🤖',
      themeColor: 'amber',
      status: 'active',
      platforms: ['csdn', '_51cto'],
      isMain: false
    },
    {
      id: 'thirty-cube',
      name: '三十而立方',
      displayName: '三十而立方',
      description: '知乎专业运营 | 知识分享专家',
      avatar: '📚',
      themeColor: 'blue',
      status: 'active',
      platforms: ['zhihu'],
      isMain: false
    }
  ])

  // 当前选中的矩阵账号
  const currentMatrixAccount = computed(() => {
    return matrixAccounts.value.find(acc => acc.id === activeMatrixAccount.value) || matrixAccounts.value[0]
  })

  // 切换矩阵账号
  const switchMatrixAccount = (accountId: string) => {
    activeMatrixAccount.value = accountId
    const account = matrixAccounts.value.find(acc => acc.id === accountId)
    if (account) {
      currentSelectedAccount.value = account.displayName
    }
  }

  // 切换当前选中的账号
  const switchSelectedAccount = (accountName: string) => {
    currentSelectedAccount.value = accountName
    const account = matrixAccounts.value.find(acc => acc.displayName === accountName)
    if (account) {
      activeMatrixAccount.value = account.id
    }
  }

  // 获取指定账号的统计数据
  const getAccountStats = (accountId: string): AccountStats => {
    const accountData = fanDataList.value.filter(data => data.accountId === accountId)
    
    if (accountData.length === 0) {
      return {
        totalFans: 0,
        totalReads: 0,
        totalArticles: 0,
        weeklyGrowth: 0,
        monthlyGrowth: 0,
        platformStats: {} as Record<CommunityType, PlatformStats>
      }
    }

    const latestData = accountData[accountData.length - 1]
    const weeklyGrowth = accountData
      .slice(-7)
      .reduce((sum, data) => sum + data.dailyFansGrowth, 0)
    const monthlyGrowth = accountData
      .slice(-30)
      .reduce((sum, data) => sum + data.dailyFansGrowth, 0)

    const totalFans = accountData.reduce((sum, data) => sum + data.fansCount, 0)
    const totalReads = accountData.reduce((sum, data) => sum + data.readCount, 0)
    const totalArticles = accountData.reduce((sum, data) => sum + data.articleCount, 0)

    // 按平台统计
    const platformStats: Record<CommunityType, PlatformStats> = {} as any
    const platforms: CommunityType[] = ['csdn', 'juejin', 'toutiao', 'zhihu', '_51cto', 'wechat', 'weibo', 'infoq', 'xiaohongshu']
    
    platforms.forEach(platform => {
      const platformData = accountData.filter(data => data.community === platform)
      if (platformData.length > 0) {
        const latest = platformData[platformData.length - 1]
        platformStats[platform] = {
          platform,
          fans: latest.fansCount,
          reads: latest.readCount,
          articles: latest.articleCount,
          weeklyGrowth: platformData.slice(-7).reduce((sum, data) => sum + data.dailyFansGrowth, 0),
          monthlyGrowth: platformData.slice(-30).reduce((sum, data) => sum + data.dailyFansGrowth, 0),
          level: getLevelByFans(latest.fansCount)
        }
      }
    })

    return {
      totalFans,
      totalReads,
      totalArticles,
      weeklyGrowth,
      monthlyGrowth,
      platformStats
    }
  }

  // 根据粉丝数获取等级
  const getLevelByFans = (fans: number): string => {
    if (fans >= 10000) return '专家级'
    if (fans >= 5000) return '高级'
    if (fans >= 1000) return '中级'
    if (fans >= 100) return '初级'
    return '新用户'
  }

  // 当前账号的统计数据
  const currentStats = computed((): CommunityStats => {
    const getStatsForCommunity = (community: CommunityType): Stats => {
      const communityData = fanDataList.value.filter(
        data => data.community === community && data.accountId === activeMatrixAccount.value
      )
      
      if (communityData.length === 0) {
        return {
          currentFans: 0,
          currentReads: 0,
          totalArticles: 0,
          monthlyGrowth: 0,
          weeklyGrowth: 0,
          dailyGrowth: 0
        }
      }

      const latest = communityData[communityData.length - 1]
      const dailyGrowth = latest.dailyFansGrowth
      const weeklyGrowth = communityData
        .slice(-7)
        .reduce((sum, data) => sum + data.dailyFansGrowth, 0)
      const monthlyGrowth = communityData
        .slice(-30)
        .reduce((sum, data) => sum + data.dailyFansGrowth, 0)

      return {
        currentFans: latest.fansCount,
        currentReads: latest.readCount,
        totalArticles: latest.articleCount,
        monthlyGrowth,
        weeklyGrowth,
        dailyGrowth
      }
    }

    return {
      csdn: getStatsForCommunity('csdn'),
      juejin: getStatsForCommunity('juejin'),
      toutiao: getStatsForCommunity('toutiao'),
      zhihu: getStatsForCommunity('zhihu'),
      _51cto: getStatsForCommunity('_51cto'),
      wechat: getStatsForCommunity('wechat'),
      weibo: getStatsForCommunity('weibo'),
      infoq: getStatsForCommunity('infoq'),
      xiaohongshu: getStatsForCommunity('xiaohongshu')
    }
  })

  // 全网统计数据
  const globalStats = computed((): GlobalStats => {
    const accountStats: Record<string, AccountStats> = {}
    matrixAccounts.value.forEach(account => {
      accountStats[account.id] = getAccountStats(account.id)
    })

    const totalFans = Object.values(accountStats).reduce((sum, stats) => sum + stats.totalFans, 0)
    const totalReads = Object.values(accountStats).reduce((sum, stats) => sum + stats.totalReads, 0)
    const totalArticles = Object.values(accountStats).reduce((sum, stats) => sum + stats.totalArticles, 0)
    
    const activePlatforms = new Set()
    fanDataList.value.forEach(data => activePlatforms.add(data.community))

    return {
      totalFans,
      totalReads,
      totalArticles,
      totalAccounts: matrixAccounts.value.length,
      activePlatforms: activePlatforms.size,
      accountStats
    }
  })

  const chartData = computed(() => {
    const labels = fanDataList.value.map(data => dayjs(data.date).format('MM/DD'))
    const fansData = fanDataList.value.map(data => data.fansCount)
    const readsData = fanDataList.value.map(data => data.readCount)
    const articlesData = fanDataList.value.map(data => data.articleCount)

    return {
      labels,
      datasets: [
        {
          label: '粉丝数',
          data: fansData,
          borderColor: '#F13C3C',
          backgroundColor: 'rgba(241, 60, 60, 0.1)'
        },
        {
          label: '阅读量',
          data: readsData,
          borderColor: '#636E72',
          backgroundColor: 'rgba(99, 110, 114, 0.1)'
        },
        {
          label: '文章数',
          data: articlesData,
          borderColor: '#00B894',
          backgroundColor: 'rgba(0, 184, 148, 0.1)'
        }
      ]
    }
  })

  // 方法
  const addFanData = (data: FanData) => {
    // 确保数据包含必要的字段
    const fanData: FanData = {
      id: data.id || `${data.accountId}-${data.community}-${Date.now()}`,
      accountId: data.accountId,
      date: data.date,
      community: data.community,
      fansCount: data.fansCount,
      readCount: data.readCount,
      articleCount: data.articleCount,
      dailyFansGrowth: data.dailyFansGrowth,
      dailyReadGrowth: data.dailyReadGrowth
    }
    fanDataList.value.push(fanData)
  }

  const updateFanData = (date: string, data: Partial<FanData>) => {
    const index = fanDataList.value.findIndex(item => item.date === date)
    if (index !== -1) {
      fanDataList.value[index] = { ...fanDataList.value[index], ...data }
    }
  }

  const setGoal = (community: CommunityType, date: string, targetGrowth: number) => {
    if (!goals.value[community]) {
      goals.value[community] = {}
    }
    goals.value[community][date] = targetGrowth
  }

  const getGoal = (community: CommunityType, date: string) => {
    return goals.value[community]?.[date] || 0
  }

  const importFromCSV = (csvData: string, accountId: string = 'anthony') => {
    const lines = csvData.split('\n')
    const headers = lines[0].split(',')
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',')
      if (values.length >= 5) {
        const data: FanData = {
          id: `${accountId}-${values[1].trim()}-${Date.now()}-${i}`,
          accountId,
          date: values[0].trim(),
          community: values[1].trim() as CommunityType,
          fansCount: parseInt(values[2]) || 0,
          readCount: parseInt(values[3]) || 0,
          articleCount: parseInt(values[4]) || 0,
          dailyFansGrowth: parseInt(values[5]) || 0,
          dailyReadGrowth: parseInt(values[6]) || 0
        }
        addFanData(data)
      }
    }
  }

  const exportToCSV = () => {
    const headers = ['日期', '社区', '粉丝数', '阅读量', '文章数', '日增粉丝', '日增阅读']
    const rows = fanDataList.value.map(data => [
      data.date,
      data.community,
      data.fansCount,
      data.readCount,
      data.articleCount,
      data.dailyFansGrowth,
      data.dailyReadGrowth
    ])
    
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n')
    
    return csvContent
  }

  // 初始化数据
  if (fanDataList.value.length === 0) {
    const today = dayjs().format('YYYY-MM-DD')
    
    // 掘金安东尼账号数据
    const anthonyData: FanData[] = [
      {
        id: 'anthony-csdn-1',
        date: '2025-08-28',
        accountId: 'anthony',
        community: 'csdn',
        fansCount: 535,
        readCount: 71725,
        articleCount: 124,
        dailyFansGrowth: 5,
        dailyReadGrowth: 2061
      },
      {
        id: 'anthony-juejin-1',
        date: '2025-08-28',
        accountId: 'anthony',
        community: 'juejin',
        fansCount: 10871,
        readCount: 2188696,
        articleCount: 536,
        dailyFansGrowth: 4,
        dailyReadGrowth: 1486
      },
      {
        id: 'anthony-toutiao-1',
        date: today,
        accountId: 'anthony',
        community: 'toutiao',
        fansCount: 692,
        readCount: 120346,
        articleCount: 65,
        dailyFansGrowth: 40,
        dailyReadGrowth: 0
      },
      {
        id: 'anthony-infoq-1',
        date: '2025-07-14',
        accountId: 'anthony',
        community: 'infoq',
        fansCount: 12,
        readCount: 49479,
        articleCount: 15,
        dailyFansGrowth: 3,
        dailyReadGrowth: 0
      },
      {
        id: 'anthony-weibo-1',
        date: today,
        accountId: 'anthony',
        community: 'weibo',
        fansCount: 400,
        readCount: 6000,
        articleCount: 20,
        dailyFansGrowth: 5,
        dailyReadGrowth: 0
      }
    ]

    // 代码AI弗森账号数据
    const aifsData: FanData[] = [
      {
        id: 'aifs-csdn-1',
        date: today,
        accountId: 'code-ai-frosen',
        community: 'csdn',
        fansCount: 638,
        readCount: 78249,
        articleCount: 92,
        dailyFansGrowth: 8,
        dailyReadGrowth: 0
      },
      {
        id: 'aifs-51cto-1',
        date: today,
        accountId: 'code-ai-frosen',
        community: '_51cto',
        fansCount: 20,
        readCount: 160000,
        articleCount: 218,
        dailyFansGrowth: 2,
        dailyReadGrowth: 0
      }
    ]

    // 三十而立方账号数据
    const thirtyCubeData: FanData[] = [
      {
        id: 'thirty-zhihu-1',
        date: today,
        accountId: 'thirty-cube',
        community: 'zhihu',
        fansCount: 350,
        readCount: 350000,
        articleCount: 180,
        dailyFansGrowth: 15,
        dailyReadGrowth: 0
      }
    ]

    // 前端周看账号数据
    const frontendWeeklyData: FanData[] = [
      {
        id: 'weekly-wechat-1',
        date: today,
        accountId: 'frontend-weekly',
        community: 'wechat',
        fansCount: 3500,
        readCount: 10000,
        articleCount: 10,
        dailyFansGrowth: 20,
        dailyReadGrowth: 0
      }
    ]

    // 安东尼404账号数据
    const anthony404Data: FanData[] = [
      {
        id: '404-xiaohongshu-1',
        date: today,
        accountId: 'anthony404',
        community: 'xiaohongshu',
        fansCount: 2400,
        readCount: 100000,
        articleCount: 25,
        dailyFansGrowth: 30,
        dailyReadGrowth: 0
      }
    ]

    fanDataList.value.push(
      ...anthonyData,
      ...aifsData,
      ...thirtyCubeData,
      ...frontendWeeklyData,
      ...anthony404Data
    )
  }

  return {
    fanDataList,
    goals,
    currentStats,
    chartData,
    activeMatrixAccount,
    matrixAccounts,
    currentMatrixAccount,
    switchMatrixAccount,
    currentSelectedAccount,
    switchSelectedAccount,
    globalStats,
    getAccountStats,
    addFanData,
    updateFanData,
    setGoal,
    getGoal,
    importFromCSV,
    exportToCSV
  }
})