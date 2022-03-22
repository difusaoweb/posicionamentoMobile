import axios, { AxiosError } from 'axios'
import { ActionCreator } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  AccessActionTypes,
  GET_CURRENT_TOKEN,
  GetCurrentTokenSuccessReturnActionInterface,
  GET_IS_AUTHENTICATED,
  GetIsAuthenticatedSuccessReturnActionInterface,
  GET_SIGN_IN,
  GetSignInParametersServiceInterface,
  GetSignInSuccessReturnActionInterface,
  POST_SIGN_UP,
  PostSignUpParametersServiceInterface,
  ReturnErrorInterface,
  DELETE_LOG_OUT
} from '../types'
import { accessService } from '../../services'
import { request, failure } from './common.actions'
import { setNotification } from './notification.actions'
import api from '../../services/api'

const getCurrentTokenSuccess: ActionCreator<AccessActionTypes> = (
  success: GetCurrentTokenSuccessReturnActionInterface
) => {
  return { type: GET_CURRENT_TOKEN, payload: { success, failure: null } }
}
const getCurrentTokenFailure: ActionCreator<AccessActionTypes> = (
  failure: ReturnErrorInterface
) => {
  return { type: GET_CURRENT_TOKEN, payload: { success: null, failure } }
}

const getIsAuthenticatedSuccess: ActionCreator<AccessActionTypes> = (
  success: GetIsAuthenticatedSuccessReturnActionInterface
) => {
  return { type: GET_IS_AUTHENTICATED, payload: { success } }
}

const getSignInSuccess: ActionCreator<AccessActionTypes> = (
  success: GetSignInSuccessReturnActionInterface
) => {
  return { type: GET_SIGN_IN, payload: { success, failure: null } }
}

const postSignUpSuccess: ActionCreator<AccessActionTypes> = () => {
  return { type: POST_SIGN_UP, payload: { failure: null } }
}
const postSignUpFailure: ActionCreator<AccessActionTypes> = (
  failure: ReturnErrorInterface
) => {
  return { type: POST_SIGN_UP, payload: { failure } }
}

const deleteLogOutSuccess: ActionCreator<AccessActionTypes> = () => {
  return { type: DELETE_LOG_OUT, payload: { failure: null } }
}

export function getCurrentToken() {
  return async dispatch => {
    try {
      let token: string | null = null
      const storageToken = await AsyncStorage.getItem(
        '@PosicionamentoAuth:token'
      )
      if (storageToken) {
        token = storageToken
        api.defaults.headers.Authorization = `Bearer ${token}`
      }

      dispatch(getCurrentTokenSuccess({ token }))
    } catch (err) {
      const returnError = { status: 500, message: 'error get stored token' }

      dispatch(setNotification({ message: returnError.message }))
      dispatch(getCurrentTokenFailure(returnError))
    }
  }
}

export function getIsAuthenticated() {
  return async dispatch => {
    try {
      dispatch(request())

      const { data } = await accessService.getIsAuthenticated()
      const isAuthenticated = data?.success?.isAuthenticated

      dispatch(getIsAuthenticatedSuccess({ isAuthenticated }))
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'Error checking authentication.'
      }
      if (axios.isAxiosError(err)) {
        err as AxiosError
        returnError.status = err.response?.status ?? returnError.status
        returnError.message =
          err.response?.data?.failure?.message ?? returnError.message
      }

      dispatch(setNotification({ message: returnError.message }))
      dispatch(getCurrentTokenFailure(returnError))
    }
  }
}

export function getSignIn({
  userLogin,
  userPass
}: GetSignInParametersServiceInterface) {
  return async dispatch => {
    try {
      dispatch(request())

      const { data } = await accessService.getSignIn({ userLogin, userPass })
      const token = data?.success?.token
      const user = {
        id: data?.success?.user?.id,
        userLogin: data?.success?.user?.user_login,
        displayName: data?.success?.user?.display_name,
        userEmail: data?.success?.user?.user_email
      }

      api.defaults.headers.Authorization = `Bearer ${token}`

      await AsyncStorage.multiSet([
        ['@PosicionamentoAuth:token', token],
        ['@PosicionamentoAuth:user', JSON.stringify(user)]
      ])

      dispatch(getSignInSuccess({ token }))
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'Error when sign in'
      }
      if (axios.isAxiosError(err)) {
        err as AxiosError
        returnError.status = err.response?.status ?? returnError.status
        returnError.message =
          err.response?.data?.failure?.message ?? returnError.message
      }

      dispatch(setNotification({ message: returnError.message }))
      dispatch(failure(returnError.message))
    }
  }
}

export function postSignUp({
  userLogin,
  userPass,
  userEmail,
  displayName
}: PostSignUpParametersServiceInterface) {
  return async dispatch => {
    try {
      dispatch(request())

      const { data } = await accessService.postSignUp({
        userLogin,
        userPass,
        userEmail,
        displayName
      })
      const userId = data?.success?.user_id

      dispatch(postSignUpSuccess({ userId }))
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'error when sign up'
      }
      if (axios.isAxiosError(err)) {
        err as AxiosError
        returnError.status = err.response?.status ?? returnError.status
        returnError.message =
          err.response?.data?.failure?.message ?? returnError.message
      }

      dispatch(setNotification({ message: returnError.message }))
      dispatch(postSignUpFailure(returnError))
      dispatch(failure(returnError.message))
    }
  }
}

export function deleteLogOut() {
  return async dispatch => {
    try {
      dispatch(request())

      await accessService.deleteLogOut()
      delete api.defaults.headers.Authorization
      await AsyncStorage.clear()

      dispatch(deleteLogOutSuccess())
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'error when log out'
      }
      if (axios.isAxiosError(err)) {
        err as AxiosError
        returnError.status = err.response?.status ?? returnError.status
        returnError.message =
          err.response?.data?.failure?.message ?? returnError.message
      }

      dispatch(setNotification({ message: returnError.message }))
      dispatch(failure(returnError.message))
    }
  }
}
