import { ActionCreator } from 'redux'

import {
  LocalStorageActionTypes,
  LocalStorageInterface,
  GET_LOCAL_STORAGE,
  SET_LOCAL_STORAGE
} from '../types'

import { localStorageService } from '../../services'
import { request, failure } from './common.actions'

const getLocalStorageSuccess: ActionCreator<LocalStorageActionTypes> = ({ token, user }: LocalStorageInterface) => {
  return { type: GET_LOCAL_STORAGE, payload: {token, user} }
}

const setLocalStorageSuccess: ActionCreator<LocalStorageActionTypes> = ({ token, user }: LocalStorageInterface) => {
  return { type: SET_LOCAL_STORAGE, payload: {token, user} }
}

export function getLocalStorage() {
  return dispatch => {
    dispatch(request())
    return localStorageService.getLocalStorage()
      .then(
        response => {
          dispatch(getLocalStorageSuccess(response))
        },
        error => {
          dispatch(failure('Server error.'))
        }
      )
  }
}

export function setLocalStorage({ token, user }: LocalStorageInterface) {
  return dispatch => {
    dispatch(request())
    return localStorageService.setLocalStorage({ token, user })
      .then(
        response => {
          dispatch(setLocalStorageSuccess(response))
        },
        error => {
          dispatch(failure('Server error.'))
        })
  }
}
