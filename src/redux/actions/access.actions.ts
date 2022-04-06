import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  AccessActionTypes,
  GET_SIGN_IN,
  GetLogInParametersServiceInterface,
  GetLogInSuccessReturnActionInterface,
  POST_SIGN_UP,
  PostSignUpParametersServiceInterface,
  ReturnErrorInterface,
  DELETE_LOG_OUT,
  AccessResetPasswordParameters,
  ACCESS_RESET_PASSWORD,
  AccessActionGetCurrentTokenParameters,
  AccessActionIsAuthenticatedParameters,
  ACCESS_GET_CURRENT_TOKEN,
  ACCESS_GET_IS_AUTHENTICATED,
  AccessResetPasswordVerifyCodeParameters,
  ACCESS_RESET_PASSWORD_VERIFY_CODE,
  AccessResetPasswordChangePasswordParameters,
  ACCESS_RESET_PASSWORD_CHANGE_PASSWORD,
  ACCESS_RESET_PASSWORD_CHANGE_PASSWORD_FINISHED
} from '../types'
import { accessService } from '../../services'
import { request, failure } from './common.actions'
import { setNotification } from './notification.actions'
import api from '../../services/api'
import { RootState } from '../store'

const accessActionGetCurrentToken: ActionCreator<AccessActionTypes> = (
  payload: AccessActionGetCurrentTokenParameters
) => {
  return { type: ACCESS_GET_CURRENT_TOKEN, payload }
}

const accessActionGetIsAuthenticated: ActionCreator<AccessActionTypes> = (
  payload: AccessActionIsAuthenticatedParameters
) => {
  return { type: ACCESS_GET_IS_AUTHENTICATED, payload }
}
const accessActionGetIsAuthenticatedFailure: ActionCreator<
  AccessActionTypes
> = () => {
  return { type: ACCESS_GET_IS_AUTHENTICATED, payload: null }
}

const getLogInSuccess: ActionCreator<AccessActionTypes> = (
  success: GetLogInSuccessReturnActionInterface
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

const accessActionResetPassword: ActionCreator<AccessActionTypes> = () => {
  return {
    type: ACCESS_RESET_PASSWORD,
    payload: true
  }
}

const accessActionResetPasswordVerifyCode: ActionCreator<AccessActionTypes> = (
  token: string
) => {
  return {
    type: ACCESS_RESET_PASSWORD_VERIFY_CODE,
    payload: token
  }
}

const accessActionResetPasswordChangePassword: ActionCreator<
  AccessActionTypes
> = () => {
  return {
    type: ACCESS_RESET_PASSWORD_CHANGE_PASSWORD,
    payload: true
  }
}

const accessActionResetPasswordFinished: ActionCreator<
  AccessActionTypes
> = () => {
  return { type: ACCESS_RESET_PASSWORD_CHANGE_PASSWORD_FINISHED }
}

export function accessGetCurrentToken() {
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

      dispatch(accessActionGetCurrentToken({ token }))
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'Error access get current token.'
      }

      dispatch(setNotification(returnError.message))
    }
  }
}

export function accessGetIsAuthenticated() {
  return async dispatch => {
    try {
      console.log('accessGetIsAuthenticated')
      await accessService.getIsAuthenticated()

      dispatch(accessActionGetIsAuthenticated({ isAuthenticated: true }))
    } catch (err) {
      console.log('accessGetIsAuthenticatedFailure')
      delete api.defaults.headers.Authorization
      await AsyncStorage.clear()
      dispatch(accessActionGetIsAuthenticatedFailure())
    }
  }
}

export function getLogIn({
  userLogin,
  userPass
}: GetLogInParametersServiceInterface) {
  return async dispatch => {
    try {
      dispatch(request())

      const { data } = await accessService.getLogIn({ userLogin, userPass })
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

      dispatch(getLogInSuccess({ token }))
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
  return async (dispatch: Dispatch) => {
    try {
      dispatch(request())

      await accessService.deleteLogOut()
      delete api.defaults.headers.Authorization
      await AsyncStorage.clear()

      dispatch(deleteLogOutSuccess())
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'Error when log out.'
      }
      if (axios.isAxiosError(err)) {
        err as AxiosError
        returnError.status = err.response?.status ?? returnError.status
        returnError.message =
          err.response?.data?.failure?.message ?? returnError.message
      }

      setNotification(returnError.message)
      dispatch(failure(returnError.message))
    }
  }
}

export function accessResetPassword({
  userLogin
}: AccessResetPasswordParameters) {
  return async dispatch => {
    try {
      await accessService.accessResetPassword({ userLogin })
      dispatch(accessActionResetPassword())
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        case 404:
          console.log('404')
          dispatch(
            setNotification('forgotPassword.forgotPasswordEmail.error.404')
          )
          break
        default:
          dispatch(setNotification('index.error.0'))
          break
      }
    }
  }
}

export function accessResetPasswordVerifyCode({
  token
}: AccessResetPasswordVerifyCodeParameters) {
  return async dispatch => {
    try {
      await accessService.accessResetPasswordVerifyCode({ token })
      dispatch(accessActionResetPasswordVerifyCode(token))
    } catch (err) {
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        case 404:
          dispatch(
            setNotification('forgotPassword.forgotPasswordVerifyCode.error.404')
          )
          break
        default:
          dispatch(setNotification('index.error.0'))
          break
      }
    }
  }
}

export function accessResetPasswordChangePassword({
  password
}: AccessResetPasswordChangePasswordParameters) {
  return async (dispatch, getState: RootState) => {
    try {
      const { resetPasswordToken } = getState().access

      await accessService.accessResetPasswordChangePassword({
        token: resetPasswordToken ?? '',
        password
      })
      dispatch(accessActionResetPasswordChangePassword())
    } catch (err) {
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        default:
          dispatch(setNotification('index.error.0'))
          break
      }
    }
  }
}

export const accessResetPasswordFinished = () => {
  return dispatch => {
    dispatch(accessActionResetPasswordFinished())
  }
}
