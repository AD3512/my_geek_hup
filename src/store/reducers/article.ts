import { ArticleAction, ArticleDetail } from '@/types/store'

const initialState = {
  articleInfo: {} as ArticleDetail,
}

const article = (prevState = initialState, action: ArticleAction) => {
  switch (action.type) {
    case 'article/getArticleInfo':
      return { ...prevState, articleInfo: action.payload }
    default:
      return prevState
  }
}

export default article
