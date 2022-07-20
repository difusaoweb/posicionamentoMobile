import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  GetUserProfileSuccessReturnActionInterface,
  GetUserProfileParametersServiceInterface,
  UserActionTypes,
  GET_USER_PROFILE,
  ReturnErrorInterface,
  CurrentUserInterface,
  UsersActionGetCurrentUserParameters,
  USERS_ACTION_GET_CURRENT_USER,
  ReduxUsersCreateUserServiceParameters,
  REDUX_USERS_CREATE_USER,
  ReduxUsersCreateUserReducerPayload
} from '../types'
import { userService } from '../../services'
import { request, failure } from './common.actions'
import { setNotification } from './notification.actions'

const usersActionGetCurrentUser: ActionCreator<UserActionTypes> = (
  payload: UsersActionGetCurrentUserParameters
) => {
  return {
    type: USERS_ACTION_GET_CURRENT_USER,
    payload
  }
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


export function usersGetCurrentUser() {
  return async dispatch => {
    try {
      let user: CurrentUserInterface | null = null
      const storageUser = await AsyncStorage.getItem('@PosicionamentoAuth:user')
      if (storageUser) {
        user = JSON.parse(storageUser)
      }

      dispatch(usersActionGetCurrentUser({ user }))
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'Error users get current user.'
      }

      dispatch(setNotification(returnError.message))
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

export function reduxUsersCreateUserFunction(parameters: ReduxUsersCreateUserServiceParameters) {
  return async dispatch => {
    try {
      const { data } = await userService.createUser(parameters)
      const userId: number = data?.success?.user_id

      dispatch(reduxUsersCreateUserAction({ success: { userId }, failure: null }))
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        case 409:
          dispatch(setNotification('signUp.error.409'))
          dispatch(reduxUsersCreateUserAction({ success: null, failure: { status } }))
          break
        default:
          dispatch(setNotification('index.error.0'))
          break
      }
    }
  }
}

const reduxUsersCreateUserAction: ActionCreator<UserActionTypes> = (
  payload: ReduxUsersCreateUserReducerPayload
) => {
  return { type: REDUX_USERS_CREATE_USER, payload }
}