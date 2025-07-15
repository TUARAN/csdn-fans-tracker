import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FanData, Stats, CommunityStats, CommunityType } from '@/types'
import dayjs from 'dayjs'

export const useFansStore = defineStore('fans', () => {
  // 状态
  const fanDataList = ref<FanData[]>([])
  const goals = ref<{ [community: string]: { [date: string]: number } }>({
    csdn: {},
    juejin: {}
  })

  // 计算属性
  const currentStats = computed((): CommunityStats => {
    const getStatsForCommunity = (community: CommunityType): Stats => {
      const communityData = fanDataList.value.filter(data => data.community === community)
      
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
      segmentfault: getStatsForCommunity('segmentfault'),
      infoq: getStatsForCommunity('infoq')
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
    fanDataList.value.push(data)
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

  const importFromCSV = (csvData: string) => {
    const lines = csvData.split('\n')
    const headers = lines[0].split(',')
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',')
      if (values.length >= 5) {
        const data: FanData = {
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

  // 初始化数据（不再读写localStorage）
  if (fanDataList.value.length === 0) {
    const today = dayjs().format('YYYY-MM-DD')
    
    // CSDN数据
    const csdnData: FanData = {
      date: '2025-07-15',
      community: 'csdn',
      fansCount: 115,
      readCount: 18275,
      articleCount: 43,
      dailyFansGrowth: 36,
      dailyReadGrowth: 4971
    }
    
    // 掘金数据（最新）
    const juejinData: FanData = {
      date: '2024-06-19',
      community: 'juejin',
      fansCount: 10589,
      readCount: 2143289,
      articleCount: 490,
      dailyFansGrowth: 200,
      dailyReadGrowth: 1755
    }
    
    // 知乎数据
    const zhihuData: FanData = {
      date: today,
      community: 'zhihu',
      fansCount: 318,
      readCount: 346799,
      articleCount: 177,
      dailyFansGrowth: 30,
      dailyReadGrowth: 0
    }
    
    // 头条数据
    const toutiaoData: FanData = {
      date: today,
      community: 'toutiao',
      fansCount: 692,
      readCount: 120346,
      articleCount: 124,
      dailyFansGrowth: 40,
      dailyReadGrowth: 0
    }
    // 51CTO数据
    const _51ctoData: FanData = {
      date: today,
      community: '_51cto',
      fansCount: 20,
      readCount: 160000,
      articleCount: 218,
      dailyFansGrowth: 10,
      dailyReadGrowth: 0
    }
    
    // 思否数据
    const segmentfaultData: FanData = {
      date: today,
      community: 'segmentfault',
      fansCount: 0,
      readCount: 0,
      articleCount: 0,
      dailyFansGrowth: 0,
      dailyReadGrowth: 0
    }
    
    // InfoQ数据
    const infoqData: FanData = {
      date: '2025-07-14',
      community: 'infoq',
      fansCount: 12,
      readCount: 49479,
      articleCount: 115,
      dailyFansGrowth: 3,
      dailyReadGrowth: 0
    }
    
    fanDataList.value.push(csdnData, juejinData, zhihuData, toutiaoData, _51ctoData, segmentfaultData, infoqData)
  } else {
    // 检查现有数据是否包含community字段，如果没有则添加
    const needsUpdate = fanDataList.value.some(data => !('community' in data))
    if (needsUpdate) {
      fanDataList.value = fanDataList.value.map(data => ({
        ...data,
        community: 'csdn' as CommunityType // 默认设置为CSDN
      }))
    }
    // 自动补全掘金数据
    const hasJuejin = fanDataList.value.some(data => data.community === 'juejin')
    if (!hasJuejin) {
      fanDataList.value.push({
        date: '2024-06-19',
        community: 'juejin',
        fansCount: 10589,
        readCount: 2143289,
        articleCount: 490,
        dailyFansGrowth: 200,
        dailyReadGrowth: 1755
      })
    }
  }

  return {
    fanDataList,
    goals,
    currentStats,
    chartData,
    addFanData,
    updateFanData,
    setGoal,
    getGoal,
    importFromCSV,
    exportToCSV
  }
}) 