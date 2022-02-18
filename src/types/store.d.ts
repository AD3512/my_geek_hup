// ------------------------------redux中的类型------------------------------------

import store from '@/store'

import { ThunkAction } from 'redux-thunk'

// -------------------------------通用类型----------------------------------------
export type RootState = ReturnType<typeof store.getState>

export type RootAction =
  | LoginAction
  | UserAction
  | UserProfileAction
  | HomeAction

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

export type Home = {
  userChannels: Channel[]
  allChannels: Channel[]
}

export type Channel = {
  id: string
  name: string
}
