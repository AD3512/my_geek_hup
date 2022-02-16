import { RootAction, ProfileInitState } from '@/types/store'

const initialState: ProfileInitState = {
  user: {
    id: '',
    name: '',
    photo: '',
    is_media: '',
    intro: '',
    certi: '',
    art_count: '',
    follow_count: '',
    fans_count: '',
    like_count: '',
  },
  userProfile: {
    id: '',
    name: '',
    photo: '',
    mobile: '',
    gender: 0,
    birthday: '',
    intro: '',
  },
}

const profile = (prevState = initialState, action: RootAction) => {
  switch (action.type) {
    case 'profile/getUser':
      return {
        ...prevState,
        user: action.payload,
      }
    case 'profile/getUserProfile':
      return {
        ...prevState,
        userProfile: action.payload,
      }
    case 'profile/clearUserProfile':
      return prevState
    default:
      return prevState
  }
}

export default profile
