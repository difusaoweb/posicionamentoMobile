import {
  AffirmationActionTypes,
  AffirmationState,
  GET_AFFIRMATIONS_HOME,
  GET_AFFIRMATIONS_TRENDING,
  GET_AFFIRMATIONS_SEARCH,
  POST_AFFIRMATION_ADD,
  GET_AFFIRMATION_SINGLE,
  AFFIRMATION_PUT_OPINION_AFFIRMATION_LOCAL
} from '../types'

const initialState: AffirmationState = {
  homeAffirmations: null,
  homeAffirmationsLastPage: null,
  trendingAffirmations: null,
  searchAffirmations: null,
  affirmationSingle: null,
  getAffirmationsHomeError: null,
  getAffirmationsTrendingError: null,
  getAffirmationsSearchError: null,
  getAffirmationSingleError: null,
  postAffirmationAddError: null
}

export function affirmationsReducer(
  state: AffirmationState = initialState,
  action: AffirmationActionTypes
): AffirmationState {
  switch (action.type) {
    case GET_AFFIRMATIONS_HOME: {
      let homeAffirmations = state.homeAffirmations
      if (action.payload.success?.affirmations) {
        if (homeAffirmations) {
          homeAffirmations = homeAffirmations.concat(
            action.payload.success.affirmations
          )
        } else {
          homeAffirmations = action.payload.success.affirmations
        }
      }

      let homeAffirmationsLastPage = null
      if (action.payload.success?.lastPage) {
        homeAffirmationsLastPage = action.payload.success.lastPage + 1
      }

      return {
        ...state,
        homeAffirmations: homeAffirmations,
        homeAffirmationsLastPage: homeAffirmationsLastPage,
        getAffirmationsHomeError: action.payload.failure
      }
    }
    case GET_AFFIRMATIONS_TRENDING: {
      return {
        ...state,
        trendingAffirmations: action.payload.success?.affirmations ?? null,
        getAffirmationsTrendingError: action.payload.failure
      }
    }
    case GET_AFFIRMATIONS_SEARCH: {
      return {
        ...state,
        searchAffirmations: action.payload.success?.affirmations ?? null,
        getAffirmationsSearchError: action.payload.failure
      }
    }
    case POST_AFFIRMATION_ADD: {
      return {
        ...state,
        postAffirmationAddError: action.payload.failure
      }
    }
    case GET_AFFIRMATION_SINGLE: {
      return {
        ...state,
        affirmationSingle: action.payload.success?.affirmation ?? null,
        getAffirmationSingleError: action.payload.failure
      }
    }
    case AFFIRMATION_PUT_OPINION_AFFIRMATION_LOCAL: {
      const affirmationSingle = state.affirmationSingle
      if (affirmationSingle) {
        affirmationSingle.opinion = action.payload
      }

      return {
        ...state,
        affirmationSingle: affirmationSingle
      }
    }
    default:
      return state
  }
}
