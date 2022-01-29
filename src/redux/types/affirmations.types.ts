import { ReturnErrorInterface } from './common.types'

export interface GetAffirmationsHomeReturnPromiseInterface {
  id: number
  message: string
  strongly_agree: number
  agree: number
  neutral: number
  disagree: number
  strongly_disagree: number
  opinion_avaliation: number | null
}

export interface AffirmationHomeInterface {
  id: number
  message: string
  stronglyAgree: number
  agree: number
  neutral: number
  disagree: number
  stronglyDisagree: number
  opinionAvaliation: number | null
}

export interface GetAffirmationsHomeSuccessReturnActionInterface {
  affirmations: AffirmationHomeInterface[]
}

export const GET_AFFIRMATIONS_HOME = 'GET_AFFIRMATIONS_HOME'

interface GetAffirmationsHomeAction {
  type: typeof GET_AFFIRMATIONS_HOME
  payload: {
    success: GetAffirmationsHomeSuccessReturnActionInterface | null,
    failure: ReturnErrorInterface | null
  }
}

export interface AffirmationState {
  affirmationsHome: AffirmationHomeInterface[] | null
  getAffirmationsHomeError: ReturnErrorInterface | null
}

export type AffirmationActionTypes = GetAffirmationsHomeAction
