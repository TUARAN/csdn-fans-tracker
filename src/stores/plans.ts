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
    '安东尼漫长岁月': {
      csdn: {
        platform: 'csdn',
        currentStatus: {
          fans: 265,
          reads: 41583,
          articles: 72,
          level: '初级创作者'
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
            version: 'v0.0.1',
            weekStart: '2025-07-24',
            weekEnd: '2025-07-30',
            achievements: [
              '完成面试文章系列规划',
              '建立内容发布节奏',
              '初步积累读者群体',
              '成功发布35篇面试和技术文章',
              '累计获得120位粉丝关注',
              '总阅读量突破1.8万'
            ],
            challenges: [
              '面试文章竞争激烈',
              '内容同质化严重',
              '读者增长缓慢'
            ],
            learnings: [
              '面试文章虽然有需求但竞争激烈',
              '需要寻找差异化内容方向',
              '热点文章可能有更好的传播效果'
            ],
            nextWeekGoals: [
              '继续发布热点技术文章',
              '提升内容原创性',
              '增加互动性内容',
              '目标粉丝数突破200，阅读量突破3万',
              '优化文章质量和发布频率'
            ],
            metrics: {
               articlesPublished: 35,
               fansGrowth: 120,
               readGrowth: 18000,
               engagementRate: 0.12
             },
            notes: '第一阶段已取得显著成果，35篇文章获得120位粉丝关注，总阅读量1.8万，为后续发展奠定了坚实基础'
          },
          {
            id: '2',
            version: 'v0.0.2',
            weekStart: '2025-07-31',
            weekEnd: '2025-08-06',
            achievements: [
              '成功转型热点技术文章',
              '文章发布数量实现翻倍增长',
              '内容质量显著提升',
              '读者互动明显增加',
              '累计发布72篇技术文章（新增37篇）',
              '粉丝数达到265位（新增145位）',
              '总阅读量突破4.1万（新增2.3万）'
            ],
            challenges: [
              '更文频率有所降低',
              '数据增长速度趋于平缓',
              '热点把握需要更敏锐的嗅觉',
              '内容深度与时效性的平衡'
            ],
            learnings: [
              '热点文章确实比面试文章有更好的传播效果',
              '质量比数量更重要，精品内容更受欢迎',
              '技术热点需要快速响应和深度解析',
              '读者更喜欢有实际价值的技术分享'
            ],
            nextWeekGoals: [
              '建立热点技术监控机制',
              '优化内容创作流程',
              '提升文章发布效率',
              '加强与读者的互动交流',
              '目标粉丝数突破350，阅读量突破6万',
              '持续输出高质量技术内容'
            ],
            metrics: {
               articlesPublished: 37,
               fansGrowth: 145,
               readGrowth: 23583,
               engagementRate: 0.18
             },
            notes: '第二阶段成功转型热点文章，新增37篇文章，粉丝增长145位，阅读量增长2.3万，累计72篇文章获得265位粉丝关注，总阅读量4.1万，后续需要持续定时输出优质内容，保持技术敏感度'
          }
        ],
        writingPlans: [
          {
            id: '1',
            title: '前端面试文章系列',
            category: '面试文章',
            outline: [
              '基础知识面试题精选',
              '框架相关面试重点',
              '算法与数据结构',
              '项目经验分享',
              '面试技巧与心得'
            ],
            targetPublishDate: '2025-08-15',
            status: 'in_progress',
            estimatedReadTime: 8,
            keywords: ['前端面试', 'JavaScript', 'Vue', 'React', '面试题'],
            notes: '系统性整理前端面试知识点，帮助求职者提升面试成功率',
            platforms: ['csdn'],
            articles: [
              {
                id: '1',
                title: '前端面试官最恨的10种CSS写法',
                description: '你的z-index为什么永远失效？深度解析CSS常见陷阱',
                status: 'published',
                publishDate: '2025-07-15',
                readCount: 3200,
                likeCount: 156,
                tags: ['CSS', '前端', '面试', '最佳实践']
              },
              {
                id: '2',
                title: 'JavaScript闭包：99%的面试官都会问的问题',
                description: '从原理到实战，彻底搞懂闭包的前世今生',
                status: 'published',
                publishDate: '2025-07-18',
                readCount: 2800,
                likeCount: 142,
                tags: ['JavaScript', '闭包', '面试', '原理解析']
              },
              {
                id: '3',
                title: 'Vue3面试必考：Composition API vs Options API',
                description: '面试官最爱问的Vue3核心概念，一文搞定',
                status: 'published',
                publishDate: '2025-07-22',
                readCount: 2400,
                likeCount: 118,
                tags: ['Vue3', 'Composition API', '面试', '前端框架']
              },
              {
                id: '4',
                title: 'React Hooks面试题：从入门到精通',
                description: 'useState、useEffect、自定义Hook，面试必备知识点',
                status: 'published',
                publishDate: '2025-07-25',
                readCount: 2100,
                likeCount: 95,
                tags: ['React', 'Hooks', '面试', '状态管理']
              },
              {
                id: '5',
                title: '前端性能优化面试指南：从理论到实践',
                description: '性能优化不再是难题，面试官最爱问的优化策略',
                status: 'published',
                publishDate: '2025-07-28',
                readCount: 1900,
                likeCount: 87,
                tags: ['性能优化', '面试', '前端', 'Web性能']
              },
              {
                id: '6',
                title: 'TypeScript面试题精选：类型系统深度解析',
                description: '掌握TypeScript核心概念，轻松应对面试挑战',
                status: 'planned',
                tags: ['TypeScript', '类型系统', '面试', '静态类型']
              },
              {
                id: '7',
                title: '前端工程化面试必备：Webpack、Vite配置详解',
                description: '构建工具原理与实践，面试官最关心的工程化能力',
                status: 'planned',
                tags: ['工程化', 'Webpack', 'Vite', '面试']
              },
              {
                id: '8',
                title: '算法与数据结构：前端面试中的编程题解析',
                description: '常见算法题目与解题思路，提升编程面试通过率',
                status: 'planned',
                tags: ['算法', '数据结构', '面试', '编程题']
              }
            ]
          },
          {
            id: '2',
            title: '技术热点文章系列',
            category: '技术热点',
            outline: [
              '前端技术趋势分析',
              '新技术深度解读',
              '开源项目推荐',
              '行业动态追踪',
              '技术实践分享'
            ],
            targetPublishDate: '2025-08-20',
            status: 'in_progress',
            estimatedReadTime: 10,
            keywords: ['技术热点', '前端趋势', '新技术', '开源', '行业动态'],
            notes: '紧跟技术发展趋势，分享最新的技术动态和实践经验',
            platforms: ['csdn'],
            articles: [
              {
                id: '1',
                title: 'Vue 3.5正式发布！这些新特性让开发效率翻倍',
                description: 'Reactivity Transform、新的编译器优化，Vue 3.5带来的革命性变化',
                status: 'published',
                publishDate: '2025-08-01',
                readCount: 4200,
                likeCount: 198,
                tags: ['Vue3.5', '新特性', '技术热点', '前端框架']
              },
              {
                id: '2',
                title: 'React 19 Beta深度体验：Compiler让性能优化变得如此简单',
                description: 'React编译器如何自动优化组件性能，开发者再也不用手动优化',
                status: 'published',
                publishDate: '2025-08-03',
                readCount: 3800,
                likeCount: 176,
                tags: ['React19', 'Compiler', '性能优化', '技术热点']
              },
              {
                id: '3',
                title: 'Bun 1.1发布：比Node.js快3倍的JavaScript运行时',
                description: 'Bun的性能优势、生态兼容性，以及是否值得在生产环境使用',
                status: 'published',
                publishDate: '2025-08-05',
                readCount: 3200,
                likeCount: 145,
                tags: ['Bun', 'JavaScript运行时', '性能', '技术热点']
              },
              {
                id: '4',
                title: 'AI编程助手大比拼：GitHub Copilot vs Cursor vs Claude',
                description: '2025年最强AI编程工具对比，哪个最适合前端开发？',
                status: 'published',
                publishDate: '2025-08-08',
                readCount: 2900,
                likeCount: 132,
                tags: ['AI编程', 'GitHub Copilot', 'Cursor', '开发工具']
              },
              {
                id: '5',
                title: 'Vite 6.0即将发布：ESM优化与新的插件系统',
                description: 'Vite 6.0的重大更新，构建速度再次提升50%',
                status: 'published',
                publishDate: '2025-08-10',
                readCount: 2600,
                likeCount: 118,
                tags: ['Vite6', '构建工具', 'ESM', '技术热点']
              },
              {
                id: '6',
                title: 'WebAssembly在前端的新突破：性能提升10倍的图像处理',
                description: 'WASM技术在浏览器端的最新应用，前端性能的新边界',
                status: 'planned',
                tags: ['WebAssembly', 'WASM', '性能优化', '图像处理']
              },
              {
                id: '7',
                title: 'Deno 2.0正式发布：Node.js的真正竞争对手来了',
                description: 'Deno 2.0的重大改进，是否能撼动Node.js的地位？',
                status: 'planned',
                tags: ['Deno2', 'JavaScript运行时', 'Node.js', '技术对比']
              },
              {
                id: '8',
                title: '2025年前端状态管理新趋势：Zustand vs Jotai vs Valtio',
                description: '轻量级状态管理库的崛起，Redux时代即将结束？',
                status: 'planned',
                tags: ['状态管理', 'Zustand', 'Jotai', '前端架构']
              },
              {
                id: '9',
                title: 'CSS-in-JS的终结？原生CSS嵌套与容器查询的崛起',
                description: '现代CSS新特性如何改变前端样式开发模式',
                status: 'planned',
                tags: ['CSS', 'CSS-in-JS', '原生CSS', '样式开发']
              },
              {
                id: '10',
                title: 'Micro-frontends 2025：Single-SPA vs Module Federation vs Qiankun',
                description: '微前端架构的最新发展，大型项目的最佳实践',
                status: 'planned',
                tags: ['微前端', 'Single-SPA', 'Module Federation', '架构设计']
              }
            ]
          },
          {
            id: '3',
            title: '前端工具与资源集合',
            category: '资源集合',
            outline: [
              '开发工具推荐',
              '实用库与框架',
              '学习资源整理',
              '开发环境配置',
              '效率提升技巧'
            ],
            targetPublishDate: '2025-08-25',
            status: 'planning',
            estimatedReadTime: 6,
            keywords: ['前端工具', '开发效率', '资源集合', '最佳实践'],
            notes: '整理和推荐优质的前端开发工具和资源',
            platforms: ['csdn'],
            articles: [
              {
                id: '1',
                title: '2025年前端开发必备工具清单：提效50%的神器推荐',
                description: '从代码编辑器到调试工具，全方位提升开发效率',
                status: 'planned',
                tags: ['开发工具', '效率提升', '工具推荐', '前端开发']
              },
              {
                id: '2',
                title: '前端UI组件库大全：Ant Design vs Element Plus vs Chakra UI',
                description: '主流UI组件库对比分析，选择最适合你的项目',
                status: 'planned',
                tags: ['UI组件库', 'Ant Design', 'Element Plus', '组件设计']
              },
              {
                id: '3',
                title: '前端动画库推荐：Framer Motion vs Lottie vs GSAP',
                description: '打造炫酷动效，这些动画库你必须知道',
                status: 'planned',
                tags: ['动画库', 'Framer Motion', 'Lottie', 'GSAP']
              },
              {
                id: '4',
                title: 'VS Code插件精选：前端开发者的效率神器',
                description: '20个必装插件，让你的开发效率翻倍',
                status: 'planned',
                tags: ['VS Code', '插件推荐', '开发效率', '代码编辑器']
              }
            ]
          },
          {
            id: '4',
            title: '前端基础知识深度解析',
            category: '基础知识文章',
            outline: [
              'JavaScript核心概念',
              'CSS高级特性',
              'HTML5新特性',
              '浏览器原理',
              '网络协议基础'
            ],
            targetPublishDate: '2025-09-01',
            status: 'planning',
            estimatedReadTime: 12,
            keywords: ['前端基础', 'JavaScript', 'CSS', 'HTML5', '浏览器原理'],
            notes: '深入浅出讲解前端基础知识，帮助开发者夯实基础',
            platforms: ['csdn'],
            articles: [
              {
                id: '1',
                title: 'JavaScript执行机制深度解析：从编译到执行',
                description: 'V8引擎如何执行JavaScript代码，执行上下文与作用域链',
                status: 'planned',
                tags: ['JavaScript', '执行机制', 'V8引擎', '基础知识']
              },
              {
                id: '2',
                title: 'CSS盒模型与布局原理：从标准盒模型到Flexbox',
                description: '深入理解CSS布局机制，掌握现代布局技术',
                status: 'planned',
                tags: ['CSS', '盒模型', 'Flexbox', '布局原理']
              },
              {
                id: '3',
                title: '浏览器渲染原理：从HTML解析到页面绘制',
                description: '浏览器如何将代码转换为用户看到的页面',
                status: 'planned',
                tags: ['浏览器原理', '渲染机制', '性能优化', '基础知识']
              },
              {
                id: '4',
                title: 'HTTP协议详解：从请求到响应的完整过程',
                description: '深入理解HTTP协议，掌握前后端通信原理',
                status: 'planned',
                tags: ['HTTP协议', '网络通信', 'Web基础', '协议原理']
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
        writingPlans: [
          {
            id: '1',
            title: '热点技术文章',
            category: '技术热点',
            outline: [],
            targetPublishDate: '',
            status: 'planning',
            estimatedReadTime: 0,
            keywords: ['技术热点', '前端开发', '最新技术'],
            notes: '关注技术热点，快速响应行业动态',
            platforms: ['juejin'],
            articles: [
              {
                id: '1',
                title: 'Vue 3.5 正式发布！这些新特性你必须知道',
                description: '深度解析 Vue 3.5 的重要更新和实际应用',
                status: 'planned',
                tags: ['Vue', '前端', '技术热点']
              },
              {
                id: '2',
                title: 'React 19 Beta 来了！Compiler 让性能优化变得如此简单',
                description: 'React 19 编译器如何革命性地改变开发体验',
                status: 'planned',
                tags: ['React', '性能优化', '编译器']
              },
              {
                id: '3',
                title: 'TypeScript 5.6 发布：这个新功能让类型推断更智能',
                description: 'TypeScript 最新版本的核心特性详解',
                status: 'planned',
                tags: ['TypeScript', '类型系统', '开发工具']
              }
            ]
          }
        ],
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
        weeklySummaries: [
          {
            id: '0',
            version: 'v0.0.1',
            weekStart: '2025-07-01',
            weekEnd: '2025-07-14',
            achievements: [
              '矩阵账号第一阶段成功启动，建立账号基础设施',
              '累计发布接近50篇高质量大模型相关文章',
              '阅读量突破3.5万，数据表现与主账号相当',
              '粉丝数接近300，初步建立技术影响力',
              '全面拥抱AI写作，探索大模型辅助创作模式'
            ],
            challenges: [
              '完全依赖GPT-4o写作，内容风格相对单一',
              '大模型文章竞争激烈，需要寻找差异化定位',
              '创作效率虽高但缺乏个人特色',
              '需要平衡AI辅助与原创思考的比例'
            ],
            learnings: [
              'GPT-4o在技术文章创作方面表现出色，效率显著提升',
              '大模型写作如同"洗衣机"，解放了重复性劳动',
              '矩阵账号策略可行，数据表现验证了方向正确性',
              'AI辅助创作需要人工引导和质量把控'
            ],
            nextWeekGoals: [
              '引入Claude-4的写作能力，丰富创作风格',
              '探索GPT-4o与Claude-4的协同创作模式',
              '建立更完善的AI写作工作流',
              '提升内容的原创性和深度'
            ],
            metrics: {
              articlesPublished: 48,
              fansGrowth: 295,
              readGrowth: 35000,
              engagementRate: 11.2
            },
            notes: '矩阵账号第一阶段（约2周时间）表现超出预期，数据与主账号基本持平。全程使用GPT-4o进行大模型文章创作，验证了"用洗衣机而不是手洗"的理念。下一阶段计划结合Claude-4的写作能力，形成多模型协同创作的新模式，进一步提升内容质量和创作效率。'
          }
        ],
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
      },
      weibo: {
        platform: 'weibo',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布技术相关内容', '积累初始粉丝'],
          mediumTerm: ['建立技术影响力', '开设技术话题', '参与技术讨论'],
          longTerm: ['成为技术博主', '建立个人品牌', '影响更多技术爱好者']
        },
        strategies: [
          '专注技术内容分享',
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
    '代码AI弗森': {
      csdn: {
        platform: 'csdn',
        currentStatus: {
          fans: 151,
          reads: 22654,
          articles: 35,
          level: '初级创作者'
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
        weeklySummaries: [
          {
            id: 'ai-frosen-v0.0.1',
            version: 'v0.0.1',
            weekStart: '2024-01-01',
            weekEnd: '2024-01-07',
            achievements: [
              '完成账号基础设置和个人资料优化',
              '制定了AI编程内容创作策略',
              '规划了三大系列文章：基础概念、架构设计、模型微调',
              '建立了内容发布节奏和质量标准',
              '成功发布35篇AI编程相关文章',
              '累计获得151位粉丝关注',
              '总阅读量突破2.2万'
            ],
            challenges: [
              'AI技术发展迅速，需要持续跟进最新动态',
              '技术内容创作需要平衡深度和可读性',
              '粉丝增长速度需要进一步提升',
              '需要优化文章标题和内容质量以提升阅读量'
            ],
            learnings: [
              '深入理解了大模型技术栈和应用场景',
              '掌握了技术文章的结构化写作方法',
              '学会了如何将复杂技术概念通俗化表达'
            ],
            nextWeekGoals: [
              '继续发布"基础概念与底层机制篇"系列文章',
              '优化文章质量和标题吸引力',
              '积极参与AI技术社区讨论',
              '建立稳定的内容更新频率',
              '目标粉丝数突破200，阅读量突破3万'
            ],
            metrics: {
              articlesPublished: 35,
              fansGrowth: 151,
              readGrowth: 22654,
              engagementRate: 0.15
            },
            notes: '矩阵账号已取得初步成果，35篇文章获得151位粉丝关注，总阅读量2.2万，后续需要持续优化内容质量和发布频率'
          }
        ],
        writingPlans: [
          {
            id: 'ai-basic-concepts',
            title: '🧠 基础概念与底层机制篇（入门通识 + 底层原理）',
            category: '基础知识文章',
            outline: [
              '什么是大模型？为什么它改变了一切？',
              '通俗解释大模型背后的技术范式与应用革命。',
              'Transformer 结构详解：从Attention机制到位置编码',
              '彻底剖析 Transformer 架构的关键模块与原理演进。',
              'GPT 的工作原理：自回归预测背后的语言魔法',
              '深入理解 GPT 是如何通过概率模型完成语言生成。',
              'RNN、LSTM 到 Transformer：语言模型的前世今生',
              '一文梳理语言模型架构的发展历程与技术突破。',
              '大模型是如何"学会"知识的？揭秘训练过程中的涌现能力',
              '探索"无监督+大量数据"如何构建通用语义理解。'
            ],
            targetPublishDate: '',
            status: 'planning',
            estimatedReadTime: 0,
            keywords: ['大模型', 'Transformer', 'GPT', 'AI基础'],
            notes: 'AI基础概念与底层机制系列文章',
            platforms: ['csdn'],
            articles: [
              {
                id: 'basic-1',
                title: '什么是大模型？为什么它改变了一切？',
                description: '通俗解释大模型背后的技术范式与应用革命。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['大模型', 'AI基础', '技术革命']
              },
              {
                id: 'basic-2',
                title: 'Transformer 结构详解：从Attention机制到位置编码',
                description: '彻底剖析 Transformer 架构的关键模块与原理演进。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['Transformer', 'Attention机制', '位置编码', '架构原理']
              },
              {
                id: 'basic-3',
                title: 'GPT 的工作原理：自回归预测背后的语言魔法',
                description: '深入理解 GPT 是如何通过概率模型完成语言生成。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['GPT', '自回归', '语言生成', '概率模型']
              },
              {
                id: 'basic-4',
                title: 'RNN、LSTM 到 Transformer：语言模型的前世今生',
                description: '一文梳理语言模型架构的发展历程与技术突破。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['RNN', 'LSTM', 'Transformer', '语言模型', '发展历程']
              },
              {
                id: 'basic-5',
                title: '大模型是如何"学会"知识的？揭秘训练过程中的涌现能力',
                description: '探索"无监督+大量数据"如何构建通用语义理解。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['知识学习', '涌现能力', '无监督学习', '语义理解']
              }
            ]
          },
          {
            id: 'ai-architecture',
            title: '🏗️ 架构设计与应用模式篇（RAG、Agent、LLM App）',
            category: '基础知识文章',
            outline: [
              '一文讲透 RAG：大模型为什么需要外部知识库？',
              '讲解 Retrieval-Augmented Generation 的动因、结构与使用场景。',
              'LLM Agent 是什么？如何构建一套"会思考"的任务执行流？',
              '从原理到应用，全面拆解 Agent 系统的组成与实战架构。',
              '从 Prompt 到工作流：大模型应用架构的五种范式演进',
              '总结 LLM 应用架构的阶段变化与典型使用方式。',
              '大模型能力地图：Tool Calling、RAG、Agent、插件机制全解析',
              '梳理 LLM 应用能力边界及其组合方式对开发者的意义。',
              '构建企业内部知识问答系统：从文档库到问答引擎',
              '基于向量库 + RAG 架构，构建企业知识助手的完整流程。'
            ],
            targetPublishDate: '',
            status: 'planning',
            estimatedReadTime: 0,
            keywords: ['RAG', 'Agent', 'LLM应用', '架构设计'],
            notes: 'AI架构设计与应用模式系列文章',
            platforms: ['csdn'],
            articles: [
              {
                id: 'arch-1',
                title: '一文讲透 RAG：大模型为什么需要外部知识库？',
                description: '讲解 Retrieval-Augmented Generation 的动因、结构与使用场景。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['RAG', '知识库', '检索增强', '大模型应用']
              },
              {
                id: 'arch-2',
                title: 'LLM Agent 是什么？如何构建一套"会思考"的任务执行流？',
                description: '从原理到应用，全面拆解 Agent 系统的组成与实战架构。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['LLM Agent', '任务执行', '智能体', '架构设计']
              },
              {
                id: 'arch-3',
                title: '从 Prompt 到工作流：大模型应用架构的五种范式演进',
                description: '总结 LLM 应用架构的阶段变化与典型使用方式。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['Prompt工程', '工作流', '架构演进', 'LLM应用']
              },
              {
                id: 'arch-4',
                title: '大模型能力地图：Tool Calling、RAG、Agent、插件机制全解析',
                description: '梳理 LLM 应用能力边界及其组合方式对开发者的意义。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['Tool Calling', '插件机制', '能力边界', '开发者工具']
              },
              {
                id: 'arch-5',
                title: '构建企业内部知识问答系统：从文档库到问答引擎',
                description: '基于向量库 + RAG 架构，构建企业知识助手的完整流程。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['知识问答', '向量库', '企业应用', 'RAG架构']
              }
            ]
          },
          {
            id: 'ai-fine-tuning',
            title: '🔁 模型微调与参数高效化篇（LoRA、QLoRA、SFT）',
            category: '基础知识文章',
            outline: [
              '大模型微调方法全景图：从 SFT 到 LoRA 再到 DPO',
              '比较不同微调策略的适用场景与原理差异。',
              'LoRA 是如何"插管"大模型的？结构、优点与实战指南',
              '深入解析 LoRA 的低秩矩阵注入机制及代码实现细节。',
              'QLoRA：低内存训练的秘诀及 Hugging Face 实战指南',
              '讲解 QLoRA 的核心优化点及其与 vLLM 兼容性问题。',
              'PEFT 框架全解：让你轻松掌控参数高效微调技术',
              '介绍 Hugging Face PEFT 框架的核心 API 与微调策略组合。',
              '从 RLHF 到 DPO：大模型对齐方法的技术演化路线图',
              '对比强化学习与直接偏好优化两种对齐路径的理论与实践。'
            ],
            targetPublishDate: '',
            status: 'planning',
            estimatedReadTime: 0,
            keywords: ['LoRA', 'QLoRA', '微调', 'PEFT'],
            notes: 'AI模型微调与参数高效化系列文章',
            platforms: ['csdn'],
            articles: [
              {
                id: 'tune-1',
                title: '大模型微调方法全景图：从 SFT 到 LoRA 再到 DPO',
                description: '比较不同微调策略的适用场景与原理差异。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['SFT', 'LoRA', 'DPO', '微调策略', '参数高效']
              },
              {
                id: 'tune-2',
                title: 'LoRA 是如何"插管"大模型的？结构、优点与实战指南',
                description: '深入解析 LoRA 的低秩矩阵注入机制及代码实现细节。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['LoRA', '低秩矩阵', '参数注入', '实战指南']
              },
              {
                id: 'tune-3',
                title: 'QLoRA：低内存训练的秘诀及 Hugging Face 实战指南',
                description: '讲解 QLoRA 的核心优化点及其与 vLLM 兼容性问题。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['QLoRA', '低内存训练', 'Hugging Face', 'vLLM']
              },
              {
                id: 'tune-4',
                title: 'PEFT 框架全解：让你轻松掌控参数高效微调技术',
                description: '介绍 Hugging Face PEFT 框架的核心 API 与微调策略组合。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['PEFT', 'Hugging Face', '参数高效', '微调框架']
              },
              {
                id: 'tune-5',
                title: '从 RLHF 到 DPO：大模型对齐方法的技术演化路线图',
                description: '对比强化学习与直接偏好优化两种对齐路径的理论与实践。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['RLHF', 'DPO', '模型对齐', '强化学习', '偏好优化']
              }
            ]
          },
          {
            id: 'ai-frameworks',
            title: '🧰 开发框架与生态对比篇（LangChain、DSPy、OpenAgents）',
            category: '资源集合',
            outline: [
              'LangChain 入门与项目实战：打造你的第一个 LLM 应用',
              '完整讲解 LangChain 的链式调用、Memory 与 Agent 机制。',
              'LangChain vs. LlamaIndex：两种数据增强方案的对比分析',
              '针对开发者选型，深入拆解两者在场景适配上的异同。',
              'DSPy 框架介绍：编程式 Prompt 优化如何提升准确率？',
              '介绍 DSPy 的模块结构与 Prompt 编译范式。',
              'OpenAgents vs AutoGen：开源 Agent 框架该怎么选？',
              '对比两大主流 Agent 编排框架的特性、协议与插件系统。',
              '打造你自己的 LLM 接入层：Function Calling、Tools、Router 架构全拆解',
              '围绕 AI 中间层设计与多模型接入策略，提供通用接入方式。'
            ],
            targetPublishDate: '',
            status: 'planning',
            estimatedReadTime: 0,
            keywords: ['LangChain', 'DSPy', 'OpenAgents', '开发框架'],
            notes: 'AI开发框架与生态对比系列文章',
            platforms: ['csdn'],
            articles: [
              {
                id: 'framework-1',
                title: 'LangChain 入门与项目实战：打造你的第一个 LLM 应用',
                description: '完整讲解 LangChain 的链式调用、Memory 与 Agent 机制。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['LangChain', 'LLM应用', '链式调用', 'Memory机制']
              },
              {
                id: 'framework-2',
                title: 'LangChain vs. LlamaIndex：两种数据增强方案的对比分析',
                description: '针对开发者选型，深入拆解两者在场景适配上的异同。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['LangChain', 'LlamaIndex', '数据增强', '对比分析']
              },
              {
                id: 'framework-3',
                title: 'DSPy 框架介绍：编程式 Prompt 优化如何提升准确率？',
                description: '介绍 DSPy 的模块结构与 Prompt 编译范式。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['DSPy', 'Prompt优化', '编程式', '准确率提升']
              },
              {
                id: 'framework-4',
                title: 'OpenAgents vs AutoGen：开源 Agent 框架该怎么选？',
                description: '对比两大主流 Agent 编排框架的特性、协议与插件系统。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['OpenAgents', 'AutoGen', 'Agent框架', '开源对比']
              },
              {
                id: 'framework-5',
                title: '打造你自己的 LLM 接入层：Function Calling、Tools、Router 架构全拆解',
                description: '围绕 AI 中间层设计与多模型接入策略，提供通用接入方式。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['Function Calling', 'Tools', 'Router', '接入层', '多模型']
              }
            ]
          },
          {
            id: 'ai-data',
            title: '📚 大模型与数据篇（数据构建、预处理、评估）',
            category: '基础知识文章',
            outline: [
              '如何构建一个高质量的语料库供 LLM 使用？',
              '讲解数据去重、清洗、对齐与格式化全过程。',
              '向量库入门指南：从原理到实际部署',
              '介绍向量检索核心算法、常见库（FAISS、Milvus）与部署建议。',
              '评估大模型效果的三把标尺：BLEU、ROUGE、BERTScore详解',
              '语言模型评估常用指标的算法逻辑与适用场景。',
              'Prompt 测试与调优实战：从 AB 实验到 Prompt Injection 防御',
              '探索 Prompt 的稳定性评估与攻击防御策略。',
              '如何设计大模型评估任务集？从能力、准确率到可控性全面覆盖',
              '结合 OpenAI Evals、HELMeval 等工具设计全流程评估机制。'
            ],
            targetPublishDate: '',
            status: 'planning',
            estimatedReadTime: 0,
            keywords: ['数据处理', '向量库', '模型评估', 'Prompt工程'],
            notes: '大模型与数据处理系列文章',
            platforms: ['csdn'],
            articles: [
              {
                id: 'data-1',
                title: '如何构建一个高质量的语料库供 LLM 使用？',
                description: '讲解数据去重、清洗、对齐与格式化全过程。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['语料库', '数据清洗', '数据对齐', 'LLM训练']
              },
              {
                id: 'data-2',
                title: '向量库入门指南：从原理到实际部署',
                description: '介绍向量检索核心算法、常见库（FAISS、Milvus）与部署建议。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['向量库', 'FAISS', 'Milvus', '向量检索', '部署']
              },
              {
                id: 'data-3',
                title: '评估大模型效果的三把标尺：BLEU、ROUGE、BERTScore详解',
                description: '语言模型评估常用指标的算法逻辑与适用场景。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['BLEU', 'ROUGE', 'BERTScore', '模型评估', '指标']
              },
              {
                id: 'data-4',
                title: 'Prompt 测试与调优实战：从 AB 实验到 Prompt Injection 防御',
                description: '探索 Prompt 的稳定性评估与攻击防御策略。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['Prompt测试', 'AB实验', 'Prompt Injection', '防御策略']
              },
              {
                id: 'data-5',
                title: '如何设计大模型评估任务集？从能力、准确率到可控性全面覆盖',
                description: '结合 OpenAI Evals、HELMeval 等工具设计全流程评估机制。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['评估任务集', 'OpenAI Evals', 'HELMeval', '全流程评估']
              }
            ]
          },
          {
            id: 'ai-product',
            title: '💡 产品设计与落地篇（从 Demo 到真实业务）',
            category: '热点文章',
            outline: [
              'AI 产品经理的第一课：从 Chat 到 Copilot 的产品结构拆解',
              '产品角度看大模型应用的设计范式与交互模式。',
              '大模型在企业中的五种典型落地方式与误区',
              '总结 Chatbot、知识库问答、流程自动化等典型案例。',
              '打造可控的 AI 助手：如何设计 Prompt Guardrail 与行为约束机制？',
              '用真实案例讲解 Prompt Injection、越权行为的防控策略。',
              '自动生成文档、合同、代码：大模型的"生成场景大全"',
              '梳理生成式 AI 在业务端的所有可能变革方向。',
              '从 SaaS 到 GPT 驱动：产品形态如何因大模型而演化？',
              '从架构、接口、商业模式讲解 AI 如何影响 SaaS 产品设计。'
            ],
            targetPublishDate: '',
            status: 'planning',
            estimatedReadTime: 0,
            keywords: ['AI产品', '产品设计', '业务落地', 'SaaS'],
            notes: 'AI产品设计与落地系列文章',
            platforms: ['csdn'],
            articles: [
              {
                id: 'product-1',
                title: 'AI 产品经理的第一课：从 Chat 到 Copilot 的产品结构拆解',
                description: '产品角度看大模型应用的设计范式与交互模式。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['AI产品经理', 'Chat', 'Copilot', '产品结构', '交互模式']
              },
              {
                id: 'product-2',
                title: '大模型在企业中的五种典型落地方式与误区',
                description: '总结 Chatbot、知识库问答、流程自动化等典型案例。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['企业落地', 'Chatbot', '知识库问答', '流程自动化', '误区']
              },
              {
                id: 'product-3',
                title: '打造可控的 AI 助手：如何设计 Prompt Guardrail 与行为约束机制？',
                description: '用真实案例讲解 Prompt Injection、越权行为的防控策略。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['AI助手', 'Prompt Guardrail', '行为约束', '安全防控']
              },
              {
                id: 'product-4',
                title: '自动生成文档、合同、代码：大模型的"生成场景大全"',
                description: '梳理生成式 AI 在业务端的所有可能变革方向。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['自动生成', '文档生成', '代码生成', '业务变革', '生成场景']
              },
              {
                id: 'product-5',
                title: '从 SaaS 到 GPT 驱动：产品形态如何因大模型而演化？',
                description: '从架构、接口、商业模式讲解 AI 如何影响 SaaS 产品设计。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['SaaS', 'GPT驱动', '产品演化', '商业模式', '架构设计']
              }
            ]
          },
          {
            id: 'ai-security',
            title: '🔒 安全、隐私与治理篇',
            category: '基础知识文章',
            outline: [
              '大模型的安全风险全解：Prompt Injection、信息泄露与幻觉问题',
              '系统总结大模型带来的新型风险点与对策。',
              '如何构建一个企业级的大模型使用权限系统？',
              '从角色权限、日志审计到输出过滤的全链路设计。',
              '大模型的数据隐私保护方法：脱敏、同态加密、联邦学习',
              '解析在敏感数据场景下的大模型使用安全策略。',
              'AI 合规指南：如何让大模型系统符合监管要求？',
              '从欧盟 AI 法规到国内数据安全法的落地建议。',
              '企业部署开源大模型时，必须规避的五个隐性风险',
              '从网络、模型源头、依赖项到更新策略的系统检查清单。'
            ],
            targetPublishDate: '',
            status: 'planning',
            estimatedReadTime: 0,
            keywords: ['AI安全', '隐私保护', '合规', '风险管理'],
            notes: 'AI安全、隐私与治理系列文章',
            platforms: ['csdn'],
            articles: [
              {
                id: 'security-1',
                title: '大模型的安全风险全解：Prompt Injection、信息泄露与幻觉问题',
                description: '系统总结大模型带来的新型风险点与对策。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['安全风险', 'Prompt Injection', '信息泄露', '幻觉问题', '风险对策']
              },
              {
                id: 'security-2',
                title: '如何构建一个企业级的大模型使用权限系统？',
                description: '从角色权限、日志审计到输出过滤的全链路设计。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['权限系统', '角色权限', '日志审计', '输出过滤', '企业级']
              },
              {
                id: 'security-3',
                title: '大模型的数据隐私保护方法：脱敏、同态加密、联邦学习',
                description: '解析在敏感数据场景下的大模型使用安全策略。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['数据隐私', '脱敏', '同态加密', '联邦学习', '安全策略']
              },
              {
                id: 'security-4',
                title: 'AI 合规指南：如何让大模型系统符合监管要求？',
                description: '从欧盟 AI 法规到国内数据安全法的落地建议。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['AI合规', '监管要求', '欧盟AI法规', '数据安全法', '落地建议']
              },
              {
                id: 'security-5',
                title: '企业部署开源大模型时，必须规避的五个隐性风险',
                description: '从网络、模型源头、依赖项到更新策略的系统检查清单。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['开源大模型', '部署风险', '系统检查', '安全清单', '企业部署']
              }
            ]
          },
          {
            id: 'ai-multimodal',
            title: '🌍 多模态与视觉篇',
            category: '热点文章',
            outline: [
              '多模态大模型是什么？从 CLIP 到 Gemini 的跨模态理解',
              '解析图文、图像、视频、代码的理解融合机制。',
              '如何构建一个图文问答系统？多模态 RAG 架构实战',
              '结合图像处理与向量检索实现图文问答系统。',
              '开源视觉大模型盘点：BLIP、LLaVA、MiniGPT4 全解析',
              '比较多模态模型能力、应用方向与落地现状。',
              '图像生成技术演进史：从 GAN 到 Diffusion 再到 Sora',
              '讲解图像生成模型的三大阶段与代表模型。',
              'AI 视频生成入门指南：如何使用 Sora、Runway 或 Stable Video',
              '对比不同 AI 视频生成平台的能力、限制与适配场景。'
            ],
            targetPublishDate: '',
            status: 'planning',
            estimatedReadTime: 0,
            keywords: ['多模态', '视觉AI', '图像生成', '视频生成'],
            notes: 'AI多模态与视觉系列文章',
            platforms: ['csdn'],
            articles: [
              {
                id: 'multimodal-1',
                title: '多模态大模型是什么？从 CLIP 到 Gemini 的跨模态理解',
                description: '解析图文、图像、视频、代码的理解融合机制。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['多模态', 'CLIP', 'Gemini', '跨模态理解', '融合机制']
              },
              {
                id: 'multimodal-2',
                title: '如何构建一个图文问答系统？多模态 RAG 架构实战',
                description: '结合图像处理与向量检索实现图文问答系统。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['图文问答', '多模态RAG', '图像处理', '向量检索', '实战']
              },
              {
                id: 'multimodal-3',
                title: '开源视觉大模型盘点：BLIP、LLaVA、MiniGPT4 全解析',
                description: '比较多模态模型能力、应用方向与落地现状。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['BLIP', 'LLaVA', 'MiniGPT4', '视觉大模型', '开源对比']
              },
              {
                id: 'multimodal-4',
                title: '图像生成技术演进史：从 GAN 到 Diffusion 再到 Sora',
                description: '讲解图像生成模型的三大阶段与代表模型。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['GAN', 'Diffusion', 'Sora', '图像生成', '技术演进']
              },
              {
                id: 'multimodal-5',
                title: 'AI 视频生成入门指南：如何使用 Sora、Runway 或 Stable Video',
                description: '对比不同 AI 视频生成平台的能力、限制与适配场景。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['Sora', 'Runway', 'Stable Video', '视频生成', '平台对比']
              }
            ]
          },
          {
            id: 'ai-automation',
            title: '🧱 编程与自动化篇（AI Dev）',
            category: '基础知识文章',
            outline: [
              '用 GPT 自动生成 Python 脚本：实用场景与限制点',
              '讲解 GPT 在代码生成中的能力边界与正确用法。',
              '打造一个能自动化办公的 AI Agent 助理（含邮件、文档处理）',
              '构建基于 Agent 的"数字员工"实战案例。',
              '从 VSCode 插件到 AI Copilot：如何嵌入 AI 到开发工具中？',
              '讲解开发者工具与 GPT 的整合方式与插件机制。',
              '如何构建低代码平台中的 AI 智能体模块？',
              '介绍在 Retool、Budibase、轻流等平台集成 AI 的方法。',
              'AI 自动化测试入门：让 GPT 帮你生成测试用例与逻辑断言',
              '结合 Cypress/Playwright 实现 GPT 自动测试代码生成。'
            ],
            targetPublishDate: '',
            status: 'planning',
            estimatedReadTime: 0,
            keywords: ['AI编程', '自动化', '代码生成', '测试'],
            notes: 'AI编程与自动化系列文章',
            platforms: ['csdn'],
            articles: [
              {
                id: 'automation-1',
                title: '用 GPT 自动生成 Python 脚本：实用场景与限制点',
                description: '讲解 GPT 在代码生成中的能力边界与正确用法。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['GPT', 'Python', '代码生成', '自动化脚本', '能力边界']
              },
              {
                id: 'automation-2',
                title: '打造一个能自动化办公的 AI Agent 助理（含邮件、文档处理）',
                description: '构建基于 Agent 的"数字员工"实战案例。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['AI Agent', '自动化办公', '邮件处理', '文档处理', '数字员工']
              },
              {
                id: 'automation-3',
                title: '从 VSCode 插件到 AI Copilot：如何嵌入 AI 到开发工具中？',
                description: '讲解开发者工具与 GPT 的整合方式与插件机制。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['VSCode', 'AI Copilot', '开发工具', '插件机制', 'GPT整合']
              },
              {
                id: 'automation-4',
                title: '如何构建低代码平台中的 AI 智能体模块？',
                description: '介绍在 Retool、Budibase、轻流等平台集成 AI 的方法。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['低代码平台', 'Retool', 'Budibase', '轻流', 'AI智能体']
              },
              {
                id: 'automation-5',
                title: 'AI 自动化测试入门：让 GPT 帮你生成测试用例与逻辑断言',
                description: '结合 Cypress/Playwright 实现 GPT 自动测试代码生成。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['自动化测试', 'Cypress', 'Playwright', '测试用例', '逻辑断言']
              }
            ]
          },
          {
            id: 'ai-strategy',
            title: '🧩 策略、趋势与认知篇（认知升级 + 趋势观察）',
            category: '热点文章',
            outline: [
              '为什么大模型正在成为"新操作系统"？',
              '分析大模型对 UI、接口、交互范式的底层冲击。',
              'AI 的十年周期规律：从专家系统到大模型，下一步是什么？',
              '历史与未来视角下的 AI 技术周期洞察。',
              '模型即人类接口：为什么我们正在进入后命令行时代？',
              '探讨自然语言交互的革命性影响。',
              '从 LLM 到多智能体：未来十年 AI 架构怎么走？',
              '描绘多 Agent 协作、系统调度的未来形态。',
              'AI 不是工具，是思维方式的变化',
              '从开发者视角探讨如何用"AI native"的方式构建系统。'
            ],
            targetPublishDate: '',
            status: 'planning',
            estimatedReadTime: 0,
            keywords: ['AI趋势', '认知升级', '技术演进', '未来展望'],
            notes: 'AI策略、趋势与认知系列文章',
            platforms: ['csdn'],
            articles: [
              {
                id: 'strategy-1',
                title: '为什么大模型正在成为"新操作系统"？',
                description: '分析大模型对 UI、接口、交互范式的底层冲击。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['大模型', '新操作系统', 'UI范式', '交互范式', '技术冲击']
              },
              {
                id: 'strategy-2',
                title: 'AI 的十年周期规律：从专家系统到大模型，下一步是什么？',
                description: '历史与未来视角下的 AI 技术周期洞察。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['AI周期', '专家系统', '大模型', '技术演进', '未来预测']
              },
              {
                id: 'strategy-3',
                title: '模型即人类接口：为什么我们正在进入后命令行时代？',
                description: '探讨自然语言交互的革命性影响。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['自然语言交互', '后命令行时代', '人机接口', '革命性影响']
              },
              {
                id: 'strategy-4',
                title: '从 LLM 到多智能体：未来十年 AI 架构怎么走？',
                description: '描绘多 Agent 协作、系统调度的未来形态。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['LLM', '多智能体', 'Agent协作', '系统调度', '未来架构']
              },
              {
                id: 'strategy-5',
                title: 'AI 不是工具，是思维方式的变化',
                description: '从开发者视角探讨如何用"AI native"的方式构建系统。',
                status: 'planned',
                publishDate: '',
                readCount: 0,
                likeCount: 0,
                tags: ['AI思维', '思维方式', 'AI native', '系统构建', '开发者视角']
              }
            ]
          }
        ],
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
      weibo: {
        platform: 'weibo',
        currentStatus: {
          fans: 0,
          reads: 0,
          articles: 0,
          level: '新用户'
        },
        goals: {
          shortTerm: ['建立账号基础', '发布AI编程相关内容', '积累初始粉丝'],
          mediumTerm: ['建立AI技术影响力', '开设AI编程话题', '参与AI社区讨论'],
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
    }
  })

  // 获取指定账号和平台的计划
  const getPlatformPlan = (platform: CommunityType, account: string = '安东尼漫长岁月') => {
    if (!platformPlans.value[account]) {
      // 如果账号不存在，创建默认结构
      platformPlans.value[account] = {
        csdn: createDefaultPlatformPlan('csdn'),
        juejin: createDefaultPlatformPlan('juejin'),
        toutiao: createDefaultPlatformPlan('toutiao'),
        zhihu: createDefaultPlatformPlan('zhihu'),
        _51cto: createDefaultPlatformPlan('_51cto'),
        wechat: createDefaultPlatformPlan('wechat'),
        weibo: createDefaultPlatformPlan('weibo'),
        infoq: createDefaultPlatformPlan('infoq')
      }
    }
    return platformPlans.value[account][platform]
  }

  // 添加阶段总结
  const addWeeklySummary = (platform: CommunityType, summary: WeeklySummary, account: string = '安东尼漫长岁月') => {
    const plan = getPlatformPlan(platform, account)
    plan.weeklySummaries.push(summary)
  }

  // 添加写作计划
  const addWritingPlan = (platform: CommunityType, plan: WritingPlan, account: string = '安东尼漫长岁月') => {
    const platformPlan = getPlatformPlan(platform, account)
    platformPlan.writingPlans.push(plan)
  }

  // 添加思考笔记
  const addThoughtNote = (platform: CommunityType, note: ThoughtNote, account: string = '安东尼漫长岁月') => {
    const platformPlan = getPlatformPlan(platform, account)
    platformPlan.thoughtNotes.push(note)
  }

  // 更新写作计划状态
  const updateWritingPlanStatus = (platform: CommunityType, planId: string, status: string, account: string = '安东尼漫长岁月') => {
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