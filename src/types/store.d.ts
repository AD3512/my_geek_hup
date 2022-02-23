// ------------------------------redux中的类型------------------------------------

import store from '@/store'

import { ThunkAction } from 'redux-thunk'
import { History, searchSuggestion } from './data'

// -------------------------------通用类型----------------------------------------
export type RootState = ReturnType<typeof store.getState>

export type RootAction =
  | LoginAction
  | UserAction
  | UserProfileAction
  | HomeAction
  | searchAction
  | ArticleAction

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>

// ----------------------------------login---------------------------------------

export type Token = {
  token: string
  refresh_token: string
}
export type LoginInitState = Token

export type LoginAction =
  | {
      type: 'login/getToken'
      payload: Token
    }
  | {
      type: 'login/logout'
    }
// -------------------------------profile----------------------------------------
export type ProfileInitState = {
  user: User
  userProfile: UserProfile
}
export type User = {
  id: string
  name: string
  photo: string
  is_media: string
  intro: string
  certi: string
  art_count: string
  follow_count: string
  fans_count: string
  like_count: string
}
export type UserProfile = {
  id: string
  name: string
  photo: string
  mobile: string
  gender: number
  birthday: string
  intro: string
}

export type UserAction = {
  type: 'profile/getUser'
  payload: User
}
export type UserProfileAction =
  | {
      type: 'profile/getUserProfile'
      payload: UserProfile
    }
  | {
      type: 'profile/clearUserProfile'
      payload: ''
    }
// -----------------------------------home---------------------
export type HomeAction =
  | {
      type: 'home/getChannels'
      payload: Channel[]
    }
  | {
      type: 'home/getAllChannels'
      payload: Channel[]
    }
  | {
      type: 'home/changeActive'
      payload: number
    }
  | {
      type: 'home/saveChangeActives'
      payload: {
        channel_id: number
        timestamp: string
        articles: Article[]
      }
    }
  | {
      type: 'home/refreshChannelArticles'
      payload: {
        channel_id: number
        timestamp: string
        articles: Article[]
      }
    }

export type Home = {
  userChannels: Channel[]
  allChannels: Channel[]
  active: number
  channelActive: {
    [key: number]: {
      timestamp: string
      articles: Article[]
    }
  }
}

export type Channel = {
  id: number
  name: string
}

export type Article = {
  art_id: string
  title: string
  aut_id: string
  comm_count: string
  pubdate: string
  aut_name: string
  is_top: number
  cover: {
    type: 0 | 1 | 3
    images: string[]
  }
}
// --------------------------------search------------------------
type searchInitType = {
  suggestionList: searchSuggestion
  historyList: History
  searchResult: SearchResultType
}

type SearchResultType = {
  page: number
  per_page: number
  results: Article[]
  total_count: number
}

type searchAction =
  | {
      type: 'search/getSuggestionList'
      payload: searchSuggestion
    }
  | {
      type: 'search/setHistory'
      payload: History
    }
  | {
      type: 'search/clearHistory'
    }
  | {
      type: 'search/delHistory'
      payload: History
    }
  | {
      type: 'search/getSearchResults'
      payload: SearchResultType
    }
  | {
      type: 'search/clearSearchResults'
    }
// --------------------------------------article------------------------
type ArticleAction = {
  type: 'article/getArticleInfo'
  payload: ArticleDetail
}

// 文章详情
export type ArticleDetail = {
  art_id: string
  attitude: number
  aut_id: string
  aut_name: string
  aut_photo: string
  comm_count: number
  content: string
  is_collected: boolean
  is_followed: boolean
  like_count: number
  pubdate: string
  read_count: number
  title: string
}
