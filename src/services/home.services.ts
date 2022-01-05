import api from './api'
import { AffirmationHomeInterface } from '../redux/types'

export const homeService = { updateHome }

async function updateHome(): Promise<AffirmationHomeInterface[]> {
  const { data } = await api
    .get('affirmations/home')
  return data
}
