import { RootAction, searchInitType } from '@/types/store'

const initialState: searchInitType = {
  suggestionList: [],
}

const search = (prevState = initialState, action: RootAction) => {
  switch (action.type) {
    case 'search/getSuggestionList':
      return { ...initialState, suggestionList: action.payload }
    default:
      return prevState
  }
}

export default search
