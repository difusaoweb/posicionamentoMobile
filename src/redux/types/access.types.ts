import { ReturnErrorInterface, ReturnOnlyErrorInterface } from './common.types'

export interface LogInAccessParametersServiceInterface {
  userLogin: string
  userPass: string
}
export interface LogInAccessReturnServiceInterface {
  token: string
  user: {
    id: number
    user_login: string
    display_name: string
    user_email: string
  }
}

export interface SignUpAccessParametersServiceInterface {
  userLogin: string
  userPass: string
  userEmail: string
  displayName: string
}
export interface SignUpAccessReturnServiceInterface {
  created: boolean
}

export interface LogOutAccessReturnServiceInterface {
  revoked: boolean
}

export interface LogInSuccessReturnActionInterface {
  token: string
}

export interface GetCurrentTokenSuccessReturnActionInterface {
  token: string
}

export interface GetIsAuthenticatedSuccessReturnActionInterface {
  isAuthenticated: boolean
}

export const LOG_IN_ACCESS = 'LOG_IN_ACCESS'
export const SIGN_UP_ACCESS = 'SIGN_UP_ACCESS'
export const LOG_OUT_ACCESS = 'LOG_OUT_ACCESS'
export const GET_CURRENT_TOKEN = 'GET_CURRENT_TOKEN'
export const GET_IS_AUTHENTICATED = 'GET_IS_AUTHENTICATED'

interface LogInAccessAction {
  type: typeof LOG_IN_ACCESS
  payload: {
    success: LogInSuccessReturnActionInterface | null,
    failure: ReturnErrorInterface | null
  }
}

interface SignUpAccessAction {
  type: typeof SIGN_UP_ACCESS
  payload: ReturnOnlyErrorInterface
}

interface LogOutAccessAction {
  type: typeof LOG_OUT_ACCESS
  payload: ReturnOnlyErrorInterface
}

interface GetCurrentTokenAction {
  type: typeof GET_CURRENT_TOKEN
  payload: {
    success: GetCurrentTokenSuccessReturnActionInterface | null,
    failure: ReturnErrorInterface | null
  }
}

interface GetIsAuthenticatedAction {
  type: typeof GET_IS_AUTHENTICATED
  payload: {
    success: GetIsAuthenticatedSuccessReturnActionInterface | null,
  }
}

export interface AccessState {
  currentToken: string | null
  isAuthenticated: boolean | null
  logInError: ReturnErrorInterface | null
  signUpError: ReturnErrorInterface | null
  logOutError: ReturnErrorInterface | null
  getCurrentTokenError: ReturnErrorInterface | null
}

export type AccessActionTypes = LogInAccessAction |
  SignUpAccessAction |
  LogOutAccessAction |
  GetCurrentTokenAction |
  GetIsAuthenticatedAction
