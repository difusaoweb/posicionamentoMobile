import { AxiosResponse } from 'axios'

import api from './api'
import {
  GetOpinionsAffirmationParametersServiceInterface,
  SetOpinionAffirmationParametersServiceInterface,
  DeleteOpinionAffirmationParametersServiceInterface,
  GetOpinionsUserParametersServiceInterface
} from '../redux/types'

export const opinionService = {
  getOpinionsAffirmation,
  setOpinionAffirmation,
  deleteOpinionAffirmation,
  getOpinionsUser
}

async function getOpinionsAffirmation({
  affirmationId
}: GetOpinionsAffirmationParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('opinions/affirmation', {
    params: { affirmation_id: affirmationId }
  })
}

async function setOpinionAffirmation({
  affirmationId,
  opinionValue
}: SetOpinionAffirmationParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('/opinions/add-or-update', {
    params: {
      affirmation_id: affirmationId,
      opinion_value: opinionValue
    }
  })
}

async function deleteOpinionAffirmation({
  opinionId
}: DeleteOpinionAffirmationParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('opinions/delete', { params: { opinion_id: opinionId } })
}

async function getOpinionsUser({
  userId
}: GetOpinionsUserParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('opinions/user', { params: { user_id: userId } })
}
