import { RootAction, ProfileInitState } from '@/types/store'

const initialState: ProfileInitState = {
  user: {},
  userProfile: {},
} as ProfileInitState

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
