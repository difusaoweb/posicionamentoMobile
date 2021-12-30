import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../../redux'
import api from '../../services/api'

export interface Affirmation {
  id: number,
  message: string
}

export interface SaveSearchInActionProps {
  affirmations: Affirmation[]
}

export interface SaveErrorSearchInActionProps {
  status: number
  message: string
}

interface SearchInDataInterface {
  search: string
}
export type SearchInDataType = SearchInDataInterface

export interface SearchState {
  searchIn: SaveSearchInActionProps | null
  errorSearchIn: SaveErrorSearchInActionProps | null
  submit: boolean
}
export type SearchStateType = SearchState

const initialState: SearchState = {
  searchIn: null,
  errorSearchIn: null,
  submit: false
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setIsSubmit: (state, action: PayloadAction<boolean>) => {
      state.submit = action.payload
    },
    saveSearchIn: (state, action: PayloadAction<SaveSearchInActionProps>) => {
      state.searchIn = {
        affirmations: action.payload.affirmations
      }
      state.errorSearchIn = null
    },
    saveErrorSearchIn: (state, action: PayloadAction<SaveErrorSearchInActionProps>) => {
      state.searchIn = null
      state.errorSearchIn = {
        status: action.payload.status,
        message: action.payload.message
      }
    }
  }
})

export const { setIsSubmit } = searchSlice.actions
export const isSubmit = (state: RootState) => state.search.submit




export const { saveSearchIn, saveErrorSearchIn } = searchSlice.actions
export const searchInAsync = ({ search }: SearchInDataType) => async dispatch => {
  try {
    const { data } = await api
    .post('affirmations/search', {
      search: search
    })

    dispatch(saveSearchIn({ affirmations: data }))

  } catch (error) {
    dispatch(saveErrorSearchIn({ status: error.request.status, message: error.message }))
  }
}

export const affirmations = (state: RootState) => state.search.searchIn?.affirmations ?? null


export const errorSearchIn = (state: RootState) => state.search.errorSearchIn

export default searchSlice.reducer
