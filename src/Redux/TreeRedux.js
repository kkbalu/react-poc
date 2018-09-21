import { createReducer, createActions } from 'reduxsauce'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  treeRequest: ['page'],
  treeSuccess: ['nowPlaying'],
  treeFailure: null
})

export const TreeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  page: 1,
  fetching: null,
  nowPlaying: [],
  error: null
}

/* ------------- Selectors ------------- */

export const MoviesSelectors = {
  getMovies: state => state.nowPlaying
}

/* ------------- Reducers ------------- */

// request the data from an api

export const request = (state, { page }) =>
  (state = {
    fetching: true,
    page,
    nowPlaying: page === 1 ? [] : state.nowPlaying
  })

// successful api lookup
export const success = (state, action) => {
  console.log(state);
  state.nowPlaying = [];
  const { nowPlaying } = action
  let mergedNowPlaying = state.nowPlaying.concat(nowPlaying)
  return (state = {
    fetching: false,
    error: null,
    page: nowPlaying.page,
    totalPages: nowPlaying.total_pages,
    totalMovies: nowPlaying.total_results,
    nowPlaying: [...mergedNowPlaying]
  })
}

// Something went wrong somewhere.
export const failure = state => (state = { fetching: false, error: true, nowPlaying: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TREE_REQUEST]: request,
  [Types.TREE_SUCCESS]: success,
  [Types.TREE_FAILURE]: failure
})
