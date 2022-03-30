import {
  SET_CURRENT_OPINION_VALUE_AFFIRMATION,
  UPDATE_OPINION_BUTTON_PRESSED_AFFIRMATION,
  SET_OPINION_AFFIRMATION,
  DELETE_OPINION_AFFIRMATION,
  GET_OPINIONS_AFFIRMATION,
  GET_OPINIONS_USER,
  OpinionActionTypes,
  OpinionState
} from '../types'

const initialState: OpinionState = {
  affirmationCurrentOpinionValue: null,
  affirmationButtonOpinionPressed: false,
  affirmationBeforeCurrentOpinionValue: null,
  affirmationDeletedOpinionValue: null,

  affirmationOpinions: null,
  userOpinions: null,

  deleteOpinionAffirmationError: null,
  setOpinionAffirmationError: null,
  getOpinionsAffirmationError: null,
  getOpinionsUserError: null
}

export function opinionsReducer(
  state: OpinionState = initialState,
  action: OpinionActionTypes
): OpinionState {
  switch (action.type) {
    case SET_CURRENT_OPINION_VALUE_AFFIRMATION: {
      return {
        ...state,
        affirmationBeforeCurrentOpinionValue: action.payload,
        affirmationCurrentOpinionValue: action.payload
      }
    }
    case UPDATE_OPINION_BUTTON_PRESSED_AFFIRMATION: {
      return {
        ...state,
        affirmationButtonOpinionPressed: action.payload
      }
    }
    case SET_OPINION_AFFIRMATION: {
      return {
        ...state,
        affirmationBeforeCurrentOpinionValue:
          state.affirmationCurrentOpinionValue,
        affirmationCurrentOpinionValue:
          action.payload.success?.opinionValue ?? null,
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
    case GET_OPINIONS_AFFIRMATION: {
      return {
        ...state,
        affirmationOpinions: action.payload.success?.opinions ?? null,
        getOpinionsAffirmationError: action.payload.failure
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
