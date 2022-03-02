import {
  AccessState,
  AccessActionTypes,
  GET_CURRENT_TOKEN,
  GET_IS_AUTHENTICATED,
  GET_SIGN_IN,
  POST_SIGN_UP,
  DELETE_LOG_OUT
} from '../types'

const initialState: AccessState = {
  currentToken: null,
  isAuthenticated: null,
  getCurrentTokenError: null,
  getSignInError: null,
  postSignUpError: null,
  deleteLogOutError: null
}

export function accessReducer(
  state: AccessState = initialState,
  action: AccessActionTypes
): AccessState {
  switch (action.type) {
    case GET_CURRENT_TOKEN: {
      return {
        ...state,
        currentToken: action.payload.success?.token ?? null,
        getCurrentTokenError: action.payload.failure
      }
    }
    case GET_IS_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: action.payload.success?.isAuthenticated ?? null
      }
    }
    case GET_SIGN_IN: {
      return {
        ...state,
        currentToken: action.payload.success?.token ?? null,
        getSignInError: action.payload.failure
      }
    }
    case POST_SIGN_UP: {
      return {
        ...state,
        postSignUpError: action.payload.failure
      }
    }
    case DELETE_LOG_OUT: {
      return {
        ...state,
        deleteLogOutError: action.payload.failure
      }
    }
    default:
      return state
  }
}
