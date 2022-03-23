import { ReturnErrorInterface } from './common.types'

export interface GetOpinionsAffirmationParametersServiceInterface {
  affirmationId: number
}

export interface GetOpinionsAffirmationReturnPromiseInterface {
  id: number
  opinion_author: number
  opinion_avaliation: number
  user_login: string
  avatar: string | null
}

export interface OpinionAffirmationInterface {
  id: number
  opinionAuthor: number
  currentUserAvaliation: number
  userLogin: string
  avatar: string | null
}

export interface GetOpinionsAffirmationSuccessReturnActionInterface {
  opinions: OpinionAffirmationInterface[]
}

export interface GetOpinionAffirmationSuccessReturnActionInterface {
  opinionValue: number | null
}

export interface SetOpinionAffirmationParametersServiceInterface {
  affirmationId: number
  opinionValue: number
}

export interface DeleteOpinionAffirmationParametersServiceInterface {
  opinionId: number
}
export interface DeleteOpinionAffirmationParametersActionInterface {
  opinionId: number
  opinionValue: number
}
export interface DeleteOpinionAffirmationSuccessReturnActionInterface {
  opinionValue: number
}

export interface GetOpinionsUserParametersServiceInterface {
  userId: number
}

export interface GetOpinionsUserReturnPromiseInterface {
  id: number

  affirmation_parent: number
  affirmation_message: string

  opinion_author: number
  user_login: string
  avatar: string

  opinion_avaliation: number
}

export interface OpinionUserInterface {
  id: number
  userLogin: string
  displayName: string
  meta: {
    avatar: string
  }
}

export interface GetOpinionsUserSuccessReturnActionInterface {
  opinions: OpinionUserInterface[]
}

export const GET_OPINIONS_AFFIRMATION = 'GET_OPINIONS_AFFIRMATION'
export const GET_OPINION_AFFIRMATION = 'GET_OPINION_AFFIRMATION'
export const SET_OPINION_AFFIRMATION = 'SET_OPINION_AFFIRMATION'
export const DELETE_OPINION_AFFIRMATION = 'DELETE_OPINION_AFFIRMATION'
export const GET_OPINIONS_USER = 'GET_OPINIONS_USER'

interface GetOpinionsAffirmationAction {
  type: typeof GET_OPINIONS_AFFIRMATION
  payload: {
    success: GetOpinionsAffirmationSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}

interface GetOpinionAffirmationAction {
  type: typeof GET_OPINION_AFFIRMATION
  payload: {
    success: GetOpinionAffirmationSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}

interface SetOpinionAffirmationAction {
  type: typeof SET_OPINION_AFFIRMATION
  payload: {
    success: GetOpinionAffirmationSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}

interface DeleteOpinionAffirmationAction {
  type: typeof DELETE_OPINION_AFFIRMATION
  payload: {
    success: DeleteOpinionAffirmationSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}

interface GetOpinionsUserAction {
  type: typeof GET_OPINIONS_USER
  payload: {
    success: GetOpinionsUserSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}

export interface OpinionState {
  affirmationCurrentOpinionValue: number | null
  affirmationBeforeCurrentOpinionValue: number | null
  affirmationDeletedOpinionValue: number | null

  affirmationOpinions: OpinionAffirmationInterface[] | null
  userOpinions: OpinionUserInterface[] | null

  getOpinionsAffirmationError: ReturnErrorInterface | null
  setOpinionAffirmationError: ReturnErrorInterface | null
  deleteOpinionAffirmationError: ReturnErrorInterface | null
  getOpinionsUserError: ReturnErrorInterface | null
}

export type OpinionActionTypes =
  | GetOpinionsAffirmationAction
  | GetOpinionAffirmationAction
  | SetOpinionAffirmationAction
  | DeleteOpinionAffirmationAction
  | GetOpinionsUserAction
