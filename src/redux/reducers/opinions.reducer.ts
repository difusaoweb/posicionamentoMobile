import {
  GET_OPINIONS_USER,
  GET_OPINIONS_AFFIRMATION,
  SET_OPINION_AFFIRMATION,
  OpinionActionTypes,
  OpinionState
} from '../types'

const initialState: OpinionState = {
  opinionsUser: null,
  opinionsAffirmation: null,
  getOpinionsUserError: null,
  getOpinionsAffirmationError: null,
  setOpinionAffirmationError: null
}

export function opinionsReducer(state: OpinionState = initialState, action: OpinionActionTypes): OpinionState {
  switch (action.type) {
    case GET_OPINIONS_AFFIRMATION: {
      return {
        ...state,
        opinionsAffirmation: action.payload.success?.opinions ?? null,
        getOpinionsAffirmationError: action.payload.failure
      }
    }
    case GET_OPINIONS_USER: {
      return {
        ...state,
        opinionsUser: action.payload.success?.opinions ?? null,
        getOpinionsUserError: action.payload.failure
      }
    }
    case SET_OPINION_AFFIRMATION: {
      return {
        ...state,
        setOpinionAffirmationError: action.payload.failure
      }
    }
    default:
      return state
  }
}
