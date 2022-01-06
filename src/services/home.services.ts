import api from './api'
import { AffirmationDbInterface, AffirmationHomeInterface } from '../redux/types'

export const homeService = { updateHome }

async function updateHome(): Promise<AffirmationHomeInterface[]> {
  const { data } = await api
    .get('affirmations/home')

  const affirmations = data.map((affirmation: AffirmationDbInterface) => {
    return {
      id: affirmation.id,
      message: affirmation.message,
      stronglyAgree: affirmation.strongly_agree ?? 0,
      agree: affirmation.agree ?? 0,
      neutral: affirmation.neutral ?? 0,
      disagree: affirmation.disagree ?? 0,
      stronglyDisagree: affirmation.strongly_disagree ?? 0
    }
  })

  return affirmations ?? null
}
