import { HomeAction, Home } from '@/types/store'

const initialState: Home = {
  userChannels: [
    {
      id: '',
      name: '',
    },
  ],
  allChannels: [
    {
      id: '',
      name: '',
    },
  ],
}

const home = (prevState = initialState, action: HomeAction) => {
  switch (action.type) {
    case 'home/getChannels':
      return { ...prevState, userChannels: action.payload }
    case 'home/getAllChannels':
      return { ...prevState, allChannels: action.payload }
    default:
      return prevState
  }
}

export default home
