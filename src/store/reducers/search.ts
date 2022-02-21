import { searchAction, searchInitType } from '@/types/store'

const initialState: searchInitType = {
  suggestionList: [],
  historyList: [],
}

const search = (prevState = initialState, action: searchAction) => {
  switch (action.type) {
    case 'search/getSuggestionList':
      return { ...prevState, suggestionList: action.payload }
    case 'search/setHistory':
      return {
        ...prevState,
        historyList: action.payload,
      }
    case 'search/clearHistory':
      return {
        ...prevState,
        historyList: [],
      }
    case 'search/delHistory':
      return {
        ...prevState,
        historyList: action.payload,
      }
    default:
      return prevState
  }
}

export default search
