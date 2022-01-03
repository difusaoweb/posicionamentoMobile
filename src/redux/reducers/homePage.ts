import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../../redux'
import api from '../../services/api'

export interface AffirmationDbInterface {
  id: number
  message: string
  strongly_agree: number
  agree: number
  neutral: number
  disagree: number
  strongly_disagree: number
}

interface Error {
  status: number
  message: string
}

export interface AffirmationInterface {
  id: number
  message: string
  stronglyAgree: number
  agree: number
  neutral: number
  disagree: number
  stronglyDisagree: number
}

interface initialStateProps {
  affirmations: AffirmationInterface[] | null
  errorAffirmations: Error | null
}
const initialState: initialStateProps = {
  affirmations: null,
  errorAffirmations: null
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setAffirmations: (state) => {
      async () => {
        try {
          const { data } = await api
          .get('affirmations/home')

          state.affirmations = data.map((affirmation: AffirmationDbInterface) => {
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
        } catch (error) {
          state.errorAffirmations = { status: error.request.status, message: error.message }
        }
      }
    }
  }
})

export const { setAffirmations } = homeSlice.actions
export const affirmations = (state: RootState) => state.home.affirmations
export const errorAffirmations = (state: RootState) => state.home.errorAffirmations

export default homeSlice.reducer
