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
  // 平台计划数据
  const platformPlans = ref<Record<CommunityType, PlatformPlan>>({
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
        },
        {
          id: '2',
          weekStart: '2025-07-17',
          weekEnd: '2025-07-23',
          achievements: [
            '粉丝数突破200，增长势头良好',
            '发布系列文章，建立内容体系',
            '文章质量进一步提升，获得更多收藏',
            '开始建立定时发布机制',
            '与读者互动增加，评论质量提升'
          ],
          challenges: [
            '创作时间仍然紧张，需要进一步优化',
            '系列文章的连贯性需要加强',
            '需要更多原创性内容，减少依赖AI',
            '数据增长需要更稳定的策略'
          ],
          learnings: [
            '系列文章比单篇文章更容易获得关注',
            '定时发布有助于建立读者习惯',
            '与读者互动能带来更多创作灵感',
            '原创内容虽然耗时，但价值更高'
          ],
          nextWeekGoals: [
            '完善系列文章体系',
            '增加原创性内容比例',
            '优化时间管理，提高创作效率',
            '加强与读者的互动交流'
          ],
          metrics: {
            articlesPublished: 25,
            fansGrowth: 85,
            readGrowth: 15000,
            engagementRate: 15.2
          },
          notes: '第二周开始建立更稳定的创作节奏，系列文章效果明显，粉丝增长和互动率都有提升。需要继续优化内容质量，增加原创性，建立更完善的创作体系。'
        },
        {
          id: '3',
          weekStart: '2025-07-24',
          weekEnd: '2025-07-30',
          achievements: [
            '粉丝数达到350+，增长稳定',
            '系列文章获得良好反响',
            '原创内容比例提升至60%',
            '建立了稳定的创作节奏',
            '开始获得平台推荐'
          ],
          challenges: [
            '需要保持高质量输出',
            '创作灵感需要持续补充',
            '时间管理仍有优化空间',
            '需要拓展更多内容方向'
          ],
          learnings: [
            '原创内容虽然耗时，但读者认可度高',
            '稳定的创作节奏比爆发式创作更有效',
            '平台推荐对增长帮助很大',
            '需要平衡数量和质量'
          ],
          nextWeekGoals: [
            '保持当前创作节奏',
            '拓展更多技术方向',
            '增加深度技术文章',
            '建立个人品牌形象'
          ],
          metrics: {
            articlesPublished: 20,
            fansGrowth: 150,
            readGrowth: 25000,
            engagementRate: 18.5
          },
          notes: '第三周数据表现优秀，原创内容策略见效，平台开始推荐。需要继续保持高质量输出，同时拓展更多技术方向，建立更全面的技术影响力。'
        }
      ],
      writingPlans: [
        {
          id: '1',
          title: '前端面试题精选系列（一）：JavaScript核心概念',
          category: '面试题精选',
          outline: [
            'JavaScript数据类型与类型转换',
            '作用域与闭包详解',
            '原型链与继承机制',
            '异步编程与Promise',
            '实际面试题解析'
          ],
          targetPublishDate: '2025-07-20',
          status: 'planning',
          estimatedReadTime: 12,
          keywords: ['JavaScript', '面试题', '前端开发', '核心概念'],
          notes: '系列文章第一篇，重点讲解JavaScript核心概念，为后续面试题系列奠定基础。',
          platforms: ['csdn']
        },
        {
          id: '2',
          title: '开发者必备工具集合：提升效率的利器',
          category: 'AI 资源推荐',
          outline: [
            '代码编辑器与IDE推荐',
            '调试与测试工具',
            '版本控制与协作工具',
            '性能监控与分析工具',
            'AI辅助开发工具'
          ],
          targetPublishDate: '2025-07-22',
          status: 'planning',
          estimatedReadTime: 15,
          keywords: ['开发工具', '效率提升', '程序员必备', '工具推荐'],
          notes: '整理个人使用过的优秀开发工具，帮助其他开发者提升工作效率。',
          platforms: ['csdn']
        },
        {
          id: '3',
          title: 'React 18新特性深度解析',
          category: '技术成长',
          outline: [
            'React 18概述与升级指南',
            'Concurrent Features详解',
            'Suspense与数据获取',
            '自动批处理机制',
            '实际项目应用案例'
          ],
          targetPublishDate: '2025-07-25',
          status: 'planning',
          estimatedReadTime: 18,
          keywords: ['React 18', '前端框架', '新特性', '技术解析'],
          notes: '结合热点技术，深入解析React 18的新特性，帮助开发者快速上手。',
          platforms: ['csdn']
        },
        {
          id: '4',
          title: 'CSS Grid布局完全指南',
          category: '技术成长',
          outline: [
            'Grid布局基础概念',
            '网格容器与网格项',
            '网格线命名与定位',
            '响应式Grid布局',
            '实际项目应用'
          ],
          targetPublishDate: '2025-07-28',
          status: 'planning',
          estimatedReadTime: 14,
          keywords: ['CSS Grid', '布局', '前端开发', '响应式'],
          notes: '基础知识系列文章，系统讲解CSS Grid布局，适合前端初学者。',
          platforms: ['csdn']
        }
      ],
      thoughtNotes: [
        {
          id: '1',
          title: 'CSDN起号第一周的经验总结',
          content: 'CSDN起号第一周的经验总结：\n\n**数据表现：**\n- 粉丝数：115（起号第一周）\n- 阅读量：突破2万\n- 文章数：40+篇\n- 专栏数：3个\n\n**关键发现：**\n1. 大模型结合个人构想的创作模式效果显著\n2. 持续创作能带来正反馈，激发创作热情\n3. 第一周的高激情状态需要转化为可持续的创作习惯\n4. 数据真实性验证后，坚定了继续创作的信心\n\n**下周策略：**\n- 设计系列文章，建立定时发布机制\n- 集中时间段完成创作，提高效率\n- 重点发展四个方向：面试文章、工具集合、热点文章、基础知识系列',
          category: 'reflection',
          tags: ['CSDN', '起号经验', '数据总结', '创作策略'],
          createdAt: '2025-07-16',
          updatedAt: '2025-07-16',
          relatedPlatforms: ['csdn']
        },
        {
          id: '2',
          title: 'CSDN平台运营策略深度分析',
          content: 'CSDN作为老牌技术社区，有其独特的优势：\n\n**平台优势：**\n- 用户基数大，技术氛围浓厚\n- SEO效果好，文章容易被搜索到\n- 有完善的专家体系\n- 推荐算法相对稳定\n\n**运营策略：**\n1. 保持高质量内容输出，建立专业形象\n2. 积极参与技术讨论，增加互动\n3. 利用好CSDN的推荐机制和标签系统\n4. 建立个人专家形象，提升影响力\n5. 设计系列文章，提高用户粘性\n\n**内容方向：**\n- 面试题精选：刚需内容，搜索量大\n- 工具集合：实用性强，容易获得收藏\n- 热点文章：时效性强，容易获得推荐\n- 基础知识系列：长尾内容，持续有价值',
          category: 'strategy',
          tags: ['CSDN', '运营策略', '技术社区', '内容规划'],
          createdAt: '2025-07-15',
          updatedAt: '2025-07-15',
          relatedPlatforms: ['csdn']
        },
        {
          id: '3',
          title: '技术写作的价值与意义',
          content: '技术写作不仅仅是分享知识，更是一种学习和成长的方式。通过写作，我们能够：\n\n**个人价值：**\n1. 梳理自己的知识体系，发现知识盲点\n2. 加深对技术的理解和记忆\n3. 提升表达能力和逻辑思维\n4. 建立个人品牌和影响力\n\n**社会价值：**\n1. 帮助其他开发者学习和成长\n2. 促进技术社区的交流和发展\n3. 推动技术的传播和应用\n\n**写作技巧：**\n- 结合大模型辅助创作，提高效率\n- 注重实用性和可操作性\n- 保持持续输出，建立创作习惯\n- 关注读者反馈，不断优化内容',
          category: 'reflection',
          tags: ['技术写作', '个人成长', '知识分享', '创作价值'],
          createdAt: '2025-07-14',
          updatedAt: '2025-07-14',
          relatedPlatforms: ['csdn']
        }
      ]
    },
    juejin: {
      platform: 'juejin',
      currentStatus: {
        fans: 3200,
        reads: 450000,
        articles: 80,
        level: '掘金7级'
      },
      goals: {
        shortTerm: ['升至掘金8级', '提升文章质量', '增加技术讨论参与'],
        mediumTerm: ['建立技术影响力', '开设技术专栏', '参与掘金活动'],
        longTerm: ['成为掘金技术专家', '建立个人品牌', '影响更多开发者']
      },
      strategies: [
        '专注前端技术内容',
        '保持高质量输出',
        '积极参与技术讨论',
        '关注技术趋势'
      ],
      challenges: [
        '内容创作时间有限',
        '需要持续学习新技术',
        '竞争激烈，需要差异化'
      ],
      opportunities: [
        '前端技术快速发展',
        '掘金社区活跃度高',
        '个人品牌建设机会'
      ],
      weeklySummaries: [],
      writingPlans: [],
      thoughtNotes: []
    },
    toutiao: {
      platform: 'toutiao',
      currentStatus: {
        fans: 1200,
        reads: 180000,
        articles: 45,
        level: '头条创作者'
      },
      goals: {
        shortTerm: ['提升内容质量', '增加粉丝互动', '优化发布策略'],
        mediumTerm: ['建立内容特色', '提升影响力', '参与平台活动'],
        longTerm: ['成为优质创作者', '建立个人品牌', '获得更多收益']
      },
      strategies: [
        '关注热点话题',
        '提升内容质量',
        '保持更新频率',
        '与读者互动'
      ],
      challenges: [
        '内容同质化严重',
        '算法推荐不稳定',
        '需要持续创新'
      ],
      opportunities: [
        '用户基数大',
        '变现机会多',
        '内容形式丰富'
      ],
      weeklySummaries: [],
      writingPlans: [],
      thoughtNotes: []
    },
    zhihu: {
      platform: 'zhihu',
      currentStatus: {
        fans: 2800,
        reads: 320000,
        articles: 60,
        level: '知乎7级'
      },
      goals: {
        shortTerm: ['升至知乎8级', '提升回答质量', '增加专栏文章'],
        mediumTerm: ['建立专业形象', '开设技术专栏', '参与知乎活动'],
        longTerm: ['成为知乎大V', '建立个人品牌', '影响更多用户']
      },
      strategies: [
        '专注技术问答',
        '保持高质量输出',
        '积极参与讨论',
        '建立专业形象'
      ],
      challenges: [
        '回答质量要求高',
        '需要深度思考',
        '竞争激烈'
      ],
      opportunities: [
        '用户质量高',
        '影响力大',
        '变现机会多'
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
        fans: 1500,
        reads: 85000,
        articles: 25,
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
        fans: 600,
        reads: 65000,
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
        fans: 400,
        reads: 45000,
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
  })

  // 获取指定平台的计划
  const getPlatformPlan = (platform: CommunityType) => {
    return platformPlans.value[platform]
  }

  // 添加周总结
  const addWeeklySummary = (platform: CommunityType, summary: WeeklySummary) => {
    platformPlans.value[platform].weeklySummaries.push(summary)
  }

  // 添加写作计划
  const addWritingPlan = (platform: CommunityType, plan: WritingPlan) => {
    platformPlans.value[platform].writingPlans.push(plan)
  }

  // 添加思考笔记
  const addThoughtNote = (platform: CommunityType, note: ThoughtNote) => {
    platformPlans.value[platform].thoughtNotes.push(note)
  }

  // 更新写作计划状态
  const updateWritingPlanStatus = (platform: CommunityType, planId: string, status: string) => {
    const plan = platformPlans.value[platform].writingPlans.find(p => p.id === planId)
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

    Object.values(platformPlans.value).forEach(plan => {
      stats.totalWritingPlans += plan.writingPlans.length
      stats.totalThoughtNotes += plan.thoughtNotes.length
      stats.totalWeeklySummaries += plan.weeklySummaries.length
      
      plan.writingPlans.forEach(wp => {
        if (wp.status === 'in_progress') stats.inProgressPlans++
        if (wp.status === 'completed') stats.completedPlans++
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