import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import type { RootState } from '..'
import api from '../../services/api'


interface SaveErrorAddAffirmationActionProps {
  status: number
  message: string
}

interface AddAffirmationDataInterface {
  message: string
}
export type AddAffirmationDataType = AddAffirmationDataInterface

export interface AffirmationState {
  errorAddAffirmation: SaveErrorAddAffirmationActionProps | null
}
export type AffirmationStateType = AffirmationState

const initialState: AffirmationState = {
  errorAddAffirmation: null
}

export const affirmationSlice = createSlice({
  name: 'affirmation',
  initialState,
  reducers: {
    saveAddAffirmation: (state) => {
      state.errorAddAffirmation = null
    },
    saveErrorAddAffirmation: (state, action: PayloadAction<SaveErrorAddAffirmationActionProps>) => {
      state.errorAddAffirmation = {
        status: action.payload.status,
        message: action.payload.message
      }
    }
  }
})

export const { saveAddAffirmation, saveErrorAddAffirmation } = affirmationSlice.actions

export const errorAddAffirmation = (state: RootState) => state.affirmation.errorAddAffirmation

export const addAffirmationAsync = ({ message }: AddAffirmationDataType) => async dispatch => {
  try {
    const { data } = await api
    .post('affirmations', {
      message: message
    })

    dispatch(saveAddAffirmation())

  } catch (error) {
    dispatch(saveErrorAddAffirmation({ status: error.request.status, message: error.message }))
  }
}

export default affirmationSlice.reducer
