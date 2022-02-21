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
  channelActive: {},
}

const home = (prevState = initialState, action: HomeAction): Home => {
  switch (action.type) {
    case 'home/getChannels':
      return { ...prevState, userChannels: action.payload }
    case 'home/getAllChannels':
      return { ...prevState, allChannels: action.payload }
    case 'home/changeActive':
      return { ...prevState, active: action.payload }
    case 'home/saveChangeActives': {
      const { channel_id, articles, timestamp } = action.payload
      const old = prevState.channelActive[channel_id]?.articles || []
      return {
        ...prevState,
        channelActive: {
          [channel_id]: {
            timestamp,
            articles: [...old, ...articles],
          },
        },
      }
    }
    case 'home/refreshChannelArticles': {
      const { channel_id, articles, timestamp } = action.payload
      const channelActive = prevState.channelActive
      // console.log(timestamp, articles, 7777777777)

      return {
        ...prevState,
        channelActive: {
          ...channelActive,
          [channel_id]: {
            timestamp,
            articles: [...articles],
          },
        },
      }
    }
    default:
      return prevState
  }
}

export default home
