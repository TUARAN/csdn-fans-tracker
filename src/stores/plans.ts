import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { 
  PlatformPlan, 
  WeeklySummary, 
  WritingPlan, 
  ThoughtNote, 
  CommunityType 
} from '@/types'

export const usePlansStore = defineStore('plans', () => {
  // 创建默认平台计划的辅助函数
  const createDefaultPlatformPlan = (platform: CommunityType): PlatformPlan => {
    return {
      platform,
      currentStatus: {
        fans: 0,
        reads: 0,
        articles: 0,
        level: '新用户'
      },
      goals: {
        shortTerm: ['建立账号基础', '发布相关内容', '积累初始粉丝'],
        mediumTerm: ['建立技术影响力', '开设专栏', '参与社区讨论'],
        longTerm: ['成为技术专家', '建立个人品牌', '影响更多开发者']
      },
      strategies: [
        '专注技术内容',
        '保持更新频率',
        '积极参与讨论',
        '建立专业形象'
      ],
      challenges: [
        '需要持续输出',
        '影响力建立需要时间',
        '竞争激烈'
      ],
      opportunities: [
        '技术氛围浓厚',
        '专家体系完善',
        '内容质量要求高'
      ],
      weeklySummaries: [],
      writingPlans: [],
      thoughtNotes: []
    }
  }

  // 平台计划数据 - 按账号和平台组织
  const platformPlans = ref<Record<string, Record<CommunityType, PlatformPlan>>>({
    '掘金安东尼': {
      csdn: {
        platform: 'csdn',
        currentStatus: {
          fans: 8500,
          reads: 1200000,
          articles: 150,
          level: 'CSDN专家'
        },
        goals: {
          shortTerm: ['粉丝数突破1万', '每周发布2-3篇高质量文章', '提升文章互动率'],
          mediumTerm: ['建立技术影响力', '开设技术专栏', '参与技术社区活动'],
          longTerm: ['成为CSDN技术专家', '建立个人品牌', '影响更多开发者']
        },
        strategies: [
          '专注高质量技术内容创作',
          '保持稳定的更新频率',
          '与读者积极互动',
          '关注技术热点和趋势'
        ],
        challenges: [
          '内容创作时间有限',
          '需要持续学习新技术',
          '竞争激烈，需要差异化'
        ],
        opportunities: [
          'AI技术快速发展',
          '技术社区活跃度高',
          '个人品牌建设机会'
        ],
        weeklySummaries: [
          {
            id: '1',
            weekStart: '2025-07-10',
            weekEnd: '2025-07-16',
            achievements: [
              'CSDN起号第一周，成功建立账号基础',
              '输出40+篇高质量技术文章',
              '设计并创建3个技术专栏',
              '阅读量突破2万，数据表现亮眼',
              '粉丝数稳步增长，建立初步影响力'
            ],
            challenges: [
              '粉丝数增长后期变缓慢，需要优化内容策略',
              '需要平衡创作速度与内容质量',
              '时间管理需要进一步优化',
              '需要建立更稳定的创作节奏'
            ],
            learnings: [
              '大模型结合个人构想的创作模式效果显著',
              '持续创作能带来正反馈，激发创作热情',
              '第一周的高激情状态需要转化为可持续的创作习惯',
              '数据真实性验证后，坚定了继续创作的信心'
            ],
            nextWeekGoals: [
              '设计系列文章，建立定时发布机制',
              '集中时间段完成创作，提高效率',
              '观察数据变化，优化发布策略',
              '重点发展四个方向：面试文章、工具集合、热点文章、基础知识系列'
            ],
            metrics: {
              articlesPublished: 40,
              fansGrowth: 115,
              readGrowth: 20000,
              engagementRate: 12.5
            },
            notes: 'CSDN起号第一周表现超出预期，虽然初期对数据真实性有所怀疑，但持续创作带来的正反馈坚定了继续创作的信心。本周激情充沛，结合大模型和个人构想输出了大量内容，为后续发展奠定了良好基础。下周需要将激情转化为可持续的创作习惯，设计系列文章并建立定时发布机制。'
          }
        ],
        writingPlans: [
          {
            id: '1',
            title: '面试文章',
            category: '面试文章',
            outline: [],
            targetPublishDate: '',
            status: 'planning',
            estimatedReadTime: 0,
            keywords: ['面试题', '前端开发'],
            notes: '面试相关文章',
            platforms: ['csdn'],
            articles: [
              {
                id: '1',
                title: '前端面试官最恨的10种CSS写法',
                description: '你的z-index为什么永远失效？',
                status: 'planned',
                tags: ['CSS', '前端', '面试']
              }
            ]
          }
        ],
        thoughtNotes: []
      },
      juejin: {
        platform: 'juejin',
        currentStatus: {
          fans: 3200,
          reads: 45000,
          articles: 85,
          level: '社区共建者'
        },
        goals: {
          shortTerm: ['提升文章质量', '增加粉丝数量', '参与技术讨论'],
          mediumTerm: ['建立技术影响力', '开设技术专栏', '参与平台活动'],
          longTerm: ['成为技术专家', '建立个人品牌', '影响更多开发者']
        },
        strategies: [
          '专注技术内容',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          '平台用户相对较少',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          '技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      toutiao: {
        platform: 'toutiao',
        currentStatus: {
          fans: 2800,
          reads: 38000,
          articles: 65,
          level: '头条创作者'
        },
        goals: {
          shortTerm: ['提升文章质量', '增加粉丝数量', '参与技术讨论'],
          mediumTerm: ['建立技术影响力', '开设技术专栏', '参与平台活动'],
          longTerm: ['成为技术专家', '建立个人品牌', '影响更多开发者']
        },
        strategies: [
          '专注技术内容',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          '平台用户相对较少',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          '技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      zhihu: {
        platform: 'zhihu',
        currentStatus: {
          fans: 1500,
          reads: 22000,
          articles: 45,
          level: '荣誉用户'
        },
        goals: {
          shortTerm: ['提升文章质量', '增加粉丝数量', '参与技术讨论'],
          mediumTerm: ['建立技术影响力', '开设技术专栏', '参与平台活动'],
          longTerm: ['成为技术专家', '建立个人品牌', '影响更多开发者']
        },
        strategies: [
          '专注技术内容',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          '平台用户相对较少',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          '技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      _51cto: {
        platform: '_51cto',
        currentStatus: {
          fans: 800,
          reads: 95000,
          articles: 30,
          level: '51CTO专家'
        },
        goals: {
          shortTerm: ['提升文章质量', '增加粉丝数量', '参与技术讨论'],
          mediumTerm: ['建立技术影响力', '开设技术专栏', '参与平台活动'],
          longTerm: ['成为技术专家', '建立个人品牌', '影响更多开发者']
        },
        strategies: [
          '专注技术内容',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          '平台用户相对较少',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          '技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      wechat: {
        platform: 'wechat',
        currentStatus: {
          fans: 1200,
          reads: 18000,
          articles: 35,
          level: '荣誉用户'
        },
        goals: {
          shortTerm: ['提升内容质量', '增加粉丝互动', '优化排版设计'],
          mediumTerm: ['建立内容特色', '提升影响力', '增加粉丝数量'],
          longTerm: ['成为优质公众号', '建立个人品牌', '获得更多收益']
        },
        strategies: [
          '专注原创内容',
          '保持更新频率',
          '与读者互动',
          '优化用户体验'
        ],
        challenges: [
          '内容创作压力大',
          '需要持续创新',
          '竞争激烈'
        ],
        opportunities: [
          '用户粘性高',
          '变现机会多',
          '内容形式丰富'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      segmentfault: {
        platform: 'segmentfault',
        currentStatus: {
          fans: 400,
          reads: 6000,
          articles: 20,
          level: '思否专家'
        },
        goals: {
          shortTerm: ['提升文章质量', '增加粉丝数量', '参与技术讨论'],
          mediumTerm: ['建立技术影响力', '开设技术专栏', '参与平台活动'],
          longTerm: ['成为技术专家', '建立个人品牌', '影响更多开发者']
        },
        strategies: [
          '专注技术内容',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          '平台用户相对较少',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          '技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      infoq: {
        platform: 'infoq',
        currentStatus: {
          fans: 600,
          reads: 8000,
          articles: 15,
          level: 'InfoQ专家'
        },
        goals: {
          shortTerm: ['提升文章质量', '增加粉丝数量', '参与技术讨论'],
          mediumTerm: ['建立技术影响力', '开设技术专栏', '参与平台活动'],
          longTerm: ['成为技术专家', '建立个人品牌', '影响更多开发者']
        },
        strategies: [
          '专注技术内容',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          '平台用户相对较少',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          '技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      }
    },
    '代码甜瓜': {
      csdn: {
        platform: 'csdn',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布AI编程相关内容', '积累初始粉丝'],
          mediumTerm: ['建立AI技术影响力', '开设AI编程专栏', '参与AI社区讨论'],
          longTerm: ['成为AI编程专家', '建立个人品牌', '影响更多AI开发者']
        },
        strategies: [
          '专注AI编程与大模型应用',
          '保持稳定的更新频率',
          '与AI开发者积极互动',
          '关注AI技术热点和趋势'
        ],
        challenges: [
          'AI技术发展快速，需要持续学习',
          '内容创作需要深度技术理解',
          '竞争激烈，需要差异化定位'
        ],
        opportunities: [
          'AI技术快速发展',
          'AI开发者社区活跃',
          'AI编程领域机会多'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      juejin: {
        platform: 'juejin',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布AI编程相关内容', '积累初始粉丝'],
          mediumTerm: ['建立AI技术影响力', '开设AI编程专栏', '参与AI社区讨论'],
          longTerm: ['成为AI编程专家', '建立个人品牌', '影响更多AI开发者']
        },
        strategies: [
          '专注AI编程与大模型应用',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          'AI技术发展快速',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          'AI技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      toutiao: {
        platform: 'toutiao',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布AI编程相关内容', '积累初始粉丝'],
          mediumTerm: ['建立AI技术影响力', '开设AI编程专栏', '参与AI社区讨论'],
          longTerm: ['成为AI编程专家', '建立个人品牌', '影响更多AI开发者']
        },
        strategies: [
          '专注AI编程与大模型应用',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          'AI技术发展快速',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          'AI技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      zhihu: {
        platform: 'zhihu',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布AI编程相关内容', '积累初始粉丝'],
          mediumTerm: ['建立AI技术影响力', '开设AI编程专栏', '参与AI社区讨论'],
          longTerm: ['成为AI编程专家', '建立个人品牌', '影响更多AI开发者']
        },
        strategies: [
          '专注AI编程与大模型应用',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          'AI技术发展快速',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          'AI技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      _51cto: {
        platform: '_51cto',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布AI编程相关内容', '积累初始粉丝'],
          mediumTerm: ['建立AI技术影响力', '开设AI编程专栏', '参与AI社区讨论'],
          longTerm: ['成为AI编程专家', '建立个人品牌', '影响更多AI开发者']
        },
        strategies: [
          '专注AI编程与大模型应用',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          'AI技术发展快速',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          'AI技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      wechat: {
        platform: 'wechat',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布AI编程相关内容', '积累初始粉丝'],
          mediumTerm: ['建立AI技术影响力', '开设AI编程专栏', '参与AI社区讨论'],
          longTerm: ['成为AI编程专家', '建立个人品牌', '影响更多AI开发者']
        },
        strategies: [
          '专注AI编程与大模型应用',
          '保持更新频率',
          '与读者互动',
          '优化用户体验'
        ],
        challenges: [
          'AI技术发展快速',
          '需要持续创新',
          '竞争激烈'
        ],
        opportunities: [
          '用户粘性高',
          '变现机会多',
          '内容形式丰富'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      segmentfault: {
        platform: 'segmentfault',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布AI编程相关内容', '积累初始粉丝'],
          mediumTerm: ['建立AI技术影响力', '开设AI编程专栏', '参与AI社区讨论'],
          longTerm: ['成为AI编程专家', '建立个人品牌', '影响更多AI开发者']
        },
        strategies: [
          '专注AI编程与大模型应用',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          'AI技术发展快速',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          'AI技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      infoq: {
        platform: 'infoq',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布AI编程相关内容', '积累初始粉丝'],
          mediumTerm: ['建立AI技术影响力', '开设AI编程专栏', '参与AI社区讨论'],
          longTerm: ['成为AI编程专家', '建立个人品牌', '影响更多AI开发者']
        },
        strategies: [
          '专注AI编程与大模型应用',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          'AI技术发展快速',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          'AI技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      }
    },
    '开发卡梅罗': {
      csdn: {
        platform: 'csdn',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布技术开发相关内容', '积累初始粉丝'],
          mediumTerm: ['建立技术影响力', '开设开发专栏', '参与技术社区讨论'],
          longTerm: ['成为技术开发专家', '建立个人品牌', '影响更多开发者']
        },
        strategies: [
          '专注技术开发与工程实践',
          '保持稳定的更新频率',
          '与开发者积极互动',
          '关注技术热点和趋势'
        ],
        challenges: [
          '技术发展快速，需要持续学习',
          '内容创作需要深度技术理解',
          '竞争激烈，需要差异化定位'
        ],
        opportunities: [
          '技术快速发展',
          '开发者社区活跃',
          '技术开发领域机会多'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      juejin: {
        platform: 'juejin',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布技术开发相关内容', '积累初始粉丝'],
          mediumTerm: ['建立技术影响力', '开设开发专栏', '参与技术社区讨论'],
          longTerm: ['成为技术开发专家', '建立个人品牌', '影响更多开发者']
        },
        strategies: [
          '专注技术开发与工程实践',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          '技术发展快速',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          '技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      toutiao: {
        platform: 'toutiao',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布技术开发相关内容', '积累初始粉丝'],
          mediumTerm: ['建立技术影响力', '开设开发专栏', '参与技术社区讨论'],
          longTerm: ['成为技术开发专家', '建立个人品牌', '影响更多开发者']
        },
        strategies: [
          '专注技术开发与工程实践',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          '技术发展快速',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          '技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      zhihu: {
        platform: 'zhihu',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布技术开发相关内容', '积累初始粉丝'],
          mediumTerm: ['建立技术影响力', '开设开发专栏', '参与技术社区讨论'],
          longTerm: ['成为技术开发专家', '建立个人品牌', '影响更多开发者']
        },
        strategies: [
          '专注技术开发与工程实践',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          '技术发展快速',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          '技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      _51cto: {
        platform: '_51cto',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布技术开发相关内容', '积累初始粉丝'],
          mediumTerm: ['建立技术影响力', '开设开发专栏', '参与技术社区讨论'],
          longTerm: ['成为技术开发专家', '建立个人品牌', '影响更多开发者']
        },
        strategies: [
          '专注技术开发与工程实践',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          '技术发展快速',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          '技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      wechat: {
        platform: 'wechat',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布技术开发相关内容', '积累初始粉丝'],
          mediumTerm: ['建立技术影响力', '开设开发专栏', '参与技术社区讨论'],
          longTerm: ['成为技术开发专家', '建立个人品牌', '影响更多开发者']
        },
        strategies: [
          '专注技术开发与工程实践',
          '保持更新频率',
          '与读者互动',
          '优化用户体验'
        ],
        challenges: [
          '技术发展快速',
          '需要持续创新',
          '竞争激烈'
        ],
        opportunities: [
          '用户粘性高',
          '变现机会多',
          '内容形式丰富'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      segmentfault: {
        platform: 'segmentfault',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布技术开发相关内容', '积累初始粉丝'],
          mediumTerm: ['建立技术影响力', '开设开发专栏', '参与技术社区讨论'],
          longTerm: ['成为技术开发专家', '建立个人品牌', '影响更多开发者']
        },
        strategies: [
          '专注技术开发与工程实践',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          '技术发展快速',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          '技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      },
      infoq: {
        platform: 'infoq',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布技术开发相关内容', '积累初始粉丝'],
          mediumTerm: ['建立技术影响力', '开设开发专栏', '参与技术社区讨论'],
          longTerm: ['成为技术开发专家', '建立个人品牌', '影响更多开发者']
        },
        strategies: [
          '专注技术开发与工程实践',
          '保持更新频率',
          '积极参与讨论',
          '建立专业形象'
        ],
        challenges: [
          '技术发展快速',
          '需要持续输出',
          '影响力建立需要时间'
        ],
        opportunities: [
          '技术氛围浓厚',
          '专家体系完善',
          '内容质量要求高'
        ],
        weeklySummaries: [],
        writingPlans: [],
        thoughtNotes: []
      }
    }
  })

  // 获取指定账号和平台的计划
  const getPlatformPlan = (platform: CommunityType, account: string = '掘金安东尼') => {
    if (!platformPlans.value[account]) {
      // 如果账号不存在，创建默认结构
      platformPlans.value[account] = {
        csdn: createDefaultPlatformPlan('csdn'),
        juejin: createDefaultPlatformPlan('juejin'),
        toutiao: createDefaultPlatformPlan('toutiao'),
        zhihu: createDefaultPlatformPlan('zhihu'),
        _51cto: createDefaultPlatformPlan('_51cto'),
        wechat: createDefaultPlatformPlan('wechat'),
        segmentfault: createDefaultPlatformPlan('segmentfault'),
        infoq: createDefaultPlatformPlan('infoq')
      }
    }
    return platformPlans.value[account][platform]
  }

  // 添加周总结
  const addWeeklySummary = (platform: CommunityType, summary: WeeklySummary, account: string = '掘金安东尼') => {
    const plan = getPlatformPlan(platform, account)
    plan.weeklySummaries.push(summary)
  }

  // 添加写作计划
  const addWritingPlan = (platform: CommunityType, plan: WritingPlan, account: string = '掘金安东尼') => {
    const platformPlan = getPlatformPlan(platform, account)
    platformPlan.writingPlans.push(plan)
  }

  // 添加思考笔记
  const addThoughtNote = (platform: CommunityType, note: ThoughtNote, account: string = '掘金安东尼') => {
    const platformPlan = getPlatformPlan(platform, account)
    platformPlan.thoughtNotes.push(note)
  }

  // 更新写作计划状态
  const updateWritingPlanStatus = (platform: CommunityType, planId: string, status: string, account: string = '掘金安东尼') => {
    const platformPlan = getPlatformPlan(platform, account)
    const plan = platformPlan.writingPlans.find(p => p.id === planId)
    if (plan) {
      plan.status = status as any
    }
  }

  // 获取所有平台的计划统计
  const getPlansStats = computed(() => {
    const stats = {
      totalWritingPlans: 0,
      totalThoughtNotes: 0,
      totalWeeklySummaries: 0,
      inProgressPlans: 0,
      completedPlans: 0
    }

    Object.values(platformPlans.value).forEach(accountPlans => {
      Object.values(accountPlans).forEach(plan => {
        stats.totalWritingPlans += plan.writingPlans.length
        stats.totalThoughtNotes += plan.thoughtNotes.length
        stats.totalWeeklySummaries += plan.weeklySummaries.length
        
        plan.writingPlans.forEach(wp => {
          if (wp.status === 'in_progress') stats.inProgressPlans++
          if (wp.status === 'completed') stats.completedPlans++
        })
      })
    })

    return stats
  })

  return {
    platformPlans,
    getPlatformPlan,
    addWeeklySummary,
    addWritingPlan,
    addThoughtNote,
    updateWritingPlanStatus,
    getPlansStats
  }
}) 