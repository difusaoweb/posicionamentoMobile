import { ReturnErrorInterface } from './common.types'

export interface CurrentUserInterface {
  id: number
  userLogin: string
  displayName: string
  userEmail: string
  meta: {
    title: string
    avatar: string
    followers: number
    description: string
  }
}

export interface ProfileUserInterface {
  id: number
  userLogin: string
  displayName: string
  meta: {
    title: string
    avatar: string
    followers: number
    description: string
  }
}

export interface GetUserProfileParametersServiceInterface {
  userId: number
}

export interface GetCurrentUserSuccessReturnActionInterface {
  user: CurrentUserInterface
}

export interface GetUserProfileSuccessReturnActionInterface {
  profile: ProfileUserInterface
}

export const GET_CURRENT_USER = 'GET_CURRENT_USER'
export const GET_USER_PROFILE = 'GET_USER_PROFILE'

interface GetCurrentUserAction {
  type: typeof GET_CURRENT_USER
  payload: {
    success: GetCurrentUserSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}

interface GetUserProfileAction {
  type: typeof GET_USER_PROFILE
  payload: {
    success: GetUserProfileSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}

export interface UserState {
  currentUser: CurrentUserInterface | null
  profile: ProfileUserInterface | null
  getCurrentUserError: ReturnErrorInterface | null
  getUserProfileError: ReturnErrorInterface | null
}

export type UserActionTypes = GetCurrentUserAction | GetUserProfileAction
