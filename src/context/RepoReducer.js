export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  NEW_USER: 'NEW_USER',
  ADD_REPO_LIST: 'ADD_REPO_LIST',
  SET_HAS_MORE_REPO: 'SET_HAS_MORE_REPO',
  CLEAR_ALL_INFO: 'CLEAR_ALL_INFO',
  SET_ERROR: 'SET_ERROR',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case ACTIONS.NEW_USER:
      return {
        ...state,
        ...action.payload,
      }
    case ACTIONS.ADD_REPO_LIST:
      return {
        ...state,
        repo_list: [...state.repo_list, ...action.payload],
      }
    case ACTIONS.SET_HAS_MORE_REPO:
      return {
        ...state,
        has_more_repo: action.payload,
      }
    case ACTIONS.CLEAR_ALL_INFO:
      return {
        ...state,
        user: null,
        repo_list: null,
        sort_by: 'full_name',
        has_more_repo: false,
        repos: [],
        error: null,
      }
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload
      }

    
    
    
    
    
    
    case ACTIONS.ADD_REPOS:
      return {
        ...state,
        repos: [...state.repos, action.payload],
      }
    default:
      return state
  }
}