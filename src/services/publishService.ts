import type { CommunityType } from '@/types'

// 发布结果接口
export interface PublishResult {
  platform: string
  status: 'success' | 'error' | 'pending'
  message: string
  url?: string
  error?: string
}

// 文章数据接口
export interface ArticleData {
  title: string
  content: string
  summary?: string
  tags?: string[]
  coverImage?: string
  isOriginal?: boolean
  allowComments?: boolean
  category?: string
}

// Cookie 配置接口
export interface CookieConfig {
  session?: string
  uid?: string
  token?: string
  [key: string]: string | undefined
}

// 平台配置接口
export interface PlatformConfig {
  name: string
  loginUrl: string
  publishUrl: string
  enabled: boolean
  requiresAuth: boolean
  description: string
  icon: string
  color: string
  cookieFields: string[] // 需要的 Cookie 字段
  cookieGuide: string[] // Cookie 获取指南
}

// 各平台配置 - 参考 WeChatSync 项目
const platformConfigs: Record<CommunityType, PlatformConfig> = {
  csdn: {
    name: 'CSDN',
    loginUrl: 'https://passport.csdn.net/login',
    publishUrl: 'https://bizapi.csdn.net/blog-console-api/v3/mdeditor/saveArticle',
    enabled: true,
    requiresAuth: true,
    description: '技术社区，支持Markdown',
    icon: '📝',
    color: 'red',
    cookieFields: ['UserToken', 'access_token', 'session'],
    cookieGuide: [
      '1. 打开 CSDN 官网并登录',
      '2. 按 F12 打开开发者工具',
      '3. 进入 Application → Cookies → https://www.csdn.net',
      '4. 找到 UserToken 或 access_token 字段',
      '5. 复制对应的值'
    ]
  },
  juejin: {
    name: '掘金',
    loginUrl: 'https://juejin.cn/login',
    publishUrl: 'https://api.juejin.cn/content_api/v1/article_draft/create',
    enabled: true,
    requiresAuth: true,
    description: '开发者社区，支持Markdown',
    icon: '💎',
    color: 'orange',
    cookieFields: ['sessionid', 'uid', 'token'],
    cookieGuide: [
      '1. 打开掘金官网并登录',
      '2. 按 F12 打开开发者工具',
      '3. 进入 Application → Cookies → https://juejin.cn',
      '4. 找到 sessionid、uid、token 字段',
      '5. 复制对应的值'
    ]
  },
  zhihu: {
    name: '知乎',
    loginUrl: 'https://www.zhihu.com/signin',
    publishUrl: 'https://www.zhihu.com/api/v4/articles',
    enabled: true,
    requiresAuth: true,
    description: '问答社区，支持富文本',
    icon: '🤔',
    color: 'blue',
    cookieFields: ['z_c0', 'session_id', 'uid'],
    cookieGuide: [
      '1. 打开知乎官网并登录',
      '2. 按 F12 打开开发者工具',
      '3. 进入 Application → Cookies → https://www.zhihu.com',
      '4. 找到 z_c0、session_id、uid 字段',
      '5. 复制对应的值'
    ]
  },
  toutiao: {
    name: '头条',
    loginUrl: 'https://mp.toutiao.com/login',
    publishUrl: 'https://mp.toutiao.com/api/pc/feed/publish',
    enabled: true,
    requiresAuth: true,
    description: '资讯平台，支持富文本',
    icon: '📰',
    color: 'gray',
    cookieFields: ['sessionid', 'uid', 'token'],
    cookieGuide: [
      '1. 打开头条号官网并登录',
      '2. 按 F12 打开开发者工具',
      '3. 进入 Application → Cookies → https://mp.toutiao.com',
      '4. 找到 sessionid、uid、token 字段',
      '5. 复制对应的值'
    ]
  },
  _51cto: {
    name: '51CTO',
    loginUrl: 'https://blog.51cto.com/login',
    publishUrl: 'https://blog.51cto.com/api/article/create',
    enabled: true,
    requiresAuth: true,
    description: 'IT技术社区',
    icon: '💻',
    color: 'purple',
    cookieFields: ['sessionid', 'uid', 'token'],
    cookieGuide: [
      '1. 打开51CTO官网并登录',
      '2. 按 F12 打开开发者工具',
      '3. 进入 Application → Cookies → https://blog.51cto.com',
      '4. 找到 sessionid、uid、token 字段',
      '5. 复制对应的值'
    ]
  },
  segmentfault: {
    name: '思否',
    loginUrl: 'https://segmentfault.com/user/login',
    publishUrl: 'https://segmentfault.com/api/articles',
    enabled: true,
    requiresAuth: true,
    description: '开发者社区',
    icon: '🔍',
    color: 'indigo',
    cookieFields: ['sessionid', 'uid', 'token'],
    cookieGuide: [
      '1. 打开思否官网并登录',
      '2. 按 F12 打开开发者工具',
      '3. 进入 Application → Cookies → https://segmentfault.com',
      '4. 找到 sessionid、uid、token 字段',
      '5. 复制对应的值'
    ]
  },
  wechat: {
    name: '微信公众号',
    loginUrl: 'https://mp.weixin.qq.com/',
    publishUrl: 'https://api.weixin.qq.com/cgi-bin/draft/add',
    enabled: false,
    requiresAuth: true,
    description: '需要微信认证',
    icon: '📱',
    color: 'green',
    cookieFields: ['sessionid', 'token'],
    cookieGuide: [
      '1. 需要微信公众平台开发者权限',
      '2. 获取 AppID 和 AppSecret',
      '3. 目前暂不支持直接发布'
    ]
  },
  infoq: {
    name: 'InfoQ',
    loginUrl: 'https://www.infoq.cn/login',
    publishUrl: 'https://www.infoq.cn/api/article/create',
    enabled: false,
    requiresAuth: true,
    description: '需要邀请码',
    icon: '📊',
    color: 'teal',
    cookieFields: ['sessionid', 'token'],
    cookieGuide: [
      '1. 需要InfoQ邀请码',
      '2. 联系InfoQ编辑获取权限',
      '3. 目前暂不支持直接发布'
    ]
  }
}

// 发布服务类
export class PublishService {
  private static instance: PublishService
  private cookieConfigs: Partial<Record<CommunityType, CookieConfig>> = {}
  private authStatus: Partial<Record<CommunityType, boolean>> = {}

  static getInstance(): PublishService {
    if (!PublishService.instance) {
      PublishService.instance = new PublishService()
    }
    return PublishService.instance
  }

  // 获取平台配置
  getPlatformConfig(platform: CommunityType): PlatformConfig {
    return platformConfigs[platform]
  }

  // 获取所有平台配置
  getAllPlatformConfigs(): Record<CommunityType, PlatformConfig> {
    return platformConfigs
  }

  // 设置 Cookie 配置
  setCookieConfig(platform: CommunityType, cookies: CookieConfig) {
    this.cookieConfigs[platform] = cookies
    this.authStatus[platform] = true
  }

  // 获取 Cookie 配置
  getCookieConfig(platform: CommunityType): CookieConfig | undefined {
    return this.cookieConfigs[platform]
  }

  // 检查平台是否已认证
  isAuthenticated(platform: CommunityType): boolean {
    return !!this.authStatus[platform] && !!this.cookieConfigs[platform]
  }

  // 清除认证状态
  clearAuth(platform: CommunityType) {
    delete this.cookieConfigs[platform]
    delete this.authStatus[platform]
  }

  // 验证 Cookie 有效性
  async validateCookies(platform: CommunityType): Promise<boolean> {
    const cookies = this.getCookieConfig(platform)
    if (!cookies) return false

    try {
      const config = platformConfigs[platform]
      const cookieString = this.buildCookieString(cookies)
      
      const response = await fetch(config.publishUrl, {
        method: 'GET',
        headers: {
          'Cookie': cookieString,
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      })
      
      return response.ok
    } catch (error) {
      return false
    }
  }

  // 构建 Cookie 字符串
  private buildCookieString(cookies: CookieConfig): string {
    return Object.entries(cookies)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ')
  }

  // 发布到单个平台
  async publishToPlatform(platform: CommunityType, article: ArticleData): Promise<PublishResult> {
    const config = platformConfigs[platform]
    
    if (!config.enabled) {
      return {
        platform,
        status: 'error',
        message: `${config.name} 平台暂不支持发布`,
        error: 'Platform not enabled'
      }
    }

    if (config.requiresAuth && !this.isAuthenticated(platform)) {
      return {
        platform,
        status: 'error',
        message: `请先配置 ${config.name} 的 Cookie`,
        error: 'Authentication required'
      }
    }

    try {
      // 根据不同平台调用对应的发布方法
      const result = await this.callPlatformAPI(platform, article)
      return result
    } catch (error) {
      return {
        platform,
        status: 'error',
        message: `发布到 ${config.name} 失败: ${error instanceof Error ? error.message : '未知错误'}`,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  // 调用平台API - 使用 Cookie 模拟登录
  private async callPlatformAPI(platform: CommunityType, article: ArticleData): Promise<PublishResult> {
    const config = platformConfigs[platform]
    const cookies = this.getCookieConfig(platform)
    
    if (!cookies) {
      throw new Error('Cookie 配置缺失')
    }

    const cookieString = this.buildCookieString(cookies)
    
    // 根据不同平台构建请求
    switch (platform) {
      case 'csdn':
        return await this.publishToCSDN(article, cookieString)
      case 'juejin':
        return await this.publishToJuejin(article, cookieString)
      case 'zhihu':
        return await this.publishToZhihu(article, cookieString)
      case 'toutiao':
        return await this.publishToToutiao(article, cookieString)
      case '_51cto':
        return await this.publishTo51CTO(article, cookieString)
      case 'segmentfault':
        return await this.publishToSegmentfault(article, cookieString)
      default:
        throw new Error(`不支持的平台: ${platform}`)
    }
  }

  // CSDN发布 - 使用 Cookie 模拟
  private async publishToCSDN(article: ArticleData, cookieString: string): Promise<PublishResult> {
    const response = await fetch(platformConfigs.csdn.publishUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieString,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Referer': 'https://bizapi.csdn.net/blog-console-api/v3/mdeditor/saveArticle'
      },
      body: JSON.stringify({
        title: article.title,
        markdowncontent: article.content,
        description: article.summary || '',
        tags: article.tags || [],
        source: 'pc_mdeditor',
        not_auto_saved: '1',
        source_url: '',
        level: 0,
        type: 'original',
        read_type: 'public',
        status: 0
      })
    })

    if (!response.ok) {
      throw new Error(`CSDN API 错误: ${response.status}`)
    }

    const result = await response.json()
    
    if (result.code === 0) {
      return {
        platform: 'csdn',
        status: 'success',
        message: '发布成功',
        url: `https://blog.csdn.net/article/details/${result.data.id}`
      }
    } else {
      throw new Error(result.message || '发布失败')
    }
  }

  // 掘金发布 - 使用 Cookie 模拟
  private async publishToJuejin(article: ArticleData, cookieString: string): Promise<PublishResult> {
    const response = await fetch(platformConfigs.juejin.publishUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieString,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Referer': 'https://juejin.cn/editor/drafts/new'
      },
      body: JSON.stringify({
        title: article.title,
        content: article.content,
        category_id: '6809637769959178254', // 技术
        tag_ids: article.tags || [],
        brief_content: article.summary || '',
        cover_image: article.coverImage || '',
        is_english: false,
        is_original: article.isOriginal || true,
        user_id: '',
        status: 2 // 发布状态
      })
    })

    if (!response.ok) {
      throw new Error(`掘金 API 错误: ${response.status}`)
    }

    const result = await response.json()
    
    if (result.err_no === 0) {
      return {
        platform: 'juejin',
        status: 'success',
        message: '发布成功',
        url: `https://juejin.cn/post/${result.data.article_id}`
      }
    } else {
      throw new Error(result.err_msg || '发布失败')
    }
  }

  // 知乎发布 - 使用 Cookie 模拟
  private async publishToZhihu(article: ArticleData, cookieString: string): Promise<PublishResult> {
    const response = await fetch(platformConfigs.zhihu.publishUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieString,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Referer': 'https://www.zhihu.com/creator'
      },
      body: JSON.stringify({
        title: article.title,
        content: article.content,
        topics: article.tags || [],
        excerpt: article.summary || '',
        image_url: article.coverImage || '',
        is_title_image_full_screen: false,
        is_original: article.isOriginal || true,
        status: 'published'
      })
    })

    if (!response.ok) {
      throw new Error(`知乎 API 错误: ${response.status}`)
    }

    const result = await response.json()
    
    if (result.id) {
      return {
        platform: 'zhihu',
        status: 'success',
        message: '发布成功',
        url: `https://zhuanlan.zhihu.com/p/${result.id}`
      }
    } else {
      throw new Error('发布失败')
    }
  }

  // 头条发布 - 使用 Cookie 模拟
  private async publishToToutiao(article: ArticleData, cookieString: string): Promise<PublishResult> {
    const response = await fetch(platformConfigs.toutiao.publishUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieString,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Referer': 'https://mp.toutiao.com/'
      },
      body: JSON.stringify({
        title: article.title,
        content: article.content,
        summary: article.summary || '',
        tags: article.tags || [],
        cover_image: article.coverImage || '',
        is_original: article.isOriginal || true,
        status: 'published'
      })
    })

    if (!response.ok) {
      throw new Error(`头条 API 错误: ${response.status}`)
    }

    const result = await response.json()
    
    if (result.message === 'success') {
      return {
        platform: 'toutiao',
        status: 'success',
        message: '发布成功',
        url: result.data.url
      }
    } else {
      throw new Error(result.message || '发布失败')
    }
  }

  // 51CTO发布 - 使用 Cookie 模拟
  private async publishTo51CTO(article: ArticleData, cookieString: string): Promise<PublishResult> {
    const response = await fetch(platformConfigs._51cto.publishUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieString,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Referer': 'https://blog.51cto.com/'
      },
      body: JSON.stringify({
        title: article.title,
        content: article.content,
        summary: article.summary || '',
        tags: article.tags || [],
        cover_image: article.coverImage || '',
        is_original: article.isOriginal || true,
        status: 'published'
      })
    })

    if (!response.ok) {
      throw new Error(`51CTO API 错误: ${response.status}`)
    }

    const result = await response.json()
    
    if (result.success) {
      return {
        platform: '_51cto',
        status: 'success',
        message: '发布成功',
        url: result.data.url
      }
    } else {
      throw new Error(result.message || '发布失败')
    }
  }

  // 思否发布 - 使用 Cookie 模拟
  private async publishToSegmentfault(article: ArticleData, cookieString: string): Promise<PublishResult> {
    const response = await fetch(platformConfigs.segmentfault.publishUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieString,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Referer': 'https://segmentfault.com/'
      },
      body: JSON.stringify({
        title: article.title,
        content: article.content,
        summary: article.summary || '',
        tags: article.tags || [],
        cover_image: article.coverImage || '',
        is_original: article.isOriginal || true,
        status: 'published'
      })
    })

    if (!response.ok) {
      throw new Error(`思否 API 错误: ${response.status}`)
    }

    const result = await response.json()
    
    if (result.success) {
      return {
        platform: 'segmentfault',
        status: 'success',
        message: '发布成功',
        url: result.data.url
      }
    } else {
      throw new Error(result.message || '发布失败')
    }
  }

  // 批量发布到多个平台
  async publishToMultiplePlatforms(platforms: CommunityType[], article: ArticleData): Promise<PublishResult[]> {
    const results: PublishResult[] = []
    
    for (const platform of platforms) {
      try {
        const result = await this.publishToPlatform(platform, article)
        results.push(result)
      } catch (error) {
        results.push({
          platform,
          status: 'error',
          message: `发布失败: ${error instanceof Error ? error.message : '未知错误'}`,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }
    
    return results
  }

  // 自动获取 Cookie - 参考 WeChatSync 的实现方式
  async autoGetCookies(platform: CommunityType): Promise<CookieConfig | null> {
    const config = platformConfigs[platform]
    
    try {
      // 首先尝试从当前页面获取Cookie
      const currentCookies = await this.extractCookiesFromCurrentPage(platform)
      if (currentCookies && this.validateCookieConfig(platform, currentCookies)) {
        return currentCookies
      }

      // 如果当前页面没有，则打开登录页面
      const loginWindow = window.open(
        config.loginUrl,
        `${platform}_login`,
        'width=800,height=600,scrollbars=yes,resizable=yes'
      )

      if (!loginWindow) {
        throw new Error('无法打开登录窗口，请检查浏览器弹窗设置')
      }

      // 显示用户指导信息
      this.showLoginGuide(platform)

      // 等待用户登录并获取Cookie
      return new Promise((resolve, reject) => {
        const checkCookies = setInterval(async () => {
          try {
            // 尝试从登录窗口获取Cookie
            const cookies = await this.extractCookiesFromWindow(platform, loginWindow)
            if (cookies && this.validateCookieConfig(platform, cookies)) {
              clearInterval(checkCookies)
              loginWindow.close()
              resolve(cookies)
            }
          } catch (error) {
            // 忽略错误，继续检查
          }
        }, 2000) // 每2秒检查一次

        // 监听窗口关闭事件
        const checkClosed = setInterval(() => {
          if (loginWindow.closed) {
            clearInterval(checkCookies)
            clearInterval(checkClosed)
            reject(new Error('登录窗口已关闭，请重新尝试'))
          }
        }, 1000)

        // 5分钟后超时
        setTimeout(() => {
          clearInterval(checkCookies)
          clearInterval(checkClosed)
          if (!loginWindow.closed) {
            loginWindow.close()
          }
          reject(new Error('登录超时，请重新尝试'))
        }, 300000)
      })
    } catch (error) {
      throw error
    }
  }

  // 从登录窗口提取Cookie
  private async extractCookiesFromWindow(platform: CommunityType, window: Window): Promise<CookieConfig | null> {
    try {
      // 由于跨域限制，我们需要通过其他方式获取Cookie
      // 这里我们尝试通过postMessage与登录窗口通信
      const cookies = await this.extractTokenFromStorage(platform)
      if (cookies) {
        return this.parseCookieString(cookies)
      }
      return null
    } catch (error) {
      return null
    }
  }

  // 解析Cookie字符串为对象
  private parseCookieString(cookieString: string): CookieConfig {
    const cookies: CookieConfig = {}
    const pairs = cookieString.split(';')
    
    for (const pair of pairs) {
      const [key, value] = pair.trim().split('=')
      if (key && value) {
        cookies[key] = value
      }
    }
    
    return cookies
  }

  // 验证Cookie配置是否完整
  private validateCookieConfig(platform: CommunityType, cookies: CookieConfig): boolean {
    const config = platformConfigs[platform]
    const requiredFields = config.cookieFields
    
    return requiredFields.every(field => cookies[field] && cookies[field]!.length > 0)
  }

  // 从浏览器存储中提取token
  private async extractTokenFromStorage(platform: CommunityType): Promise<string | null> {
    // 这里实现从localStorage、sessionStorage、cookie等地方提取token的逻辑
    // 不同平台的token存储位置不同，需要分别处理
    
    switch (platform) {
      case 'csdn':
        return this.extractCSDNToken()
      case 'juejin':
        return this.extractJuejinToken()
      case 'zhihu':
        return this.extractZhihuToken()
      case 'toutiao':
        return this.extractToutiaoToken()
      case '_51cto':
        return this.extract51CTOToken()
      case 'segmentfault':
        return this.extractSegmentfaultToken()
      default:
        return null
    }
  }

  // 提取各平台的token
  private extractCSDNToken(): string | null {
    // CSDN的token通常在localStorage中
    const token = localStorage.getItem('UserToken') || 
                  localStorage.getItem('access_token') ||
                  sessionStorage.getItem('UserToken')
    return token
  }

  private extractJuejinToken(): string | null {
    // 掘金的token
    const token = localStorage.getItem('juejin_token') ||
                  localStorage.getItem('access_token')
    return token
  }

  private extractZhihuToken(): string | null {
    // 知乎的token
    const token = localStorage.getItem('z_c0') ||
                  localStorage.getItem('access_token')
    return token
  }

  private extractToutiaoToken(): string | null {
    // 头条的token
    const token = localStorage.getItem('toutiao_token') ||
                  localStorage.getItem('access_token')
    return token
  }

  private extract51CTOToken(): string | null {
    // 51CTO的token
    const token = localStorage.getItem('51cto_token') ||
                  localStorage.getItem('access_token')
    return token
  }

  private extractSegmentfaultToken(): string | null {
    // 思否的token
    const token = localStorage.getItem('sf_token') ||
                  localStorage.getItem('access_token')
    return token
  }

  // 从当前页面提取Cookie
  private async extractCookiesFromCurrentPage(platform: CommunityType): Promise<CookieConfig | null> {
    try {
      const cookies = await this.extractTokenFromStorage(platform)
      if (cookies) {
        return this.parseCookieString(cookies)
      }
      return null
    } catch (error) {
      return null
    }
  }

  // 显示登录指导信息
  private showLoginGuide(platform: CommunityType) {
    const config = platformConfigs[platform]
    const guide = `
      <div style="position: fixed; top: 20px; right: 20px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); z-index: 9999; max-width: 300px;">
        <h3 style="margin: 0 0 8px 0; color: #374151; font-size: 14px; font-weight: 600;">登录指导</h3>
        <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 12px; line-height: 1.4;">
          请在打开的窗口中完成 ${config.name} 的登录，登录成功后系统将自动获取认证信息。
        </p>
        <div style="font-size: 11px; color: #9ca3af;">
          💡 提示：登录后请保持窗口打开，系统会自动检测
        </div>
      </div>
    `
    
    // 创建指导元素
    const guideElement = document.createElement('div')
    guideElement.innerHTML = guide
    document.body.appendChild(guideElement)
    
    // 5秒后自动移除
    setTimeout(() => {
      if (guideElement.parentNode) {
        guideElement.parentNode.removeChild(guideElement)
      }
    }, 5000)
  }
}

// 导出单例实例
export const publishService = PublishService.getInstance() 