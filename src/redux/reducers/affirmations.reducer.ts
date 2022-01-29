import {
  GET_AFFIRMATIONS_HOME,
  AffirmationActionTypes,
  AffirmationState
} from '../types'

const initialState: AffirmationState = {
  affirmationsHome: null,
  getAffirmationsHomeError: null
}

export function affirmationsReducer(state: AffirmationState = initialState, action: AffirmationActionTypes): AffirmationState {
  switch (action.type) {
    case GET_AFFIRMATIONS_HOME: {
      return {
        ...state,
        affirmationsHome: action.payload.success?.affirmations ?? null,
        getAffirmationsHomeError: action.payload.failure
      }
    }
    default:
      return state
  }
}
