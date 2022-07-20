import { ReturnErrorInterface } from './common.types'

export interface GetAffirmationsHomeParametersServiceInterface {
  page: number
}
// export interface AffirmationHomeReturnPromiseInterface {
//   id: number
//   message: string
//   strongly_agree: number
//   agree: number
//   neutral: number
//   disagree: number
//   strongly_disagree: number
//   opinion_value: number | null
// }
// export interface GetAffirmationsHomeReturnPromiseInterface {
//   affirmations: AffirmationHomeReturnPromiseInterface[]
//   last_page: number
// }
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
export interface GetAffirmationsHomeSuccessReturnActionInterface {
  affirmations: AffirmationHomeInterface[]
  lastPage: number
}

export interface GetAffirmationsTrendingSuccessReturnActionInterface {
  affirmations: AffirmationHomeInterface[]
  lastPage: number
}

export interface GetAffirmationsSearchParametersServiceInterface {
  search: string
  page: number
}
export interface SearchAffirmationsInterface {
  id: number
  message: string
}
export interface GetAffirmationsSearchSuccessReturnActionInterface {
  affirmations: SearchAffirmationsInterface[]
  lastPage: number
}

export interface GetAffirmationSingleParametersServiceInterface {
  affirmationId: number
}
export interface GetAffirmationSingleReturnPromiseInterface {
  id: number
  message: string
  strongly_agree: number
  agree: number
  neutral: number
  disagree: number
  strongly_disagree: number
  opinion: {
    id: number
    value: number
  } | null
}
export interface AffirmationSingleInterface {
  id: number
  message: string
  stronglyAgree: number
  agree: number
  neutral: number
  disagree: number
  stronglyDisagree: number
  opinion: {
    id: number
    value: number
  } | null
}
export interface GetAffirmationSingleSuccessReturnActionInterface {
  affirmation: AffirmationSingleInterface
}

export interface PostAffirmationAddParametersServiceInterface {
  affirmationMessage: string
}

export const GET_AFFIRMATIONS_HOME = 'GET_AFFIRMATIONS_HOME'
export const GET_AFFIRMATIONS_TRENDING = 'GET_AFFIRMATIONS_TRENDING'
export const GET_AFFIRMATIONS_SEARCH = 'GET_AFFIRMATIONS_SEARCH'
export const POST_AFFIRMATION_ADD = 'POST_AFFIRMATION_ADD'
export const GET_AFFIRMATION_SINGLE = 'GET_AFFIRMATION_SINGLE'
export const AFFIRMATION_PUT_OPINION_AFFIRMATION_LOCAL =
  'AFFIRMATION_PUT_OPINION_AFFIRMATION_LOCAL'

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
interface PostAffirmationAddAction {
  type: typeof POST_AFFIRMATION_ADD
  payload: {
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
interface AffirmationPutOpinionAffirmationLocalAction {
  type: typeof AFFIRMATION_PUT_OPINION_AFFIRMATION_LOCAL
  payload: { id: number; value: number } | null
}

export interface AffirmationState {
  homeAffirmations: AffirmationHomeInterface[] | null
  homeAffirmationsLastPage: number | null
  trending: AffirmationHomeInterface[] | null
  trendingLastPage: number | null
  search: SearchAffirmationsInterface[] | null
  searchLastPage: number | null
  affirmationSingle: AffirmationSingleInterface | null
  getAffirmationsHomeError: ReturnErrorInterface | null
  getAffirmationsTrendingError: ReturnErrorInterface | null
  getAffirmationsSearchError: ReturnErrorInterface | null
  getAffirmationSingleError: ReturnErrorInterface | null
  postAffirmationAddError: ReturnErrorInterface | null
}

export type AffirmationActionTypes =
  | GetAffirmationsHomeAction
  | GetAffirmationsTrendingAction
  | GetAffirmationsSearchAction
  | PostAffirmationAddAction
  | GetAffirmationSingleAction
  | AffirmationPutOpinionAffirmationLocalAction
