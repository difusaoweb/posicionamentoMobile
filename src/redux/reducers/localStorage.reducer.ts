import {
  LocalStorageInterface,
  LocalStorageActionTypes,
  GET_LOCAL_STORAGE,
  SET_LOCAL_STORAGE
} from '../types'

const initialState: LocalStorageInterface = {
  token: null,
  user: null
}

export function localStorageReducer(state: LocalStorageInterface = initialState, action: LocalStorageActionTypes): LocalStorageInterface {
  switch (action.type) {
    case GET_LOCAL_STORAGE:
    case SET_LOCAL_STORAGE: {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      }
    }
    default:
      return state
  }
}
