import axios, { AxiosError } from 'axios'
import { ActionCreator } from 'redux'

import {
  GET_AFFIRMATIONS_HOME,
  AffirmationActionTypes,
  GetAffirmationsHomeSuccessReturnActionInterface,
  ReturnErrorInterface,
  AffirmationHomeInterface,
  GetAffirmationsHomeReturnPromiseInterface
} from '../types'
import { affirmationService } from '../../services'
import { request, failure } from './common.actions'
import { setNotification } from './notification.actions'

const getAffirmationsHomeSuccess: ActionCreator<AffirmationActionTypes> = (success: GetAffirmationsHomeSuccessReturnActionInterface) => {
  return { type: GET_AFFIRMATIONS_HOME, payload: { success, failure: null } }
}
const getAffirmationsHomeFailure: ActionCreator<AffirmationActionTypes> = (failure: ReturnErrorInterface) => {
  return { type: GET_AFFIRMATIONS_HOME, payload: { success: null, failure } }
}

export function getAffirmationsHome() {
  return async dispatch => {
    try {
      dispatch(request())

      const { data } = await affirmationService.getAffirmationsHome()
      const affirmations: AffirmationHomeInterface[] = data?.success?.affirmations?.map((affirmation: GetAffirmationsHomeReturnPromiseInterface) => {
        return {
          id: affirmation?.id,
          message: affirmation?.message,
          stronglyAgree: affirmation?.strongly_agree,
          agree: affirmation?.agree,
          neutral: affirmation?.neutral,
          disagree: affirmation?.disagree,
          stronglyDisagree: affirmation?.strongly_disagree,
          opinionAvaliation: affirmation?.opinion_avaliation
        }
      })

      dispatch(getAffirmationsHomeSuccess({ affirmations }))
    }
    catch (err) {
      let returnError = { status: 500, message: 'Error ao pegar as afirmações.' }
      if (axios.isAxiosError(err)) {
        err as AxiosError
        returnError.status = err.response?.status ?? returnError.status
        returnError.message = err.response?.data?.failure?.message ?? returnError.message
      }

      dispatch(setNotification({ message: returnError.message }))
      dispatch(getAffirmationsHomeFailure(returnError))
      dispatch(failure(returnError.message))
    }
  }
}
