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

export interface SetOpinionAffirmationParametersServiceInterface {
  affirmationId: number
  opinionValue: number
}
export interface SetOpinionAffirmationSuccessReturnActionInterface {
  opinionId: number
}

export const GET_OPINIONS_AFFIRMATION = 'GET_OPINIONS_AFFIRMATION'
export const GET_OPINIONS_USER = 'GET_OPINIONS_USER'
export const SET_OPINION_AFFIRMATION = 'SET_OPINION_AFFIRMATION'

interface GetOpinionsAffirmationAction {
  type: typeof GET_OPINIONS_AFFIRMATION
  payload: {
    success: GetOpinionsAffirmationSuccessReturnActionInterface | null
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

interface SetOpinionAffirmationAction {
  type: typeof SET_OPINION_AFFIRMATION
  payload: {
    success: SetOpinionAffirmationSuccessReturnActionInterface | null
    failure: ReturnErrorInterface | null
  }
}

export interface OpinionState {
  affirmationOpinions: OpinionAffirmationInterface[] | null
  userOpinions: OpinionUserInterface[] | null
  getOpinionsUserError: ReturnErrorInterface | null
  getOpinionsAffirmationError: ReturnErrorInterface | null
  setOpinionAffirmationError: ReturnErrorInterface | null
}

export type OpinionActionTypes =
  | GetOpinionsAffirmationAction
  | GetOpinionsUserAction
  | SetOpinionAffirmationAction
