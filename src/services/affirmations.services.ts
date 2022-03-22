import { AxiosResponse } from 'axios'

import api from './api'
import {
  GetAffirmationsHomeParametersServiceInterface,
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

async function getAffirmationsHome({
  page
}: GetAffirmationsHomeParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('affirmations/home', { params: { page, per_page: 10 } })
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
