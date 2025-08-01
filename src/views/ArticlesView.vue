<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useArticlesStore } from '@/stores/articles'
import type { Article, ArticleCategory } from '@/types'
import dayjs from 'dayjs'

const articlesStore = useArticlesStore()

const showArticleForm = ref(false)
const editingArticle = ref<Article | null>(null)
const selectedCategory = ref<ArticleCategory | 'all'>('all')

const articleForm = reactive({
  title: '',
  publishDate: dayjs().format('YYYY-MM-DD'),
  coverImage: '',
  category: '基础知识文章' as ArticleCategory,
  isAIGenerated: false,
  csdnUrl: '',
  readCount: 0,
  likeCount: 0,
  commentCount: 0
})

const openArticleForm = (article?: Article) => {
  if (article) {
    editingArticle.value = article
    Object.assign(articleForm, article)
  } else {
    editingArticle.value = null
    Object.assign(articleForm, {
      title: '',
      publishDate: dayjs().format('YYYY-MM-DD'),
      coverImage: '',
      category: '基础知识文章' as ArticleCategory,
      isAIGenerated: false,
      csdnUrl: '',
      readCount: 0,
      likeCount: 0,
      commentCount: 0
    })
  }
  showArticleForm.value = true
}

const saveArticle = () => {
  if (editingArticle.value) {
    articlesStore.updateArticle(editingArticle.value.id, articleForm)
  } else {
    articlesStore.addArticle(articleForm)
  }
  showArticleForm.value = false
  editingArticle.value = null
}

const deleteArticle = (id: string) => {
  if (confirm('确定要删除这篇文章吗？')) {
    articlesStore.deleteArticle(id)
  }
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('zh-CN').format(num)
}

const getCategoryColor = (category: ArticleCategory) => {
  const colors = {
    '面试文章': 'bg-blue-100 text-blue-800',
    '资源集合': 'bg-purple-100 text-purple-800',
    '热点文章': 'bg-orange-100 text-orange-800',
    '翻译文章': 'bg-green-100 text-green-800',
    '基础知识文章': 'bg-gray-100 text-gray-800',
    '技术热点': 'bg-purple-100 text-purple-800'
  }
  return colors[category]
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">文章管理</h1>
        <p class="text-gray-600">管理所有发布的文章内容</p>
      </div>
      <button @click="openArticleForm()" class="btn-primary">
        添加文章
      </button>
    </div>

    <div class="card">
      <div class="flex flex-wrap gap-2">
        <button
          @click="selectedCategory = 'all'"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="selectedCategory === 'all' 
            ? 'bg-csdn-red text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          全部 ({{ articlesStore.articles.length }})
        </button>
        <button
          v-for="category in (['面试文章', '资源集合', '热点文章', '翻译文章', '基础知识文章', '技术热点'] as ArticleCategory[])"
          :key="category"
          @click="selectedCategory = category"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="selectedCategory === category 
            ? 'bg-csdn-red text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          {{ category }} ({{ articlesStore.categoryStats[category] }})
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="article in articlesStore.filteredArticles"
        :key="article.id"
        class="card-hover cursor-pointer"
        @click="openArticleForm(article)"
      >
        <div class="space-y-3">
          <div class="flex items-start justify-between">
            <span :class="getCategoryColor(article.category)" class="px-2 py-1 rounded-full text-xs font-medium">
              {{ article.category }}
            </span>
            <span v-if="article.isAIGenerated" class="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              🤖 AI生成
            </span>
          </div>

          <h3 class="font-semibold text-gray-900">{{ article.title }}</h3>
          
          <div class="text-sm text-gray-500">
            {{ dayjs(article.publishDate).format('YYYY-MM-DD') }}
          </div>

          <div class="flex items-center space-x-4 text-sm text-gray-600">
            <span>👁️ {{ formatNumber(article.readCount || 0) }}</span>
            <span>👍 {{ formatNumber(article.likeCount || 0) }}</span>
            <span>💬 {{ formatNumber(article.commentCount || 0) }}</span>
          </div>

          <div class="flex space-x-2 pt-2">
            <a
              :href="article.csdnUrl"
              target="_blank"
              class="flex-1 btn-secondary text-center text-sm"
              @click.stop
            >
              查看原文
            </a>
            <button
              @click.stop="deleteArticle(article.id)"
              class="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 