import {
  LOG_IN_ACCESS,
  SIGN_UP_ACCESS,
  LOG_OUT_ACCESS,
  AccessActionTypes,
  AccessState,
  GET_CURRENT_TOKEN,
  GET_IS_AUTHENTICATED
} from '../types'

const initialState: AccessState = {
  currentToken: null,
  isAuthenticated: null,
  logInError: null,
  signUpError: null,
  logOutError: null,
  getCurrentTokenError: null,
}

export function accessReducer(state: AccessState = initialState, action: AccessActionTypes): AccessState {
  switch (action.type) {
    case LOG_IN_ACCESS: {
      return {
        ...state,
        currentToken: action.payload.success?.token ?? null,
        logInError: action.payload.failure
      }
    }
    case SIGN_UP_ACCESS: {
      return {
        ...state,
        signUpError: action.payload.failure
      }
    }
    case LOG_OUT_ACCESS: {
      return {
        ...state,
        logOutError: action.payload.failure
      }
    }
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
        isAuthenticated: action.payload.success?.isAuthenticated ?? null,
      }
    }
    default:
      return state
  }
}
