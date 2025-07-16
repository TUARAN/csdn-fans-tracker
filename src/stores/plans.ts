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
            },
            {
              id: '2',
              title: 'Vue3响应式原理八股文已死！',
              description: '面试官在等你说这3个底层缺陷',
              status: 'planned',
              tags: ['Vue3', '响应式', '面试']
            },
            {
              id: '3',
              title: 'React性能杀手useMemo滥用实录',
              description: '90%人不知道的渲染链崩溃陷阱',
              status: 'planned',
              tags: ['React', '性能优化', '面试']
            },
            {
              id: '4',
              title: 'TypeScript类型体操翻车现场',
              description: '面试官递纸巾时我在擦类型报错',
              status: 'planned',
              tags: ['TypeScript', '类型', '面试']
            },
            {
              id: '5',
              title: 'Webpack tree-shaking失灵案',
              description: '你的代码为什么被打包成"垃圾场"？',
              status: 'planned',
              tags: ['Webpack', '打包', '面试']
            },
            {
              id: '6',
              title: '前端监控埋点反作弊实战',
              description: '如何用Performance API撕掉刷量外挂',
              status: 'planned',
              tags: ['监控', '埋点', '面试']
            },
            {
              id: '7',
              title: '跨域方案考古到现代',
              description: 'CORS预检请求把面试官CPU干烧了',
              status: 'planned',
              tags: ['跨域', 'CORS', '面试']
            },
            {
              id: '8',
              title: '微前端沙箱漏洞攻防',
              description: '子应用如何用Proxy劫持主站cookie',
              status: 'planned',
              tags: ['微前端', '沙箱', '面试']
            },
            {
              id: '9',
              title: '低代码平台面试避坑指南',
              description: '别让拖拽组件暴露你的技术断层',
              status: 'planned',
              tags: ['低代码', '组件', '面试']
            },
            {
              id: '10',
              title: 'Three.js性能优化黑暗面',
              description: '面试官让我现场调优崩溃的GPU',
              status: 'planned',
              tags: ['Three.js', '性能优化', '面试']
            },
            {
              id: '11',
              title: 'Spring事务失效的7个阴间场景',
              description: '@Transactional注解竟是卧底？',
              status: 'planned',
              tags: ['Spring', '事务', '面试']
            },
            {
              id: '12',
              title: 'Redis分布式锁翻车大全',
              description: '你的setnx正在给面试官表演喜剧',
              status: 'planned',
              tags: ['Redis', '分布式锁', '面试']
            },
            {
              id: '13',
              title: 'MySQL索引合并优化陷阱',
              description: '明明建了索引为什么慢查告警炸了？',
              status: 'planned',
              tags: ['MySQL', '索引', '面试']
            },
            {
              id: '14',
              title: 'Kafka消息积压救命指南',
              description: '从手动位移调到动态分区扩容实战',
              status: 'planned',
              tags: ['Kafka', '消息队列', '面试']
            },
            {
              id: '15',
              title: '线程池参数配置血泪史',
              description: '队列塞爆时GC日志成了面试呈堂证供',
              status: 'planned',
              tags: ['线程池', 'JVM', '面试']
            },
            {
              id: '16',
              title: 'DDD面试反杀手册',
              description: '当面试官说"写个聚合根"时我在画事件风暴',
              status: 'planned',
              tags: ['DDD', '架构', '面试']
            },
            {
              id: '17',
              title: '分布式ID生成器暗战',
              description: '雪花算法时钟回拨时面试官笑而不语',
              status: 'planned',
              tags: ['分布式ID', '雪花算法', '面试']
            },
            {
              id: '18',
              title: 'TCP粘包拆包灾难现场',
              description: 'Netty解码器救不了你的业务协议设计',
              status: 'planned',
              tags: ['TCP', 'Netty', '面试']
            },
            {
              id: '19',
              title: 'Elasticsearch深度分页谋杀案',
              description: 'from+size如何拖垮集群',
              status: 'planned',
              tags: ['Elasticsearch', '分页', '面试']
            },
            {
              id: '20',
              title: '高并发下单系统架构尸检报告',
              description: '库存扣减与订单创建的死锁链',
              status: 'planned',
              tags: ['高并发', '架构', '面试']
            },
            {
              id: '21',
              title: '大模型微调面试避雷针',
              description: '你的LoRA适配器正在泄露业务数据',
              status: 'planned',
              tags: ['大模型', '微调', '面试']
            },
            {
              id: '22',
              title: 'LangChain面试翻车实录',
              description: 'Chain和Agent区别说错直接挂',
              status: 'planned',
              tags: ['LangChain', 'AI', '面试']
            },
            {
              id: '23',
              title: 'Embedding向量检索优化',
              description: '当面试官问"为什么不用余弦相似度"',
              status: 'planned',
              tags: ['Embedding', '向量检索', '面试']
            },
            {
              id: '24',
              title: '推理服务部署压测指南',
              description: '你的Triton配置把GPU显存炸成烟花',
              status: 'planned',
              tags: ['推理服务', 'GPU', '面试']
            },
            {
              id: '25',
              title: 'Prompt注入攻防实战',
              description: '如何用系统提示词封印越狱指令',
              status: 'planned',
              tags: ['Prompt', '安全', '面试']
            },
            {
              id: '26',
              title: 'LLM应用架构设计陷阱',
              description: 'RAG还是Fine-tuning？选错技术栈直接出局',
              status: 'planned',
              tags: ['LLM', '架构', '面试']
            },
            {
              id: '27',
              title: '模型量化部署生死局',
              description: 'INT8精度损失让面试官皱紧眉头',
              status: 'planned',
              tags: ['模型量化', '部署', '面试']
            },
            {
              id: '28',
              title: 'AI编译器面试冷箭',
              description: 'TVM和MLIR区别说不清等于白学',
              status: 'planned',
              tags: ['AI编译器', 'TVM', '面试']
            },
            {
              id: '29',
              title: '多模态模型缓存灾难',
              description: '图像编码器如何吃光你的内存',
              status: 'planned',
              tags: ['多模态', '缓存', '面试']
            },
            {
              id: '30',
              title: '大模型监控告警盲区',
              description: 'Token延迟99分位超标竟无人察觉',
              status: 'planned',
              tags: ['监控', '告警', '面试']
            },
            {
              id: '31',
              title: 'K8s探针配置夺命call',
              description: 'Readiness探针失败导致服务雪崩实录',
              status: 'planned',
              tags: ['Kubernetes', '探针', '面试']
            },
            {
              id: '32',
              title: 'Istio流量管理反模式',
              description: '你的VirtualService正在制造环路',
              status: 'planned',
              tags: ['Istio', '流量管理', '面试']
            },
            {
              id: '33',
              title: 'Docker镜像瘦身手术',
              description: '从1.2GB到80MB的面试急救方案',
              status: 'planned',
              tags: ['Docker', '镜像优化', '面试']
            },
            {
              id: '34',
              title: 'CI/CD流水线安全漏洞',
              description: 'Jenkinsfile中groovy代码注入漏洞',
              status: 'planned',
              tags: ['CI/CD', '安全', '面试']
            },
            {
              id: '35',
              title: 'Service Mesh数据面性能刑侦',
              description: 'Envoy内存泄漏如何定位',
              status: 'planned',
              tags: ['Service Mesh', 'Envoy', '面试']
            },
            {
              id: '36',
              title: '云原生可观测性骗局',
              description: '你的OpenTelemetry埋点全是噪声',
              status: 'planned',
              tags: ['可观测性', 'OpenTelemetry', '面试']
            },
            {
              id: '37',
              title: 'Infra面试必杀技',
              description: '用eBPF现场抓包证明网络延迟',
              status: 'planned',
              tags: ['eBPF', '网络', '面试']
            },
            {
              id: '38',
              title: 'Git高级操作翻车集',
              description: '当面试官让你rebase冲突分支时...',
              status: 'planned',
              tags: ['Git', '版本控制', '面试']
            },
            {
              id: '39',
              title: '混沌工程面试红黑榜',
              description: 'Chaos Mesh实验设计错误集锦',
              status: 'planned',
              tags: ['混沌工程', 'Chaos Mesh', '面试']
            },
            {
              id: '40',
              title: 'Server冷启动优化实战',
              description: '面试官让我5分钟降低Lambda延迟',
              status: 'planned',
              tags: ['Serverless', '冷启动', '面试']
            },
            {
              id: '41',
              title: 'JVM调优面试死亡问答',
              description: 'CMS和G1回收器选择错误直接挂',
              status: 'planned',
              tags: ['JVM', '调优', '面试']
            },
            {
              id: '42',
              title: 'Linux内存泄漏狩猎指南',
              description: '面试官递来perf时我在颤抖',
              status: 'planned',
              tags: ['Linux', '内存泄漏', '面试']
            },
            {
              id: '43',
              title: 'Golang协程泄露检测',
              description: 'pprof如何揪出百万级goroutine元凶',
              status: 'planned',
              tags: ['Golang', '协程', '面试']
            },
            {
              id: '44',
              title: 'Python GIL突围实战',
              description: '面试官说多进程慢时我掏出了C扩展',
              status: 'planned',
              tags: ['Python', 'GIL', '面试']
            },
            {
              id: '45',
              title: 'SQL执行计划解读密码',
              description: 'Extra字段出现"Using temporary"时危险了',
              status: 'planned',
              tags: ['SQL', '执行计划', '面试']
            },
            {
              id: '46',
              title: '分布式追踪埋雷分析',
              description: 'OpenTelemetry Span超时牵连无辜服务',
              status: 'planned',
              tags: ['分布式追踪', 'OpenTelemetry', '面试']
            },
            {
              id: '47',
              title: '压测工具对比解剖',
              description: 'wrk和jmeter谁更适合面试现场演示？',
              status: 'planned',
              tags: ['压测', '性能测试', '面试']
            },
            {
              id: '48',
              title: 'CPU毛刺排查终极武器',
              description: '用火焰图锁定热点函数',
              status: 'planned',
              tags: ['CPU', '火焰图', '面试']
            },
            {
              id: '49',
              title: '协议栈调优黑科技',
              description: 'TCP_NODELAY和TCP_QUICKACK的战争',
              status: 'planned',
              tags: ['TCP', '协议栈', '面试']
            },
            {
              id: '50',
              title: '代码审查反杀案例',
              description: '在PR评论里发现面试官的逻辑漏洞',
              status: 'planned',
              tags: ['代码审查', 'PR', '面试']
            }
          ]
        },
        {
          id: '2',
          title: '资源集合',
          category: '资源集合',
          outline: [],
          targetPublishDate: '',
          status: 'planning',
          estimatedReadTime: 0,
          keywords: ['资源', '工具'],
          notes: '资源集合文章',
          platforms: ['csdn'],
          articles: []
        },
        {
          id: '3',
          title: '热点文章',
          category: '热点文章',
          outline: [],
          targetPublishDate: '',
          status: 'planning',
          estimatedReadTime: 0,
          keywords: ['热点', '新技术'],
          notes: '热点技术文章',
          platforms: ['csdn'],
          articles: []
        },
        {
          id: '4',
          title: '翻译文章',
          category: '翻译文章',
          outline: [],
          targetPublishDate: '',
          status: 'planning',
          estimatedReadTime: 0,
          keywords: ['翻译', '国外技术'],
          notes: '翻译国外技术文章',
          platforms: ['csdn'],
          articles: []
        },
        {
          id: '5',
          title: '基础知识文章',
          category: '基础知识文章',
          outline: [],
          targetPublishDate: '',
          status: 'planning',
          estimatedReadTime: 0,
          keywords: ['基础知识', '教程'],
          notes: '基础知识教程文章',
          platforms: ['csdn'],
          articles: []
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