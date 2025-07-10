// 文章分类
export type ArticleCategory = '面试题精选' | 'AI 资源推荐' | '技术成长' | '大模型实战'

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
export type CommunityType = 'csdn' | 'juejin' | 'toutiao' | 'zhihu' | '_51cto' | 'wechat'

// 粉丝数据
export interface FanData {
  date: string
  community: CommunityType
  fansCount: number
  readCount: number
  articleCount: number
  dailyFansGrowth: number
  dailyReadGrowth: number
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
}

// 社区统计数据
export interface CommunityStats {
  csdn: Stats
  juejin: Stats
  toutiao: Stats
  zhihu: Stats
  _51cto: Stats
  wechat: Stats
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