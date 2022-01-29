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
  OpinionAffirmationInterface
} from '../types'
import { opinionService } from '../../services'
import { request, failure } from './common.actions'
import { setNotification } from './notification.actions'

const getOpinionsAffirmationSuccess: ActionCreator<OpinionActionTypes> = (success: GetOpinionsAffirmationSuccessReturnActionInterface) => {
  return { type: GET_OPINIONS_AFFIRMATION, payload: { success, failure: null } }
}
const getOpinionsAffirmationFailure: ActionCreator<OpinionActionTypes> = (failure: ReturnErrorInterface) => {
  return { type: GET_OPINIONS_AFFIRMATION, payload: { success: null, failure } }
}

const getOpinionsUserSuccess: ActionCreator<OpinionActionTypes> = (success: GetOpinionsUserSuccessReturnActionInterface) => {
  return { type: GET_OPINIONS_USER, payload: { success, failure: null } }
}
const getOpinionsUserFailure: ActionCreator<OpinionActionTypes> = (failure: ReturnErrorInterface) => {
  return { type: GET_OPINIONS_USER, payload: { success: null, failure } }
}

const setOpinionAffirmationSuccess: ActionCreator<OpinionActionTypes> = (success: SetOpinionAffirmationSuccessReturnActionInterface) => {
  return { type: SET_OPINION_AFFIRMATION, payload: { success, failure: null } }
}
const setOpinionAffirmationFailure: ActionCreator<OpinionActionTypes> = (failure: ReturnErrorInterface) => {
  return { type: SET_OPINION_AFFIRMATION, payload: { success: null, failure } }
}


export function getOpinionsAffirmation({ affirmationId }: GetOpinionsAffirmationParametersServiceInterface) {
  return dispatch => {
    dispatch(request())
    return opinionService.getOpinionsAffirmation({ affirmationId })
      .then(
        response => {
          const opinions: OpinionAffirmationInterface[]  = response.data?.success?.opinions?.map((opinion: GetOpinionsAffirmationReturnPromiseInterface) => {
            return {
              id: opinion?.id,
              opinionAuthor: opinion?.opinion_author,
              opinionAvaliation: opinion?.opinion_avaliation,
              userLogin: opinion?.user_login,
              avatar: opinion?.avatar || null
            }
          })

          dispatch(getOpinionsAffirmationSuccess({ opinions }))
        },
        err => {
          let returnError = { status: 500, message: 'Error ao pegar as opiniões dessa afirmação.' }
          if (axios.isAxiosError(err)) {
            err as AxiosError
            returnError.status = err.response?.status ?? returnError.status
            returnError.message = err.response?.data?.failure?.message ?? returnError.message
          }

          dispatch(setNotification({ message: returnError.message }))
          dispatch(getOpinionsAffirmationFailure(returnError))
          dispatch(failure(returnError.message))
        }
      )
  }
}

export function getOpinionsUser({ userId }: GetOpinionsUserParametersServiceInterface) {
  return dispatch => {
    dispatch(request())
    return opinionService.getOpinionsUser({ userId })
      .then(
        response => {
          const opinions = response.data?.map((opinion) => {
            return {
              id: opinion?.id,
              affirmationParent: opinion?.affirmation_parent,
              affirmationMessage: opinion?.affirmation_message,
              stronglyAgree: opinion.strongly_agree == 1 ? true : false,
              agree: opinion.agree == 1 ? true : false,
              neutral: opinion.neutral == 1 ? true : false,
              disagree: opinion.disagree == 1 ? true : false,
              stronglyDisagree: opinion.strongly_disagree == 1 ? true : false
            }
          })

          dispatch(getOpinionsUserSuccess({ opinions }))
        },
        err => {
          let returnError = { status: 0, message: 'Error ao pegar as opiniões' }
          if (axios.isAxiosError(err)) {
            err as AxiosError
            returnError.status = err.response?.status ?? returnError.status
            returnError.message = err.response?.data?.error ?? returnError.message
          }

          dispatch(setNotification({ message: returnError.message }))
          dispatch(getOpinionsUserFailure(returnError))
          dispatch(failure(returnError.message))
        }
      )
  }
}

export function setOpinionAffirmation({ affirmationId, avaliation }: SetOpinionAffirmationParametersServiceInterface) {
  return async (dispatch, getState) => {
    try {
      dispatch(request())

      const { data } = await opinionService.setOpinionAffirmation({ affirmationId, avaliation })
      const opinionId: number = data?.success?.opinion_id ?? 0

      const { user } = getState().localStorageReducer

      const theOpinion: OpinionAffirmationInterface = {
        id: opinionId,
        opinionAuthor: user?.id,
        opinionAvaliation: avaliation,
        userLogin: user?.userLogin,
        avatar: user?.meta?.avatar || null
      }

      dispatch(setOpinionAffirmationSuccess({ opinion: theOpinion }))
    }
    catch (err) {
      let returnError = { status: 500, message: 'Error ao avalaiar a afirmação.' }
      if (axios.isAxiosError(err)) {
        err as AxiosError
        returnError.status = err.response?.status ?? returnError.status
        returnError.message = err.response?.data?.failure?.message ?? returnError.message
      }

      dispatch(setNotification({ message: returnError.message }))
      dispatch(setOpinionAffirmationFailure(returnError))
      dispatch(failure(returnError.message))
    }
  }
}
