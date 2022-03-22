import axios, { AxiosError } from 'axios'
import { ActionCreator } from 'redux'

import {
  GET_OPINIONS_AFFIRMATION,
  GET_OPINIONS_USER,
  SET_OPINION_AFFIRMATION,
  OpinionActionTypes,
  GetOpinionsUserParametersServiceInterface,
  GetOpinionsAffirmationParametersServiceInterface,
  ReturnErrorInterface,
  SetOpinionAffirmationSuccessReturnActionInterface,
  GetOpinionsAffirmationSuccessReturnActionInterface,
  SetOpinionAffirmationParametersServiceInterface,
  GetOpinionsUserSuccessReturnActionInterface,
  GetOpinionsAffirmationReturnPromiseInterface,
  OpinionAffirmationInterface,
  GetOpinionsUserReturnPromiseInterface,
  OpinionUserInterface
} from '../types'
import { opinionService } from '../../services'
import { request, failure } from './common.actions'
import { setNotification } from './notification.actions'

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

const setOpinionAffirmationSuccess: ActionCreator<OpinionActionTypes> = (
  success: SetOpinionAffirmationSuccessReturnActionInterface
) => {
  return { type: SET_OPINION_AFFIRMATION, payload: { success, failure: null } }
}
const setOpinionAffirmationFailure: ActionCreator<OpinionActionTypes> = (
  failure: ReturnErrorInterface
) => {
  return { type: SET_OPINION_AFFIRMATION, payload: { success: null, failure } }
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

export function setOpinionAffirmation({
  affirmationId,
  opinionValue
}: SetOpinionAffirmationParametersServiceInterface) {
  return async (dispatch, getState) => {
    try {
      dispatch(request())

      const { data } = await opinionService.setOpinionAffirmation({
        affirmationId,
        opinionValue
      })

      dispatch(getOpinionsAffirmation({ affirmationId }))
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
