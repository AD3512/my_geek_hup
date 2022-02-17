import { LoginAction, LoginInitState } from '@/types/store'
import { getToken } from '@/utils/token'

const initialState: LoginInitState = getToken() || {
  token: '',
  refresh_token: '',
}

const login = (prevState = initialState, action: LoginAction) => {
  switch (action.type) {
    case 'login/getToken':
      return action.payload
    case 'login/logout':
      return initialState
    default:
      return prevState
  }
}

export default login
