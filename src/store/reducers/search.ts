import { searchAction, searchInitType } from '@/types/store'

const initialState: searchInitType = {
  suggestionList: [],
  historyList: [],
  searchResult: {
    page: 1,
    per_page: 10,
    results: [],
    total_count: -1,
  },
} as searchInitType

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
    case 'search/getSearchResults':
      return {
        ...prevState,
        // searchResult: action.payload,
        searchResult: {
          ...action.payload,
          results: [
            ...prevState.searchResult.results,
            ...action.payload.results,
          ],
        },
      }
    case 'search/clearSearchResults':
      return {
        ...prevState,
        searchResult: {
          page: 1,
          per_page: 10,
          results: [],
          total_count: -1,
        },
      }
    default:
      return prevState
  }
}

export default search
