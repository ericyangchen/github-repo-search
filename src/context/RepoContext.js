import { createContext, useContext, useReducer, useCallback } from 'react';
import { reducer, ACTIONS } from './RepoReducer';
import { getUser, getRepoList, getRepoDetail } from '../api/repo';

const RepoContext = createContext();

export const useRepo = () => useContext(RepoContext);

export const RepoProvider = ({ children }) => {
  const initialState = {
    loading: false,
    user: null,
    repo_list: null,
    sort_by: 'full_name',
    has_more_repo: false,
    repos: [],
    error: null,
  }
  // reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // set loading status
  const toggleLoading = (status) => {
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: status,
    })
  };

  // functions
  // get a new user's info and first batch of repo list
  const fetchFirstRepoList = useCallback(async (username, page, sortBy) => {
    toggleLoading(true);
    // await both api calls to finish loading
    const [resUser, resRepo] = await Promise.all([
      getUser(username),
      getRepoList(username, page, sortBy)
    ]);
    // api call success
    if (resUser.status === 200 && resRepo.status === 200) {
      const hasMoreRepo = resRepo.data.length >= 10 ? true : false;
      dispatch({
        type: ACTIONS.NEW_USER,
        payload: {
          'user': resUser.data,
          'repo_list': resRepo.data,
          'has_more_repo': hasMoreRepo,
          'sort_by': sortBy,
          'repos': [],
          'error': null
        }
      })
    }
    // api call failed
    else {
      dispatch({
        type: ACTIONS.CLEAR_ALL_INFO,
      })
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: {
          'user': resUser.status,
          'repo_list': resRepo.status,
        }
      })
    }
    toggleLoading(false);
    console.log("CONTEXT FIRST BATCH");
  }, []);
  const fetchNextRepoList = useCallback(async (username, page, sortBy) => {
    toggleLoading(true);
    const res = await getRepoList(username, page, sortBy);
    // api call success
    if (res.status === 200) {
      dispatch({
        type: ACTIONS.ADD_REPO_LIST,
        payload: res.data
      })
      // check has more repo (to load)
      const hasMoreRepo = res.data.length >= 10 ? true : false;
      dispatch({
        type: ACTIONS.SET_HAS_MORE_REPO,
        payload: hasMoreRepo
      })
    }
    // api call failed
    else {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: {
          'repo_list': res.status
        }
      })
    }
    toggleLoading(false);
    console.log("CONTEXT NEXT BATCH");
  }, []);
  const fetchRepoDetail = useCallback(async (username, repo) => {
    toggleLoading(true);
    let res = await getRepoDetail(username, repo);
    if (res.status === 200) {
      dispatch({
        type: ACTIONS.ADD_REPOS,
        payload: res.data,
      })
    }
    toggleLoading(false);
    console.log("CONTEXT DETAIL");
  }, []);


  const value = {
    loading: state.loading,
    user: state.user,
    repo_list: state.repo_list,
    sort_by: state.sort_by,
    has_more_repo: state.has_more_repo,
    repos: state.repos,
    error: state.error,
    fetchFirstRepoList,
    fetchNextRepoList,
    fetchRepoDetail,
  }
  return (
    <RepoContext.Provider value={value}>
      {children}
    </RepoContext.Provider>
  );
}