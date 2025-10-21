// 文章分类
export type ArticleCategory = '面试文章' | '资源集合' | '热点文章' | '翻译文章' | '基础知识文章' | '技术热点'

// 文章数据
export interface Article {
  id: string
  title: string
  publishDate: string
  coverImage?: string
  category: ArticleCategory
  isAIGenerated: boolean
  csdnUrl: string
  readCount?: number
  likeCount?: number
  commentCount?: number
}

// 社区类型
export type CommunityType = 'csdn' | 'juejin' | 'toutiao' | 'zhihu' | '_51cto' | 'wechat' | 'weibo' | 'infoq' | 'xiaohongshu'

// 矩阵账号类型
export interface MatrixAccount {
  id: string
  name: string
  displayName: string
  description: string
  avatar: string
  themeColor: string
  status: 'active' | 'inactive'
  platforms: CommunityType[]
  isMain: boolean
}

// 账号数据统计
export interface AccountStats {
  totalFans: number
  totalReads: number
  totalArticles: number
  totalLikes: number
  weeklyGrowth: number
  monthlyGrowth: number
  platformStats: Record<CommunityType, PlatformStats>
}

// 平台统计数据
export interface PlatformStats {
  platform: CommunityType
  fans: number
  reads: number
  articles: number
  likes: number
  weeklyGrowth: number
  monthlyGrowth: number
  level: string
  url?: string
}

// 粉丝数据
export interface FanData {
  id: string
  date: string
  accountId: string
  community: CommunityType
  fansCount: number
  readCount: number
  articleCount: number
  likeCount: number
  dailyFansGrowth: number
  dailyReadGrowth: number
  dailyLikeGrowth: number
}

// 目标设置
export interface Goal {
  id: string
  date: string
  targetFansGrowth: number
  actualFansGrowth: number
  notes?: string
}

// 统计数据
export interface Stats {
  currentFans: number
  currentReads: number
  totalArticles: number
  monthlyGrowth: number
  weeklyGrowth: number
  dailyGrowth: number
  tags?: number | string
}

// 社区统计数据
export interface CommunityStats {
  csdn: Stats
  juejin: Stats
  toutiao: Stats
  zhihu: Stats
  _51cto: Stats
  wechat: Stats
  weibo: Stats
  infoq: Stats
  xiaohongshu: Stats
}

// 全网统计数据
export interface GlobalStats {
  totalFans: number
  totalReads: number
  totalArticles: number
  totalLikes: number
  totalAccounts: number
  activePlatforms: number
  accountStats: Record<string, AccountStats>
}

// 图表数据
export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor?: string
    backgroundColor?: string
  }[]
}

// 计划类型
export type PlanType = 'weekly' | 'monthly' | 'quarterly' | 'yearly'

// 计划状态
export type PlanStatus = 'planning' | 'in_progress' | 'completed' | 'overdue'

// 计划项目
export interface PlanItem {
  id: string
  title: string
  description: string
  status: PlanStatus
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  completedDate?: string
  tags: string[]
}

// 阶段总结
export interface WeeklySummary {
  id: string
  version: string // 版本号，如 v0.0.1
  weekStart: string
  weekEnd: string
  achievements: string[]
  challenges: string[]
  learnings: string[]
  nextWeekGoals: string[]
  metrics: {
    articlesPublished: number
    fansGrowth: number
    readGrowth: number
    engagementRate: number
  }
  notes: string
}

// 文章项目
export interface ArticleItem {
  id: string
  title: string
  description: string
  status: 'draft' | 'published' | 'planned'
  publishDate?: string
  readCount?: number
  likeCount?: number
  tags: string[]
}

// 写作计划
export interface WritingPlan {
  id: string
  title: string
  category: ArticleCategory
  outline: string[]
  targetPublishDate: string
  status: PlanStatus
  platforms: CommunityType[]
  estimatedReadTime: number
  keywords: string[]
  notes: string
  articles: ArticleItem[]
}

// 思考笔记
export interface ThoughtNote {
  id: string
  title: string
  content: string
  category: 'strategy' | 'content' | 'growth' | 'reflection'
  tags: string[]
  createdAt: string
  updatedAt: string
  relatedPlatforms: CommunityType[]
}

// 平台计划
export interface PlatformPlan {
  platform: CommunityType
  currentStatus: {
    fans: number
    reads: number
    articles: number
    level: string
  }
  goals: {
    shortTerm: string[]
    mediumTerm: string[]
    longTerm: string[]
  }
  strategies: string[]
  challenges: string[]
  opportunities: string[]
  weeklySummaries: WeeklySummary[]
  writingPlans: WritingPlan[]
  thoughtNotes: ThoughtNote[]
}