import { AffirmationHomeInterface, UPDATE_HOME, HomeActionTypes } from '../types'

interface HomeState {
  affirmations: AffirmationHomeInterface[] | null
}

const initialState: HomeState = {
  affirmations: null
}

export function homeReducer(state: HomeState = initialState, action: HomeActionTypes): HomeState {
  switch (action.type) {
    case UPDATE_HOME: {
      return {
        ...state,
        affirmations: action.payload
      }
    }
    default:
      return state
  }
}
