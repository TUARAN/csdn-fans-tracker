import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FanData, Stats } from '@/types'
import dayjs from 'dayjs'

export const useFansStore = defineStore('fans', () => {
  // 状态
  const fanDataList = ref<FanData[]>([])
  const goals = ref<{ [date: string]: number }>({})

  // 计算属性
  const currentStats = computed((): Stats => {
    if (fanDataList.value.length === 0) {
      return {
        currentFans: 0,
        currentReads: 0,
        totalArticles: 0,
        monthlyGrowth: 0,
        weeklyGrowth: 0,
        dailyGrowth: 0
      }
    }

    const latest = fanDataList.value[fanDataList.value.length - 1]
    const previous = fanDataList.value[fanDataList.value.length - 2]
    
    const dailyGrowth = latest.dailyFansGrowth
    const weeklyGrowth = fanDataList.value
      .slice(-7)
      .reduce((sum, data) => sum + data.dailyFansGrowth, 0)
    const monthlyGrowth = fanDataList.value
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

  const setGoal = (date: string, targetGrowth: number) => {
    goals.value[date] = targetGrowth
    saveToLocalStorage()
  }

  const getGoal = (date: string) => {
    return goals.value[date] || 0
  }

  const importFromCSV = (csvData: string) => {
    const lines = csvData.split('\n')
    const headers = lines[0].split(',')
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',')
      if (values.length >= 4) {
        const data: FanData = {
          date: values[0].trim(),
          fansCount: parseInt(values[1]) || 0,
          readCount: parseInt(values[2]) || 0,
          articleCount: parseInt(values[3]) || 0,
          dailyFansGrowth: parseInt(values[4]) || 0,
          dailyReadGrowth: parseInt(values[5]) || 0
        }
        addFanData(data)
      }
    }
  }

  const exportToCSV = () => {
    const headers = ['日期', '粉丝数', '阅读量', '文章数', '日增粉丝', '日增阅读']
    const rows = fanDataList.value.map(data => [
      data.date,
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