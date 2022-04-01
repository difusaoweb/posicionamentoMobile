import { ReturnErrorInterface, ReturnOnlyErrorInterface } from './common.types'

export interface AccessActionGetCurrentTokenParameters {
  token: string
}

export interface AccessActionIsAuthenticatedParameters {
  isAuthenticated: boolean
}

export interface GetLogInParametersServiceInterface {
  userLogin: string
  userPass: string
}
export interface GetLogInReturnServiceInterface {
  token: string
  user: {
    id: number
    user_login: string
    display_name: string
    user_email: string
  }
}
export interface GetLogInSuccessReturnActionInterface {
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

export interface AccessResetPasswordParameters {
  userLogin: string
}

export const ACCESS_GET_CURRENT_TOKEN = 'ACCESS_GET_CURRENT_TOKEN'
export const ACCESS_GET_IS_AUTHENTICATED = 'ACCESS_GET_IS_AUTHENTICATED'
export const GET_SIGN_IN = 'GET_SIGN_IN'
export const POST_SIGN_UP = 'POST_SIGN_UP'
export const DELETE_LOG_OUT = 'DELETE_LOG_OUT'
export const ACCESS_RESET_PASSWORD = 'ACCESS_RESET_PASSWORD'

interface AccessActionGetCurrentToken {
  type: typeof ACCESS_GET_CURRENT_TOKEN
  payload: AccessActionGetCurrentTokenParameters | null
}

interface AccessActionGetIsAuthenticated {
  type: typeof ACCESS_GET_IS_AUTHENTICATED
  payload: AccessActionIsAuthenticatedParameters | null
}

interface GetLogInAction {
  type: typeof GET_SIGN_IN
  payload: {
    success: GetLogInSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}

interface PostSignUpAction {
  type: typeof POST_SIGN_UP
  payload: ReturnOnlyErrorInterface
}

interface DeleteLogOutAction {
  type: typeof DELETE_LOG_OUT
  payload: ReturnOnlyErrorInterface
}

interface AccessResetPassword {
  type: typeof ACCESS_RESET_PASSWORD
  payload: boolean | null
}

export interface AccessState {
  currentToken: string | null
  isAuthenticated: boolean | null
  getCurrentTokenError: ReturnErrorInterface | null
  getLogInError: ReturnErrorInterface | null
  postSignUpError: ReturnErrorInterface | null
  deleteLogOutError: ReturnErrorInterface | null
  resetPassword: boolean | null
}

export type AccessActionTypes =
  | AccessActionGetCurrentToken
  | AccessActionGetIsAuthenticated
  | GetLogInAction
  | PostSignUpAction
  | DeleteLogOutAction
  | DeleteLogOutAction
  | AccessResetPassword
