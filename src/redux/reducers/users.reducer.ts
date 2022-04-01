import {
  USERS_ACTION_GET_CURRENT_USER,
  GET_USER_PROFILE,
  UserActionTypes,
  UserState
} from '../types'

const initialState: UserState = {
  currentUser: null,
  profile: null,
  getCurrentUserError: null,
  getUserProfileError: null
}

export function usersReducer(
  state: UserState = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case USERS_ACTION_GET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload?.user ?? null
      }
    }
    case GET_USER_PROFILE: {
      return {
        ...state,
        profile: action.payload.success?.profile ?? null,
        getUserProfileError: action.payload.failure
      }
    }
    default:
      return state
  }
}
