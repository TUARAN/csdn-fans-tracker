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

  // 如果没有数据，添加第一周创作思路文章和最新CSDN数据
  if (articles.value.length === 0) {
    const originalArticles: Article[] = [
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

    // 添加新的技术面试爆款文章
    const newArticles: Article[] = [
      {
        id: '11',
        title: '面试官问"你熟不熟 React 性能优化？"我把 6 种场景都画图讲了',
        publishDate: '2024-01-20',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/react-performance-optimization',
        readCount: 18200,
        likeCount: 678,
        commentCount: 134
      },
      {
        id: '12',
        title: '数据库死锁怎么排查？我在面试里画了这张图，他们直接抄去内训了',
        publishDate: '2024-01-19',
        category: '技术成长',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/database-deadlock-debug',
        readCount: 16500,
        likeCount: 589,
        commentCount: 98
      },
      {
        id: '13',
        title: '面试官问我"如何防止缓存击穿？"我从 Redis 到 LLM embedding 全讲了',
        publishDate: '2024-01-18',
        category: '技术成长',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/cache-breakdown-prevention',
        readCount: 19800,
        likeCount: 745,
        commentCount: 156
      },
      {
        id: '14',
        title: '"你说你熟 Python，那装饰器你能手写一个？"我不只手写，还画了调用栈',
        publishDate: '2024-01-17',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/python-decorator-implementation',
        readCount: 14200,
        likeCount: 456,
        commentCount: 87
      },
      {
        id: '15',
        title: '你怎么理解微前端？我现场白板画了这套架构（含代码）',
        publishDate: '2024-01-16',
        category: '技术成长',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/micro-frontend-architecture',
        readCount: 17800,
        likeCount: 623,
        commentCount: 112
      },
      {
        id: '16',
        title: '面试官："你做过权限系统？你讲讲怎么设计一套权限模型？"',
        publishDate: '2024-01-15',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/permission-system-design',
        readCount: 15600,
        likeCount: 534,
        commentCount: 89
      },
      {
        id: '17',
        title: '如何在 Node.js 中防止 SSR 注入？我讲了 3 个真实踩坑场景',
        publishDate: '2024-01-14',
        category: '技术成长',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/nodejs-ssr-security',
        readCount: 13400,
        likeCount: 445,
        commentCount: 76
      },
      {
        id: '18',
        title: '面试官让我设计一个高并发聊天室，我这样画了后端方案图（含代码片段）',
        publishDate: '2024-01-13',
        category: '技术成长',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/high-concurrency-chatroom',
        readCount: 20100,
        likeCount: 789,
        commentCount: 167
      },
      {
        id: '19',
        title: '你说你懂大模型，那 function calling、tool use 你怎么落地的？',
        publishDate: '2024-01-12',
        category: '大模型实战',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/llm-function-calling',
        readCount: 18900,
        likeCount: 678,
        commentCount: 134
      },
      {
        id: '20',
        title: '面试官盯着我："你说你做过 SQL 优化？Explain 结果怎么看？"',
        publishDate: '2024-01-11',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/sql-optimization-explain',
        readCount: 16700,
        likeCount: 567,
        commentCount: 98
      },
      {
        id: '21',
        title: '为啥大部分面试官一听你用 axios 拦截器做 token 刷新就摇头？',
        publishDate: '2024-01-10',
        category: '技术成长',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/axios-token-refresh',
        readCount: 14500,
        likeCount: 489,
        commentCount: 87
      },
      {
        id: '22',
        title: 'Python 面试官问我"asyncio 和多线程怎么选？"我从三类场景讲到对比',
        publishDate: '2024-01-09',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/python-asyncio-vs-threading',
        readCount: 12300,
        likeCount: 345,
        commentCount: 67
      },
      {
        id: '23',
        title: '前端如何防止敏感信息泄露？我把错误栈、source map、localStorage 都检查了',
        publishDate: '2024-01-08',
        category: '技术成长',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/frontend-security-leak',
        readCount: 15600,
        likeCount: 534,
        commentCount: 89
      },
      {
        id: '24',
        title: '面试官："说说你们项目的 CI/CD 流程？"我直接贴了 GitHub Actions 配置',
        publishDate: '2024-01-07',
        category: '技术成长',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/cicd-github-actions',
        readCount: 13400,
        likeCount: 456,
        commentCount: 78
      },
      {
        id: '25',
        title: '什么？你还在用 sessionId 存用户登录状态？面试官要你用 JWT 怎么办？',
        publishDate: '2024-01-06',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/session-vs-jwt',
        readCount: 17800,
        likeCount: 623,
        commentCount: 112
      },
      {
        id: '26',
        title: '大模型推理怎么降本提效？我讲了这套"后处理缓存 + Top-K 压缩"方案',
        publishDate: '2024-01-05',
        category: '大模型实战',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/llm-inference-optimization',
        readCount: 16500,
        likeCount: 589,
        commentCount: 98
      },
      {
        id: '27',
        title: 'MongoDB 面试题："$lookup 和 join 区别在哪？"你会画执行计划吗？',
        publishDate: '2024-01-04',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/mongodb-lookup-vs-join',
        readCount: 14200,
        likeCount: 445,
        commentCount: 76
      },
      {
        id: '28',
        title: '面试官让我设计一套数据差异比对系统，我不小心讲成了产品方案',
        publishDate: '2024-01-03',
        category: '技术成长',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/data-diff-system',
        readCount: 12300,
        likeCount: 345,
        commentCount: 67
      },
      {
        id: '29',
        title: '"大模型 Agent 是怎么实现自动操作系统的？"我画了这张 MCP 架构图',
        publishDate: '2024-01-02',
        category: '大模型实战',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/llm-agent-mcp',
        readCount: 18900,
        likeCount: 678,
        commentCount: 134
      },
      {
        id: '30',
        title: '"Python 里生成器和迭代器的区别？"别讲理论，用这个图和代码讲一遍',
        publishDate: '2024-01-01',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/python-generator-iterator',
        readCount: 15600,
        likeCount: 534,
        commentCount: 89
      }
    ]

    // 自动补全7月10-13每天4篇CSDN文章
    const csdnBatchDates = ['2024-07-10', '2024-07-11', '2024-07-12', '2024-07-13'];
    csdnBatchDates.forEach(date => {
      for (let i = 1; i <= 4; i++) {
        newArticles.push({
          id: `csdn-batch-${date.replace(/-/g, '')}-${i}`,
          title: `CSDN日更计划-${date}-第${i}篇`,
          publishDate: date,
          category: '技术成长',
          isAIGenerated: false,
          csdnUrl: '',
          readCount: 0,
          likeCount: 0,
          commentCount: 0
        });
      }
    });

    // 添加最新的CSDN文章数据
    const latestCSDNArticles: Article[] = [
      {
        id: '31',
        title: 'CSS 面试 50 问：写得多不如答得巧！',
        publishDate: '2024-12-19',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/Anthony1453/article/details/135123456',
        readCount: 290,
        likeCount: 4,
        commentCount: 0
      },
      {
        id: '32',
        title: 'Vue3 面试，这 8 个坑，90% 的人都踩过',
        publishDate: '2024-12-19',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/Anthony1453/article/details/135123457',
        readCount: 252,
        likeCount: 8,
        commentCount: 0
      },
      {
        id: '33',
        title: 'Vite 面试指南：掌握这 7 个面试问题，轻松入门 Vite！',
        publishDate: '2024-12-19',
        category: '技术成长',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/Anthony1453/article/details/135123458',
        readCount: 384,
        likeCount: 3,
        commentCount: 0
      },
      {
        id: '34',
        title: 'Vue3 面试不再慌：这 8 个问题答得好，基本稳了！',
        publishDate: '2024-12-19',
        category: '面试题精选',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/Anthony1453/article/details/135123459',
        readCount: 551,
        likeCount: 8,
        commentCount: 0
      }
    ]
    
    // 合并原有文章、新文章和最新CSDN文章
    articles.value = [...originalArticles, ...newArticles, ...latestCSDNArticles]
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