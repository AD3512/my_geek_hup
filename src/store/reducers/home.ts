import { HomeAction, Home } from '@/types/store'

const initialState: Home = {
  userChannels: [
    {
      id: 0,
      name: '',
    },
  ],
  allChannels: [
    {
      id: 0,
      name: '',
    },
  ],
  active: 0,
}

const home = (prevState = initialState, action: HomeAction) => {
  switch (action.type) {
    case 'home/getChannels':
      return { ...prevState, userChannels: action.payload }
    case 'home/getAllChannels':
      return { ...prevState, allChannels: action.payload }
    case 'home/changeActive':
      return { ...prevState, active: action.payload }
    default:
      return prevState
  }
}

export default home
