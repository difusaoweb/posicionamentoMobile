import axios, { AxiosError } from 'axios'
import { ActionCreator } from 'redux'
import { useTranslation } from 'react-i18next'

import {
  GET_AFFIRMATIONS_HOME,
  AffirmationActionTypes,
  ReturnErrorInterface,
  GetAffirmationsHomeParametersServiceInterface,
  GetAffirmationsHomeSuccessReturnActionInterface,
  AffirmationHomeInterface,
  GetAffirmationsHomeReturnPromiseInterface,
  SearchAffirmationsInterface,
  GetAffirmationSingleParametersServiceInterface,
  GetAffirmationsTrendingSuccessReturnActionInterface,
  GET_AFFIRMATIONS_TRENDING,
  GetAffirmationsSearchSuccessReturnActionInterface,
  GET_AFFIRMATIONS_SEARCH,
  GetAffirmationsSearchParametersServiceInterface,
  GET_AFFIRMATION_SINGLE,
  GetAffirmationSingleSuccessReturnActionInterface,
  POST_AFFIRMATION_SINGLE,
  PostAffirmationSingleParametersServiceInterface
} from '../types'
import { affirmationService } from '../../services'
import { request, failure } from './common.actions'
import { setNotification } from './notification.actions'

const getAffirmationsHomeSuccess: ActionCreator<AffirmationActionTypes> = (
  success: GetAffirmationsHomeSuccessReturnActionInterface
) => {
  return { type: GET_AFFIRMATIONS_HOME, payload: { success, failure: null } }
}
const getAffirmationsHomeFailure: ActionCreator<AffirmationActionTypes> = (
  failure: ReturnErrorInterface
) => {
  return { type: GET_AFFIRMATIONS_HOME, payload: { success: null, failure } }
}

const getAffirmationsTrendingSuccess: ActionCreator<AffirmationActionTypes> = (
  success: GetAffirmationsTrendingSuccessReturnActionInterface
) => {
  return {
    type: GET_AFFIRMATIONS_TRENDING,
    payload: { success, failure: null }
  }
}
const getAffirmationsTrendingFailure: ActionCreator<AffirmationActionTypes> = (
  failure: ReturnErrorInterface
) => {
  return {
    type: GET_AFFIRMATIONS_TRENDING,
    payload: { success: null, failure }
  }
}

const getAffirmationsSearchSuccess: ActionCreator<AffirmationActionTypes> = (
  success: GetAffirmationsSearchSuccessReturnActionInterface
) => {
  return { type: GET_AFFIRMATIONS_SEARCH, payload: { success, failure: null } }
}
const getAffirmationsSearchFailure: ActionCreator<AffirmationActionTypes> = (
  failure: ReturnErrorInterface
) => {
  return { type: GET_AFFIRMATIONS_SEARCH, payload: { success: null, failure } }
}

const getAffirmationSingleSuccess: ActionCreator<AffirmationActionTypes> = (
  success: GetAffirmationSingleSuccessReturnActionInterface
) => {
  return { type: GET_AFFIRMATION_SINGLE, payload: { success, failure: null } }
}
const getAffirmationSingleFailure: ActionCreator<AffirmationActionTypes> = (
  failure: ReturnErrorInterface
) => {
  return { type: GET_AFFIRMATION_SINGLE, payload: { success: null, failure } }
}

const postAffirmationSingleFailure: ActionCreator<AffirmationActionTypes> = (
  failure: ReturnErrorInterface
) => {
  return { type: POST_AFFIRMATION_SINGLE, payload: { success: null, failure } }
}

export function getAffirmationsHome({
  page
}: GetAffirmationsHomeParametersServiceInterface) {
  return async dispatch => {
    try {
      dispatch(request())

      const { data } = await affirmationService.getAffirmationsHome({ page })
      const affirmations: AffirmationHomeInterface[] =
        data?.success?.affirmations?.map(
          (affirmation: GetAffirmationsHomeReturnPromiseInterface) => {
            return {
              id: affirmation?.id,
              message: affirmation?.message,
              stronglyAgree: affirmation?.strongly_agree,
              agree: affirmation?.agree,
              neutral: affirmation?.neutral,
              disagree: affirmation?.disagree,
              stronglyDisagree: affirmation?.strongly_disagree,
              opinionValue: affirmation?.opinion_value
            }
          }
        )

      dispatch(getAffirmationsHomeSuccess({ affirmations }))
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'Error get affirmations from home.'
      }
      if (axios.isAxiosError(err)) {
        err as AxiosError
        returnError.status = err.response?.status ?? returnError.status
        returnError.message =
          err.response?.data?.failure?.message ?? returnError.message
      }

      dispatch(setNotification({ message: returnError.message }))
      dispatch(getAffirmationsHomeFailure(returnError))
      dispatch(failure(returnError.message))
    }
  }
}

export function getAffirmationsTrending() {
  return async dispatch => {
    try {
      dispatch(request())

      const { data } = await affirmationService.getAffirmationsTrending()
      const affirmations: AffirmationHomeInterface[] =
        data?.success?.affirmations?.map(
          (affirmation: GetAffirmationsHomeReturnPromiseInterface) => {
            return {
              id: affirmation?.id,
              message: affirmation?.message,
              stronglyAgree: affirmation?.strongly_agree,
              agree: affirmation?.agree,
              neutral: affirmation?.neutral,
              disagree: affirmation?.disagree,
              stronglyDisagree: affirmation?.strongly_disagree,
              currentUserAvaliation: affirmation?.opinion_avaliation
            }
          }
        )

      dispatch(getAffirmationsTrendingSuccess({ affirmations }))
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'error get affirmations from trending'
      }
      if (axios.isAxiosError(err)) {
        err as AxiosError
        returnError.status = err.response?.status ?? returnError.status
        returnError.message =
          err.response?.data?.failure?.message ?? returnError.message
      }
      if (returnError.status != 404) {
        dispatch(setNotification({ message: returnError.message }))
      }
      dispatch(getAffirmationsTrendingFailure(returnError))
      dispatch(failure(returnError.message))
    }
  }
}

export function getAffirmationsSearch({
  search
}: GetAffirmationsSearchParametersServiceInterface) {
  return async dispatch => {
    try {
      dispatch(request())
      const { data } = await affirmationService.getAffirmationsSearch({
        search
      })

      const affirmations: SearchAffirmationsInterface[] =
        data?.success?.affirmations

      dispatch(getAffirmationsSearchSuccess({ affirmations }))
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'error get affirmations from search'
      }
      if (axios.isAxiosError(err)) {
        err as AxiosError
        returnError.status = err.response?.status ?? returnError.status
        returnError.message =
          err.response?.data?.failure?.message ?? returnError.message
      }

      dispatch(setNotification({ message: returnError.message }))
      dispatch(getAffirmationsSearchFailure(returnError))
      dispatch(failure(returnError.message))
    }
  }
}

export function getAffirmationSingle({
  affirmationId
}: GetAffirmationSingleParametersServiceInterface) {
  return async dispatch => {
    try {
      dispatch(request())

      const { data } = await affirmationService.getAffirmationSingle({
        affirmationId
      })

      const affirmation: AffirmationHomeInterface = {
        id: data?.success?.affirmation?.id,
        message: data?.success?.affirmation?.message,
        stronglyAgree: data?.success?.affirmation?.strongly_agree,
        agree: data?.success?.affirmation?.agree,
        neutral: data?.success?.affirmation?.neutral,
        disagree: data?.success?.affirmation?.disagree,
        stronglyDisagree: data?.success?.affirmation?.strongly_disagree,
        opinionValue: data?.success?.affirmation?.opinion_value
      }

      dispatch(getAffirmationSingleSuccess({ affirmation }))
    } catch (err) {
      const returnError = {
        status: 500,
        message: 'Error get single affirmation.'
      }
      if (axios.isAxiosError(err)) {
        err as AxiosError
        returnError.status = err.response?.status ?? returnError.status
        returnError.message =
          err.response?.data?.failure?.message ?? returnError.message
      }

      dispatch(setNotification({ message: returnError.message }))
      dispatch(getAffirmationSingleFailure(returnError))
      dispatch(failure(returnError.message))
    }
  }
}

export function postAffirmationSingle({
  affirmationMessage
}: PostAffirmationSingleParametersServiceInterface) {
  const [t] = useTranslation('add')

  return async dispatch => {
    try {
      dispatch(request())

      await affirmationService.postAffirmationSingle({
        affirmationMessage
      })

      dispatch(
        setNotification({ message: t('affirmation_successfully_added') })
      )
    } catch (err) {
      const returnError = { status: 500, message: 'error post affirmation' }
      if (axios.isAxiosError(err)) {
        err as AxiosError
        returnError.status = err.response?.status ?? returnError.status
        returnError.message =
          err.response?.data?.failure?.message ?? returnError.message
      }

      dispatch(setNotification({ message: returnError.message }))
      dispatch(postAffirmationSingleFailure(returnError))
      dispatch(failure(returnError.message))
    }
  }
}
