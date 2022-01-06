export interface AffirmationDbInterface {
  id: number
  message: string
  strongly_agree: number | null
  agree: number | null
  neutral: number | null
  disagree: number | null
  strongly_disagree: number | null
}

export interface AffirmationHomeInterface {
  id: number
  message: string
  stronglyAgree: number
  agree: number
  neutral: number
  disagree: number
  stronglyDisagree: number
}

export const UPDATE_HOME = 'UPDATE_HOME'

interface UpdateHomeAction {
  type: typeof UPDATE_HOME
  payload: AffirmationHomeInterface[]
}

export type HomeActionTypes = UpdateHomeAction
