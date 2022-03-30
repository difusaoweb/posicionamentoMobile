import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  GetUserProfileSuccessReturnActionInterface,
  GetUserProfileParametersServiceInterface,
  UserActionTypes,
  GET_CURRENT_USER,
  GET_USER_PROFILE,
  ReturnErrorInterface,
  CurrentUserInterface,
  GetCurrentUserSuccessReturnActionInterface
} from '../types'
import { userService } from '../../services'
import { request, failure } from './common.actions'
import { setNotification } from './notification.actions'

const getCurrentUserSuccess: ActionCreator<UserActionTypes> = (
  success: GetCurrentUserSuccessReturnActionInterface
) => {
  return { type: GET_CURRENT_USER, payload: { success, failure: null } }
}

const getUserProfileSuccess: ActionCreator<UserActionTypes> = (
  success: GetUserProfileSuccessReturnActionInterface
) => {
  return { type: GET_USER_PROFILE, payload: { success, failure: null } }
}
const getUserProfileFailure: ActionCreator<UserActionTypes> = (
  failure: ReturnErrorInterface
) => {
  return { type: GET_USER_PROFILE, payload: { success: null, failure } }
}

export function getCurrentUser() {
  return async dispatch => {
    try {
      let user: CurrentUserInterface | null = null
      const storageUser = await AsyncStorage.getItem('@PosicionamentoAuth:user')
      if (storageUser) {
        user = JSON.parse(storageUser)
      }

      dispatch(getCurrentUserSuccess({ user }))
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'Error get current user.'
      }

      dispatch(setNotification({ message: returnError.message }))
    }
  }
}

export function getUserProfile({
  userId
}: GetUserProfileParametersServiceInterface) {
  return (dispatch: Dispatch) => {
    dispatch(request())
    return userService.getUserProfile({ userId }).then(
      response => {
        dispatch(
          getUserProfileSuccess({ profile: response.data?.success?.profile })
        )
      },
      err => {
        const returnError = {
          status: 500,
          message: 'Error ao pegar o perfil do úsuario'
        }
        if (axios.isAxiosError(err)) {
          err as AxiosError
          returnError.status = err.response?.status ?? returnError.status
          returnError.message =
            err.response?.data?.failure?.message ?? returnError.message
        }

        setNotification(returnError.message)
        dispatch(getUserProfileFailure(returnError))
        dispatch(failure(returnError.message))
      }
    )
  }
}
