import { AxiosResponse } from 'axios'

import api from './api'
import {
  GetAffirmationSingleParametersServiceInterface,
  GetAffirmationsSearchParametersServiceInterface,
  PostAffirmationSingleParametersServiceInterface
} from '../redux/types'
export const affirmationService = {
  getAffirmationsHome,
  getAffirmationsTrending,
  getAffirmationsSearch,
  getAffirmationSingle,
  postAffirmationSingle
}

async function getAffirmationsHome(): Promise<AxiosResponse> {
  return await api.get('affirmations/home')
}

async function getAffirmationsTrending(): Promise<AxiosResponse> {
  return await api.get('affirmations/trending')
}

async function getAffirmationsSearch({
  search
}: GetAffirmationsSearchParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('affirmations/search', { params: { search } })
}

async function getAffirmationSingle({
  affirmationId
}: GetAffirmationSingleParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('affirmations/affirmation', {
    params: { affirmation_id: affirmationId }
  })
}

async function postAffirmationSingle({
  affirmationMessage
}: PostAffirmationSingleParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('affirmations/create', {
    params: { affirmation_message: affirmationMessage }
  })
}
