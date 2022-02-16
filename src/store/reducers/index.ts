import { combineReducers } from 'redux'

import login from './login'
import profile from './profile'

const rootReducer = combineReducers({
  login,
  profile,
})

export default rootReducer
