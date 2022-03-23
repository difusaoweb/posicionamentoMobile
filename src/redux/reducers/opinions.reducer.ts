import {
  GET_OPINIONS_AFFIRMATION,
  GET_OPINION_AFFIRMATION,
  SET_OPINION_AFFIRMATION,
  DELETE_OPINION_AFFIRMATION,
  GET_OPINIONS_USER,
  OpinionActionTypes,
  OpinionState
} from '../types'

const initialState: OpinionState = {
  affirmationCurrentOpinionValue: null,
  affirmationBeforeCurrentOpinionValue: null,
  affirmationDeletedOpinionValue: null,

  affirmationOpinions: null,
  userOpinions: null,

  getOpinionsAffirmationError: null,
  setOpinionAffirmationError: null,
  deleteOpinionAffirmationError: null,
  getOpinionsUserError: null
}

export function opinionsReducer(
  state: OpinionState = initialState,
  action: OpinionActionTypes
): OpinionState {
  switch (action.type) {
    case GET_OPINIONS_AFFIRMATION: {
      return {
        ...state,
        affirmationOpinions: action.payload.success?.opinions ?? null,
        getOpinionsAffirmationError: action.payload.failure
      }
    }
    case GET_OPINION_AFFIRMATION: {
      return {
        ...state,
        affirmationCurrentOpinionValue:
          action.payload.success?.opinionValue ?? null
      }
    }
    case SET_OPINION_AFFIRMATION: {
      return {
        ...state,
        affirmationCurrentOpinionValue:
          action.payload.success?.opinionValue ?? null,
        affirmationBeforeCurrentOpinionValue:
          state.affirmationCurrentOpinionValue,
        setOpinionAffirmationError: action.payload.failure
      }
    }
    case DELETE_OPINION_AFFIRMATION: {
      return {
        ...state,
        affirmationDeletedOpinionValue:
          action.payload.success?.opinionValue ?? null,
        affirmationCurrentOpinionValue: null,
        affirmationBeforeCurrentOpinionValue: null,
        deleteOpinionAffirmationError: action.payload.failure
      }
    }
    case GET_OPINIONS_USER: {
      return {
        ...state,
        userOpinions: action.payload.success?.opinions ?? null,
        getOpinionsUserError: action.payload.failure
      }
    }
    default:
      return state
  }
}
