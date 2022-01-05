import { HomeInterface, UPDATE_HOME, HomeActionTypes } from '../types'

const initialState: HomeInterface = {
  affirmations: null
}

export function homeReducer(state: HomeInterface = initialState, action: HomeActionTypes): HomeInterface {
  switch (action.type) {
    case UPDATE_HOME: {
      return {
        ...state,
        affirmations: action.payload.affirmations
      }
    }
    default:
      return state
  }
}
