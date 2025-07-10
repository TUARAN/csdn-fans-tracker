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
      juejin: getStatsForCommunity('juejin')
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
    saveToLocalStorage()
  }

  const updateFanData = (date: string, data: Partial<FanData>) => {
    const index = fanDataList.value.findIndex(item => item.date === date)
    if (index !== -1) {
      fanDataList.value[index] = { ...fanDataList.value[index], ...data }
      saveToLocalStorage()
    }
  }

  const setGoal = (community: CommunityType, date: string, targetGrowth: number) => {
    if (!goals.value[community]) {
      goals.value[community] = {}
    }
    goals.value[community][date] = targetGrowth
    saveToLocalStorage()
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

  // 本地存储
  const saveToLocalStorage = () => {
    localStorage.setItem('csdn-fan-data', JSON.stringify(fanDataList.value))
    localStorage.setItem('csdn-goals', JSON.stringify(goals.value))
  }

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('csdn-fan-data')
    const savedGoals = localStorage.getItem('csdn-goals')
    
    if (savedData) {
      fanDataList.value = JSON.parse(savedData)
    }
    
    if (savedGoals) {
      goals.value = JSON.parse(savedGoals)
    }
  }

  // 初始化时加载数据
  loadFromLocalStorage()

  // 如果没有数据，添加最新的CSDN和掘金数据
  if (fanDataList.value.length === 0) {
    const today = dayjs().format('YYYY-MM-DD')
    
    // CSDN数据
    const csdnData: FanData = {
      date: today,
      community: 'csdn',
      fansCount: 16,
      readCount: 1477,
      articleCount: 34,
      dailyFansGrowth: 2,
      dailyReadGrowth: 1477
    }
    
    // 掘金数据（最新）
    const juejinData: FanData = {
      date: '2024-06-19',
      community: 'juejin',
      fansCount: 10589,
      readCount: 2143289,
      articleCount: 490,
      dailyFansGrowth: 9,
      dailyReadGrowth: 1755
    }
    
    fanDataList.value.push(csdnData, juejinData)
    saveToLocalStorage()
  } else {
    // 检查现有数据是否包含community字段，如果没有则添加
    const needsUpdate = fanDataList.value.some(data => !('community' in data))
    if (needsUpdate) {
      fanDataList.value = fanDataList.value.map(data => ({
        ...data,
        community: 'csdn' as CommunityType // 默认设置为CSDN
      }))
      saveToLocalStorage()
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
        dailyFansGrowth: 9,
        dailyReadGrowth: 1755
      })
      saveToLocalStorage()
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