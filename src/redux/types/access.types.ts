import { ReturnErrorInterface, ReturnOnlyErrorInterface } from './common.types'

export interface GetCurrentTokenSuccessReturnActionInterface {
  token: string
}

export interface GetIsAuthenticatedSuccessReturnActionInterface {
  isAuthenticated: boolean
}

export interface GetSignInParametersServiceInterface {
  userLogin: string
  userPass: string
}
export interface GetSignInReturnServiceInterface {
  token: string
  user: {
    id: number
    user_login: string
    display_name: string
    user_email: string
  }
}
export interface GetSignInSuccessReturnActionInterface {
  token: string
}

export interface PostSignUpParametersServiceInterface {
  userLogin: string
  userPass: string
  userEmail: string
  displayName: string
}
export interface PostSignUpReturnServiceInterface {
  created: boolean
}

export interface DeleteLogOutReturnServiceInterface {
  revoked: boolean
}

export const GET_CURRENT_TOKEN = 'GET_CURRENT_TOKEN'
export const GET_IS_AUTHENTICATED = 'GET_IS_AUTHENTICATED'
export const GET_SIGN_IN = 'GET_SIGN_IN'
export const POST_SIGN_UP = 'POST_SIGN_UP'
export const DELETE_LOG_OUT = 'DELETE_LOG_OUT'

interface GetCurrentTokenAction {
  type: typeof GET_CURRENT_TOKEN
  payload: {
    success: GetCurrentTokenSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}

interface GetSignInAction {
  type: typeof GET_SIGN_IN
  payload: {
    success: GetSignInSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}

interface PostSignUpAction {
  type: typeof POST_SIGN_UP
  payload: ReturnOnlyErrorInterface
}

interface GetIsAuthenticatedAction {
  type: typeof GET_IS_AUTHENTICATED
  payload: {
    success: GetIsAuthenticatedSuccessReturnActionInterface | null
  }
}

interface DeleteLogOutAction {
  type: typeof DELETE_LOG_OUT
  payload: ReturnOnlyErrorInterface
}

export interface AccessState {
  currentToken: string | null
  isAuthenticated: boolean | null
  getCurrentTokenError: ReturnErrorInterface | null
  getSignInError: ReturnErrorInterface | null
  postSignUpError: ReturnErrorInterface | null
  deleteLogOutError: ReturnErrorInterface | null
}

export type AccessActionTypes =
  | GetCurrentTokenAction
  | GetIsAuthenticatedAction
  | GetSignInAction
  | PostSignUpAction
  | DeleteLogOutAction
