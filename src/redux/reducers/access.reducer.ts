import {
  AccessState,
  AccessActionTypes,
  ACCESS_GET_CURRENT_TOKEN,
  ACCESS_GET_IS_AUTHENTICATED,
  GET_SIGN_IN,
  POST_SIGN_UP,
  DELETE_LOG_OUT,
  ACCESS_RESET_PASSWORD
} from '../types'

const initialState: AccessState = {
  currentToken: null,
  isAuthenticated: null,
  getCurrentTokenError: null,
  getLogInError: null,
  postSignUpError: null,
  deleteLogOutError: null,
  resetPassword: null
}

export function accessReducer(
  state: AccessState = initialState,
  action: AccessActionTypes
): AccessState {
  switch (action.type) {
    case ACCESS_GET_CURRENT_TOKEN: {
      return {
        ...state,
        currentToken: action.payload?.token ?? null
      }
    }
    case ACCESS_GET_IS_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: action.payload?.isAuthenticated ?? null,
        currentToken: action.payload?.isAuthenticated
          ? state.currentToken
          : null
      }
    }
    case GET_SIGN_IN: {
      return {
        ...state,
        currentToken: action.payload.success?.token ?? null,
        getLogInError: action.payload.failure
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
        currentToken: null,
        isAuthenticated: null,
        deleteLogOutError: action.payload.failure
      }
    }
    case ACCESS_RESET_PASSWORD: {
      return {
        ...state,
        resetPassword: action.payload ?? null
      }
    }
    default:
      return state
  }
}
