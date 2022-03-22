import { ReturnErrorInterface } from './common.types'

export interface GetAffirmationsHomeReturnPromiseInterface {
  id: number
  message: string
  strongly_agree: number
  agree: number
  neutral: number
  disagree: number
  strongly_disagree: number
  opinion_value: number | null
}

export interface AffirmationHomeInterface {
  id: number
  message: string
  stronglyAgree: number
  agree: number
  neutral: number
  disagree: number
  stronglyDisagree: number
  opinionValue: number | null
}

export interface GetAffirmationsHomeParametersServiceInterface {
  page: number
}

export interface GetAffirmationsHomeSuccessReturnActionInterface {
  affirmations: AffirmationHomeInterface[]
}

export interface GetAffirmationsTrendingSuccessReturnActionInterface {
  affirmations: AffirmationHomeInterface[]
}

export interface GetAffirmationsSearchParametersServiceInterface {
  search: string
}
export interface SearchAffirmationsInterface {
  id: number
  message: string
}
export interface GetAffirmationsSearchSuccessReturnActionInterface {
  affirmations: SearchAffirmationsInterface[]
}

export interface GetAffirmationSingleParametersServiceInterface {
  affirmationId: number
}
export interface GetAffirmationSingleSuccessReturnActionInterface {
  affirmation: AffirmationHomeInterface
}

export interface PostAffirmationSingleParametersServiceInterface {
  affirmationMessage: string
}

export const GET_AFFIRMATIONS_HOME = 'GET_AFFIRMATIONS_HOME'
export const GET_AFFIRMATIONS_TRENDING = 'GET_AFFIRMATIONS_TRENDING'
export const GET_AFFIRMATIONS_SEARCH = 'GET_AFFIRMATIONS_SEARCH'
export const GET_AFFIRMATION_SINGLE = 'GET_AFFIRMATION_SINGLE'
export const POST_AFFIRMATION_SINGLE = 'POST_AFFIRMATION_SINGLE'

interface GetAffirmationsHomeAction {
  type: typeof GET_AFFIRMATIONS_HOME
  payload: {
    success: GetAffirmationsHomeSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}
interface GetAffirmationsTrendingAction {
  type: typeof GET_AFFIRMATIONS_TRENDING
  payload: {
    success: GetAffirmationsTrendingSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}
interface GetAffirmationsSearchAction {
  type: typeof GET_AFFIRMATIONS_SEARCH
  payload: {
    success: GetAffirmationsSearchSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}
interface GetAffirmationSingleAction {
  type: typeof GET_AFFIRMATION_SINGLE
  payload: {
    success: GetAffirmationSingleSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}
interface PostAffirmationSingleAction {
  type: typeof POST_AFFIRMATION_SINGLE
  payload: {
    failure: ReturnErrorInterface | null
  }
}

export interface AffirmationState {
  homeAffirmations: AffirmationHomeInterface[] | null
  trendingAffirmations: AffirmationHomeInterface[] | null
  searchAffirmations: SearchAffirmationsInterface[] | null
  affirmationSingle: AffirmationHomeInterface | null
  getAffirmationsHomeError: ReturnErrorInterface | null
  getAffirmationsTrendingError: ReturnErrorInterface | null
  getAffirmationsSearchError: ReturnErrorInterface | null
  getAffirmationSingleError: ReturnErrorInterface | null
  postAffirmationSingleError: ReturnErrorInterface | null
}

export type AffirmationActionTypes =
  | GetAffirmationsHomeAction
  | GetAffirmationsTrendingAction
  | GetAffirmationsSearchAction
  | GetAffirmationSingleAction
  | PostAffirmationSingleAction
