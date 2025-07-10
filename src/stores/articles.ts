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