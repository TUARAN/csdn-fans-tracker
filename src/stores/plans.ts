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
    '代码AI弗森': {
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
            articles: []
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
            articles: []
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
            articles: []
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
            articles: []
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
            articles: []
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
            articles: []
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
            articles: []
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
            articles: []
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
            articles: []
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