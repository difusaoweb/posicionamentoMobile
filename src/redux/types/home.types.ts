export interface AffirmationHomeInterface {
  id: number
  message: string
  stronglyAgree: number
  agree: number
  neutral: number
  disagree: number
  stronglyDisagree: number
}
export interface HomeInterface {
  affirmations: AffirmationHomeInterface[] | null
}

export const UPDATE_HOME = 'UPDATE_HOME'

interface UpdateHomeAction {
  type: typeof UPDATE_HOME
  payload: HomeInterface
}

export type HomeActionTypes = UpdateHomeAction
