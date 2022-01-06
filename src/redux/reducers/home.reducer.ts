import { AffirmationHomeInterface, UPDATE_HOME, HomeActionTypes } from '../types'

interface HomeState {
  affirmations: AffirmationHomeInterface[]
}

const initialState: HomeState = {
  affirmations: []
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
