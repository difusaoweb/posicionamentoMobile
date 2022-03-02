import { AxiosResponse } from 'axios'

import api from './api'
import {
  GetOpinionsUserParametersServiceInterface,
  GetOpinionsAffirmationParametersServiceInterface,
  SetOpinionAffirmationParametersServiceInterface
} from '../redux/types'

export const opinionService = {
  getOpinionsAffirmation,
  getOpinionsUser,
  setOpinionAffirmation
}

async function getOpinionsAffirmation({
  affirmationId
}: GetOpinionsAffirmationParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('opinions/affirmation', {
    params: { affirmation_id: affirmationId }
  })
}

async function getOpinionsUser({
  userId
}: GetOpinionsUserParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('opinions/user', { params: { user_id: userId } })
}

async function setOpinionAffirmation({
  affirmationId,
  avaliation
}: SetOpinionAffirmationParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('/opinions/create', {
    params: {
      affirmation_id: affirmationId,
      avaliation_value: avaliation
    }
  })
}
