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
    const categories: ArticleCategory[] = ['面试文章', '资源集合', '热点文章', '翻译文章', '基础知识文章']
    const result: { [key in ArticleCategory]: Article[] } = {
      '面试文章': [],
      '资源集合': [],
      '热点文章': [],
      '翻译文章': [],
      '基础知识文章': [],
      '技术热点': []
    }
    
    articles.value.forEach(article => {
      result[article.category].push(article)
    })
    
    return result
  })

  const categoryStats = computed(() => {
    const stats = {
      '面试文章': 0,
      '资源集合': 0,
      '热点文章': 0,
      '翻译文章': 0,
      '基础知识文章': 0,
      '技术热点': 0
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
        category: '面试文章',
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
        category: '面试文章',
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
        category: '基础知识文章',
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
        category: '面试文章',
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
        category: '基础知识文章',
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
        category: '面试文章',
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
        category: '基础知识文章',
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
        category: '基础知识文章',
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
        category: '面试文章',
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
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/frontend-security-guide',
        readCount: 15670,
        likeCount: 445,
        commentCount: 92
      },
      {
        id: '11',
        title: 'TypeScript 面试必问：类型体操、泛型约束、装饰器原理',
        publishDate: '2024-01-05',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/typescript-interview',
        readCount: 12340,
        likeCount: 378,
        commentCount: 67
      },
      {
        id: '12',
        title: '微前端架构面试题：从 qiankun 到 Module Federation',
        publishDate: '2024-01-04',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/micro-frontend-interview',
        readCount: 14560,
        likeCount: 456,
        commentCount: 89
      },
      {
        id: '13',
        title: 'Webpack 5 面试题：从配置到优化，从原理到实战',
        publishDate: '2024-01-03',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/webpack5-interview',
        readCount: 16780,
        likeCount: 523,
        commentCount: 98
      },
      {
        id: '14',
        title: 'React 18 新特性面试题：Concurrent Features 深度解析',
        publishDate: '2024-01-02',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/react18-concurrent',
        readCount: 18900,
        likeCount: 678,
        commentCount: 134
      },
      {
        id: '15',
        title: 'Vue3 响应式原理面试题：从 Proxy 到依赖收集',
        publishDate: '2024-01-01',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/vue3-reactivity',
        readCount: 20100,
        likeCount: 789,
        commentCount: 156
      },
      {
        id: '16',
        title: 'JavaScript 引擎面试题：V8 优化、垃圾回收、执行上下文',
        publishDate: '2023-12-31',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/javascript-engine',
        readCount: 17890,
        likeCount: 567,
        commentCount: 112
      },
      {
        id: '17',
        title: 'HTTP 面试题：从三次握手到 HTTPS，从缓存到跨域',
        publishDate: '2023-12-30',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/http-interview',
        readCount: 15670,
        likeCount: 445,
        commentCount: 92
      },
      {
        id: '18',
        title: '浏览器渲染原理面试题：从输入 URL 到页面显示',
        publishDate: '2023-12-29',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/browser-rendering',
        readCount: 12340,
        likeCount: 378,
        commentCount: 67
      },
      {
        id: '19',
        title: '算法面试题：从排序到动态规划，从链表到二叉树',
        publishDate: '2023-12-28',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/algorithm-interview',
        readCount: 14560,
        likeCount: 456,
        commentCount: 89
      },
      {
        id: '20',
        title: '设计模式面试题：从单例到观察者，从工厂到策略',
        publishDate: '2023-12-27',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/design-patterns',
        readCount: 16780,
        likeCount: 523,
        commentCount: 98
      },
      {
        id: '21',
        title: '数据库面试题：从索引到事务，从分库分表到读写分离',
        publishDate: '2023-12-26',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/database-interview',
        readCount: 18900,
        likeCount: 678,
        commentCount: 134
      },
      {
        id: '22',
        title: 'Redis 面试题：从数据结构到持久化，从集群到哨兵',
        publishDate: '2023-12-25',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/redis-interview',
        readCount: 20100,
        likeCount: 789,
        commentCount: 156
      },
      {
        id: '23',
        title: 'Docker 面试题：从镜像到容器，从网络到存储',
        publishDate: '2023-12-24',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/docker-interview',
        readCount: 17890,
        likeCount: 567,
        commentCount: 112
      },
      {
        id: '24',
        title: 'Kubernetes 面试题：从 Pod 到 Service，从 Deployment 到 Ingress',
        publishDate: '2023-12-23',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/kubernetes-interview',
        readCount: 15670,
        likeCount: 445,
        commentCount: 92
      },
      {
        id: '25',
        title: '微服务面试题：从服务发现到熔断降级，从配置中心到链路追踪',
        publishDate: '2023-12-22',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/microservices-interview',
        readCount: 12340,
        likeCount: 378,
        commentCount: 67
      },
      {
        id: '26',
        title: '消息队列面试题：从 RabbitMQ 到 Kafka，从 RocketMQ 到 Pulsar',
        publishDate: '2023-12-21',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/message-queue-interview',
        readCount: 14560,
        likeCount: 456,
        commentCount: 89
      },
      {
        id: '27',
        title: '分布式系统面试题：从 CAP 理论到一致性算法',
        publishDate: '2023-12-20',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/distributed-systems',
        readCount: 16780,
        likeCount: 523,
        commentCount: 98
      },
      {
        id: '28',
        title: 'Spring Boot 面试题：从自动配置到 AOP，从事务到缓存',
        publishDate: '2023-12-19',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/spring-boot-interview',
        readCount: 18900,
        likeCount: 678,
        commentCount: 134
      },
      {
        id: '29',
        title: 'MyBatis 面试题：从动态 SQL 到插件机制，从缓存到分页',
        publishDate: '2023-12-18',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/mybatis-interview',
        readCount: 20100,
        likeCount: 789,
        commentCount: 156
      },
      {
        id: '30',
        title: 'Elasticsearch 面试题：从倒排索引到分片，从聚合到集群',
        publishDate: '2023-12-17',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/elasticsearch-interview',
        readCount: 17890,
        likeCount: 567,
        commentCount: 112
      },
      {
        id: '31',
        title: 'MongoDB 面试题：从文档模型到索引，从聚合到分片',
        publishDate: '2023-12-16',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/mongodb-interview',
        readCount: 15670,
        likeCount: 445,
        commentCount: 92
      },
      {
        id: '32',
        title: 'Nginx 面试题：从反向代理到负载均衡，从缓存到限流',
        publishDate: '2023-12-15',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/nginx-interview',
        readCount: 12340,
        likeCount: 378,
        commentCount: 67
      },
      {
        id: '33',
        title: 'Linux 面试题：从进程管理到网络配置，从权限到服务',
        publishDate: '2023-12-14',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/linux-interview',
        readCount: 14560,
        likeCount: 456,
        commentCount: 89
      },
      {
        id: '34',
        title: 'Git 面试题：从分支管理到合并策略，从 rebase 到 cherry-pick',
        publishDate: '2023-12-13',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/git-interview',
        readCount: 16780,
        likeCount: 523,
        commentCount: 98
      },
      {
        id: '35',
        title: 'Jenkins 面试题：从流水线到插件，从构建到部署',
        publishDate: '2023-12-12',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/jenkins-interview',
        readCount: 18900,
        likeCount: 678,
        commentCount: 134
      },
      {
        id: '36',
        title: 'Maven 面试题：从依赖管理到生命周期，从插件到仓库',
        publishDate: '2023-12-11',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/maven-interview',
        readCount: 20100,
        likeCount: 789,
        commentCount: 156
      },
      {
        id: '37',
        title: 'Gradle 面试题：从构建脚本到依赖管理，从插件到任务',
        publishDate: '2023-12-10',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/gradle-interview',
        readCount: 17890,
        likeCount: 567,
        commentCount: 112
      },
      {
        id: '38',
        title: 'JVM 面试题：从内存模型到垃圾回收，从类加载到字节码',
        publishDate: '2023-12-09',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/jvm-interview',
        readCount: 15670,
        likeCount: 445,
        commentCount: 92
      },
      {
        id: '39',
        title: '多线程面试题：从线程安全到锁机制，从线程池到并发工具',
        publishDate: '2023-12-08',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/multithreading-interview',
        readCount: 12340,
        likeCount: 378,
        commentCount: 67
      },
      {
        id: '40',
        title: '网络编程面试题：从 Socket 到 NIO，从 Netty 到 WebSocket',
        publishDate: '2023-12-07',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/network-programming',
        readCount: 14560,
        likeCount: 456,
        commentCount: 89
      },
      {
        id: '41',
        title: '数据结构面试题：从数组到链表，从栈到队列，从树到图',
        publishDate: '2023-12-06',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/data-structures',
        readCount: 16780,
        likeCount: 523,
        commentCount: 98
      },
      {
        id: '42',
        title: '算法复杂度面试题：从时间复杂度到空间复杂度，从递归到动态规划',
        publishDate: '2023-12-05',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/algorithm-complexity',
        readCount: 18900,
        likeCount: 678,
        commentCount: 134
      },
      {
        id: '43',
        title: '机器学习面试题：从监督学习到无监督学习，从模型评估到特征工程',
        publishDate: '2023-12-04',
        category: '热点文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/machine-learning-interview',
        readCount: 20100,
        likeCount: 789,
        commentCount: 156
      },
      {
        id: '44',
        title: '深度学习面试题：从神经网络到 CNN，从 RNN 到 Transformer',
        publishDate: '2023-12-03',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/deep-learning-interview',
        readCount: 17890,
        likeCount: 567,
        commentCount: 112
      },
      {
        id: '45',
        title: '自然语言处理面试题：从词向量到 BERT，从文本分类到机器翻译',
        publishDate: '2023-12-02',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/nlp-interview',
        readCount: 15670,
        likeCount: 445,
        commentCount: 92
      },
      {
        id: '46',
        title: '计算机视觉面试题：从图像处理到目标检测，从分割到跟踪',
        publishDate: '2023-12-01',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/computer-vision',
        readCount: 12340,
        likeCount: 378,
        commentCount: 67
      },
      {
        id: '47',
        title: '推荐系统面试题：从协同过滤到深度学习，从排序到冷启动',
        publishDate: '2023-11-30',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/recommendation-systems',
        readCount: 14560,
        likeCount: 456,
        commentCount: 89
      },
      {
        id: '48',
        title: '大数据面试题：从 Hadoop 到 Spark，从 Hive 到 Flink',
        publishDate: '2023-11-29',
        category: '基础知识文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/big-data-interview',
        readCount: 16780,
        likeCount: 523,
        commentCount: 98
      },
      {
        id: '49',
        title: '云计算面试题：从虚拟化到容器化，从 IaaS 到 SaaS',
        publishDate: '2023-11-28',
        category: '面试文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/cloud-computing',
        readCount: 18900,
        likeCount: 678,
        commentCount: 134
      },
      {
        id: '50',
        title: '区块链面试题：从密码学到共识机制，从智能合约到 DeFi',
        publishDate: '2023-11-27',
        category: '热点文章',
        isAIGenerated: false,
        csdnUrl: 'https://blog.csdn.net/example/blockchain-interview',
        readCount: 20100,
        likeCount: 789,
        commentCount: 156
      }
    ]
    
    articles.value = originalArticles
    saveToLocalStorage()
  }

  return {
    // 状态
    articles,
    selectedCategory,
    
    // 计算属性
    filteredArticles,
    articlesByCategory,
    categoryStats,
    totalReads,
    totalLikes,
    
    // 方法
    addArticle,
    updateArticle,
    deleteArticle,
    setSelectedCategory,
    getArticleById,
    getArticlesByDate
  }
}) 