import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'

import {
  OpinionActionTypes,
  ReturnErrorInterface,
  SET_CURRENT_OPINION_VALUE_AFFIRMATION,
  GetOpinionAffirmationSuccessReturnActionInterface,
  UPDATE_OPINION_BUTTON_PRESSED_AFFIRMATION,
  SET_OPINION_AFFIRMATION,
  SetOpinionAffirmationParametersServiceInterface,
  DELETE_OPINION_AFFIRMATION,
  DeleteOpinionAffirmationParametersActionInterface,
  DeleteOpinionAffirmationSuccessReturnActionInterface,
  GET_OPINIONS_AFFIRMATION,
  OpinionAffirmationInterface,
  GetOpinionsAffirmationParametersServiceInterface,
  GetOpinionsAffirmationSuccessReturnActionInterface,
  GetOpinionsAffirmationReturnPromiseInterface,
  GET_OPINIONS_USER,
  GetOpinionsUserParametersServiceInterface,
  GetOpinionsUserSuccessReturnActionInterface,
  GetOpinionsUserReturnPromiseInterface,
  OpinionUserInterface,
  FetchActionTypes,
  NotificationActionTypes
} from '../types'
import { opinionService } from '../../services'
import { request, failure } from './common.actions'
import { setNotification } from './notification.actions'
import { AffirmationPutOpinionAffirmationLocal } from './affirmation.actions'
import { RootState, AppDispatch } from '../store'

const setCurrentOpinionValueAffirmationAction: ActionCreator<
  OpinionActionTypes
> = (opinionValue: number | null) => {
  return { type: SET_CURRENT_OPINION_VALUE_AFFIRMATION, payload: opinionValue }
}

const updateOpinionButtonPressedAffirmationAction: ActionCreator<
  OpinionActionTypes
> = (pressed: boolean) => {
  return {
    type: UPDATE_OPINION_BUTTON_PRESSED_AFFIRMATION,
    payload: pressed
  }
}

const setOpinionAffirmationSuccess: ActionCreator<OpinionActionTypes> = (
  success: GetOpinionAffirmationSuccessReturnActionInterface
) => {
  return { type: SET_OPINION_AFFIRMATION, payload: { success, failure: null } }
}
const setOpinionAffirmationFailure: ActionCreator<OpinionActionTypes> = (
  failure: ReturnErrorInterface
) => {
  return { type: SET_OPINION_AFFIRMATION, payload: { success: null, failure } }
}

const deleteOpinionAffirmationSuccess: ActionCreator<OpinionActionTypes> = (
  success: DeleteOpinionAffirmationSuccessReturnActionInterface
) => {
  return {
    type: DELETE_OPINION_AFFIRMATION,
    payload: { success, failure: null }
  }
}

const getOpinionsAffirmationSuccess: ActionCreator<OpinionActionTypes> = (
  success: GetOpinionsAffirmationSuccessReturnActionInterface
) => {
  return { type: GET_OPINIONS_AFFIRMATION, payload: { success, failure: null } }
}
const getOpinionsAffirmationFailure: ActionCreator<OpinionActionTypes> = (
  failure: ReturnErrorInterface
) => {
  return { type: GET_OPINIONS_AFFIRMATION, payload: { success: null, failure } }
}

const getOpinionsUserSuccess: ActionCreator<OpinionActionTypes> = (
  success: GetOpinionsUserSuccessReturnActionInterface
) => {
  return { type: GET_OPINIONS_USER, payload: { success, failure: null } }
}
const getOpinionsUserFailure: ActionCreator<OpinionActionTypes> = (
  failure: ReturnErrorInterface
) => {
  return { type: GET_OPINIONS_USER, payload: { success: null, failure } }
}

export function setCurrentOpinionValueAffirmation(opinionValue: number | null) {
  return dispatch => {
    dispatch(setCurrentOpinionValueAffirmationAction(opinionValue))
  }
}

export function setOpinionAffirmation({
  affirmationId,
  opinionValue
}: SetOpinionAffirmationParametersServiceInterface) {
  return async dispatch => {
    try {
      dispatch(request())

      const { data } = await opinionService.setOpinionAffirmation({
        affirmationId,
        opinionValue
      })

      const opinion = {
        id: data?.success?.opinion_id ?? 0,
        value: opinionValue
      }

      dispatch(setOpinionAffirmationSuccess({ opinionValue }))
      dispatch(AffirmationPutOpinionAffirmationLocal(opinion))
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'Error set opinion affirmation.'
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

export function deleteOpinionAffirmation({
  opinionId
}: DeleteOpinionAffirmationParametersActionInterface) {
  return async (dispatch: Dispatch, getState: RootState) => {
    try {
      dispatch(request())

      await opinionService.deleteOpinionAffirmation({
        opinionId
      })

      // const { affirmationSingle } = getState().affirmations

      dispatch(setOpinionAffirmationSuccess({ opinionValue: null }))
      // dispatch(AffirmationPutSingleAffirmationLocal(null))
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'Error delete opinion from affirmation.'
      }
      if (axios.isAxiosError(err)) {
        err as AxiosError
        returnError.status = err.response?.status ?? returnError.status
        returnError.message =
          err.response?.data?.failure?.message ?? returnError.message
      }

      setNotification(returnError.message)
      dispatch<FetchActionTypes>(failure(returnError.message))
    }
  }
}

export function updateOpinionButtonPressedAffirmation(pressed: boolean) {
  return async dispatch => {
    dispatch(updateOpinionButtonPressedAffirmationAction(pressed))
  }
}

export function getOpinionsAffirmation({
  affirmationId
}: GetOpinionsAffirmationParametersServiceInterface) {
  return async dispatch => {
    try {
      dispatch(request())

      const { data } = await opinionService.getOpinionsAffirmation({
        affirmationId
      })
      const opinions: OpinionAffirmationInterface[] =
        data?.success?.opinions?.map(
          (opinion: GetOpinionsAffirmationReturnPromiseInterface) => {
            return {
              id: opinion.id,
              opinionAuthor: opinion.opinion_author,
              currentUserAvaliation: opinion.opinion_avaliation,
              userLogin: opinion.user_login,
              avatar: opinion.avatar
            }
          }
        )

      dispatch(getOpinionsAffirmationSuccess({ opinions }))
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'error get opinions from affirmation'
      }
      if (axios.isAxiosError(err)) {
        err as AxiosError
        returnError.status = err.response?.status ?? returnError.status
        returnError.message =
          err.response?.data?.failure?.message ?? returnError.message
      }

      dispatch(setNotification({ message: returnError.message }))
      dispatch(getOpinionsAffirmationFailure(returnError))
      dispatch(failure(returnError.message))
    }
  }
}

export function getOpinionsUser({
  userId
}: GetOpinionsUserParametersServiceInterface) {
  return async dispatch => {
    try {
      dispatch(request())

      const { data } = await opinionService.getOpinionsUser({ userId })
      const opinions: OpinionUserInterface[] = data?.map(
        (opinion: GetOpinionsUserReturnPromiseInterface) => {
          return {
            id: opinion.id,
            affirmationParent: opinion.affirmation_parent,
            affirmationMessage: opinion.affirmation_message,
            currentUserAvaliation: opinion.opinion_avaliation
          }
        }
      )

      dispatch(getOpinionsUserSuccess({ opinions }))
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'error get opinions from user'
      }
      if (axios.isAxiosError(err)) {
        err as AxiosError
        returnError.status = err.response?.status ?? returnError.status
        returnError.message =
          err.response?.data?.failure?.message ?? returnError.message
      }

      dispatch(setNotification({ message: returnError.message }))
      dispatch(getOpinionsUserFailure(returnError))
      dispatch(failure(returnError.message))
    }
  }
}
