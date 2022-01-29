import { AxiosResponse } from 'axios'

import api from './api'

export const affirmationService = { getAffirmationsHome }

async function getAffirmationsHome(): Promise<AxiosResponse> {
  return await api
    .get('affirmations/home')
}
