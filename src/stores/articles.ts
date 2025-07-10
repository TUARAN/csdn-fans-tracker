import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Article, ArticleCategory } from '@/types'

export const useArticlesStore = defineStore('articles', () => {
  // 状态
  const articles = ref<Article[]>([])
  const selectedCategory = ref<ArticleCategory | 'all'>('all')

  // 计算属性
  const filteredArticles = computed(() => {
    if (selectedCategory.value === 'all') {
      return articles.value
    }
    return articles.value.filter(article => article.category === selectedCategory.value)
  })

  const articlesByCategory = computed(() => {
    const categories: ArticleCategory[] = ['面试题精选', 'AI 资源推荐', '技术成长', '大模型实战']
    const result: { [key in ArticleCategory]: Article[] } = {
      '面试题精选': [],
      'AI 资源推荐': [],
      '技术成长': [],
      '大模型实战': []
    }
    
    articles.value.forEach(article => {
      result[article.category].push(article)
    })
    
    return result
  })

  const categoryStats = computed(() => {
    const stats = {
      '面试题精选': 0,
      'AI 资源推荐': 0,
      '技术成长': 0,
      '大模型实战': 0
    }
    
    articles.value.forEach(article => {
      stats[article.category]++
    })
    
    return stats
  })

  const totalReads = computed(() => {
    return articles.value.reduce((sum, article) => sum + (article.readCount || 0), 0)
  })

  const totalLikes = computed(() => {
    return articles.value.reduce((sum, article) => sum + (article.likeCount || 0), 0)
  })

  // 方法
  const addArticle = (article: Omit<Article, 'id'>) => {
    const newArticle: Article = {
      ...article,
      id: Date.now().toString()
    }
    articles.value.push(newArticle)
    saveToLocalStorage()
  }

  const updateArticle = (id: string, updates: Partial<Article>) => {
    const index = articles.value.findIndex(article => article.id === id)
    if (index !== -1) {
      articles.value[index] = { ...articles.value[index], ...updates }
      saveToLocalStorage()
    }
  }

  const deleteArticle = (id: string) => {
    const index = articles.value.findIndex(article => article.id === id)
    if (index !== -1) {
      articles.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const setSelectedCategory = (category: ArticleCategory | 'all') => {
    selectedCategory.value = category
  }

  const getArticleById = (id: string) => {
    return articles.value.find(article => article.id === id)
  }

  const getArticlesByDate = (date: string) => {
    return articles.value.filter(article => article.publishDate === date)
  }

  // 本地存储
  const saveToLocalStorage = () => {
    localStorage.setItem('csdn-articles', JSON.stringify(articles.value))
  }

  const loadFromLocalStorage = () => {
    const savedArticles = localStorage.getItem('csdn-articles')
    if (savedArticles) {
      articles.value = JSON.parse(savedArticles)
    }
  }

  // 初始化时加载数据
  loadFromLocalStorage()

  // 如果没有数据，添加第一周创作思路文章
  if (articles.value.length === 0) {
    const sampleArticles: Article[] = [
      {
        id: '1',
        title: 'Vue3 面试高频陷阱全解析：这 8 个坑，90% 的人都踩过',
        publishDate: '2024-01-15',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/vue3-interview-traps',
        readCount: 15800,
        likeCount: 567,
        commentCount: 89
      },
      {
        id: '2',
        title: 'React 面试不再背八股文：Hooks、Context、性能调优一篇全会',
        publishDate: '2024-01-14',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/react-interview-guide',
        readCount: 14200,
        likeCount: 489,
        commentCount: 76
      },
      {
        id: '3',
        title: 'Vite 到底比 Webpack 快在哪？构建原理 + 面试答法全整理',
        publishDate: '2024-01-13',
        category: '技术成长',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/vite-vs-webpack',
        readCount: 12350,
        likeCount: 345,
        commentCount: 67
      },
      {
        id: '4',
        title: 'CSS 面试 50 问：写样式很溜，但原理你真的懂了吗？',
        publishDate: '2024-01-12',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/css-interview-50',
        readCount: 18900,
        likeCount: 678,
        commentCount: 134
      },
      {
        id: '5',
        title: '从手写 Promise 到 Event Loop：前端异步面试题全解读',
        publishDate: '2024-01-11',
        category: '技术成长',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/async-interview-guide',
        readCount: 16780,
        likeCount: 456,
        commentCount: 98
      },
      {
        id: '6',
        title: '你真的理解 Composition API 吗？Vue3 面试深水区全记录',
        publishDate: '2024-01-10',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/vue3-composition-deep',
        readCount: 14560,
        likeCount: 389,
        commentCount: 87
      },
      {
        id: '7',
        title: '前端性能优化 8 连问：面试官听完说"可以直接上项目了"',
        publishDate: '2024-01-09',
        category: '技术成长',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/frontend-performance',
        readCount: 20100,
        likeCount: 789,
        commentCount: 156
      },
      {
        id: '8',
        title: 'Node.js 面试进阶指南：模块机制、事件循环、性能调优实战答法',
        publishDate: '2024-01-08',
        category: '技术成长',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/nodejs-interview-advanced',
        readCount: 13450,
        likeCount: 423,
        commentCount: 78
      },
      {
        id: '9',
        title: 'BFC、Reflow、Stacking Context？CSS 排版三问搞懂浏览器渲染',
        publishDate: '2024-01-07',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/css-rendering-principles',
        readCount: 17890,
        likeCount: 567,
        commentCount: 112
      },
      {
        id: '10',
        title: '面试官说"你讲讲前端安全吧"，我从 XSS 到 CSP 都讲了',
        publishDate: '2024-01-06',
        category: '技术成长',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/frontend-security-guide',
        readCount: 15670,
        likeCount: 445,
        commentCount: 89
      }
    ]
    
    articles.value = sampleArticles
    saveToLocalStorage()
  }

  return {
    articles,
    selectedCategory,
    filteredArticles,
    articlesByCategory,
    categoryStats,
    totalReads,
    totalLikes,
    addArticle,
    updateArticle,
    deleteArticle,
    setSelectedCategory,
    getArticleById,
    getArticlesByDate
  }
}) 