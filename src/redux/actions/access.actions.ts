import axios, { AxiosError } from 'axios'
import { ActionCreator } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  AccessActionTypes,

  LOG_IN_ACCESS,
  LogInAccessParametersServiceInterface,
  LogInSuccessReturnActionInterface,

  SIGN_UP_ACCESS,
  SignUpAccessParametersServiceInterface,
  // SignUpSignInUpInterface,
  // ReturnGetLocalStorageInterface,
  // ReturnSignUpSignInUpInterface,

  LOG_OUT_ACCESS,
  ReturnErrorInterface,

  GET_CURRENT_TOKEN,
  GetCurrentTokenSuccessReturnActionInterface,
  GET_IS_AUTHENTICATED,
  GetIsAuthenticatedSuccessReturnActionInterface
} from '../types'
import { accessService } from '../../services'
import { request, failure } from './common.actions'
import { setNotification } from './notification.actions'
import api from '../../services/api'

const logInSuccess: ActionCreator<AccessActionTypes> = (success: LogInSuccessReturnActionInterface) => {
  return { type: LOG_IN_ACCESS, payload: { success, failure: null } }
}
const logInFailure: ActionCreator<AccessActionTypes> = (failure: ReturnErrorInterface) => {
  return { type: LOG_IN_ACCESS, payload: { success: null, failure } }
}

const signUpSuccess: ActionCreator<AccessActionTypes> = () => {
  return { type: SIGN_UP_ACCESS, payload: { failure: null } }
}
const signUpFailure: ActionCreator<AccessActionTypes> = (failure: ReturnErrorInterface) => {
  return { type: SIGN_UP_ACCESS, payload: { failure } }
}

const logOutSuccess: ActionCreator<AccessActionTypes> = () => {
  return { type: LOG_OUT_ACCESS, payload: { failure: null } }
}
const logOutFailure: ActionCreator<AccessActionTypes> = (failure: ReturnErrorInterface) => {
  return { type: LOG_OUT_ACCESS, payload: { failure } }
}

const getCurrentTokenSuccess: ActionCreator<AccessActionTypes> = (success: GetCurrentTokenSuccessReturnActionInterface) => {
  return { type: GET_CURRENT_TOKEN, payload: { success, failure: null } }
}
const getCurrentTokenFailure: ActionCreator<AccessActionTypes> = (failure: ReturnErrorInterface) => {
  return { type: GET_CURRENT_TOKEN, payload: { success: null, failure } }
}

const getIsAuthenticatedSuccess: ActionCreator<AccessActionTypes> = (success: GetIsAuthenticatedSuccessReturnActionInterface) => {
  return { type: GET_IS_AUTHENTICATED, payload: { success } }
}

export function logInAccess(logIn: LogInAccessParametersServiceInterface) {
  return async dispatch => {
    dispatch(request())
    return accessService.logIn(logIn)
      .then(
        async response => {
          const token = response.data?.success?.token
          const user = {
            id: response.data?.success?.user?.id,
            userLogin: response.data?.success?.user?.user_login,
            displayName: response.data?.success?.user?.display_name,
            userEmail: response.data?.success?.user?.user_email
          }

          api.defaults.headers.Authorization = `Bearer ${token}`

          await AsyncStorage.multiSet([
            ['@PosicionamentoAuth:token', token],
            ['@PosicionamentoAuth:user', JSON.stringify(user)]
          ])

          dispatch(logInSuccess({ token }))
        },
        err => {
          let returnError = { status: 0, message: 'Error ao logar' }
          if (axios.isAxiosError(err)) {
            err as AxiosError
            returnError.status = err.response?.status ?? returnError.status
            returnError.message = err.response?.data?.failure?.message ?? returnError.message
          }

          dispatch(setNotification({ message: returnError.message }))
          dispatch(logInFailure(returnError))
          dispatch(failure(returnError.message))
        }
      )
  }
}

export function signUp(signUp: SignUpAccessParametersServiceInterface) {
  return dispatch => {
    dispatch(request())
    return accessService.signUp(signUp)
      .then(
        response => {
          // response.data?.success?.user_id
          dispatch(signUpSuccess())
        },
        err => {
          let returnError = { status: 500, message: 'Error ao cadastrar usuário.' }
          if (axios.isAxiosError(err)) {
            err as AxiosError
            returnError.status = err.response?.status ?? returnError.status
            returnError.message = err.response?.data?.error ?? returnError.message
          }

          dispatch(setNotification({ message: returnError.message }))
          dispatch(signUpFailure(returnError))
          dispatch(failure(returnError.message))
        }
      )
  }
}

export function logOutAccess() {
  return async dispatch => {
    dispatch(request())
    return accessService.logOut()
      .then(
        async response => {

          delete api.defaults.headers.Authorization
          await AsyncStorage.clear()

          dispatch(logOutSuccess())
        },
        err => {
          let returnError = { status: 0, message: 'Error ao sair' }
          if (axios.isAxiosError(err)) {
            err as AxiosError
            returnError.status = err.response?.status ?? returnError.status
            returnError.message = err.response?.data?.error ?? returnError.message
          }

          dispatch(setNotification({ message: returnError.message }))
          dispatch(logOutFailure(returnError))
          dispatch(failure(returnError.message))
        }
      )
  }
}

export function getCurrentToken() {
  return async dispatch => {
    try {
      let token: string | null = null
      const storageToken = await AsyncStorage.getItem('@PosicionamentoAuth:token')
      if(storageToken) {
        token = storageToken
        api.defaults.headers.Authorization = `Bearer ${token}`
      }

      dispatch(getCurrentTokenSuccess({ token }))
    }
    catch(err) {
      let returnError = { status: 0, message: 'Error ao pegar o token salvo' }

      dispatch(setNotification({ message: returnError.message }))
      dispatch(getCurrentTokenFailure(returnError))
    }
  }
}

export function getIsAuthenticated() {
  return async dispatch => {
    dispatch(request())
    return accessService.getIsAuthenticated()
      .then(
        async response => {
          const isAuthenticated = response.data?.success?.isAuthenticated
          dispatch(getIsAuthenticatedSuccess({ isAuthenticated }))
        }
      )
  }
}
