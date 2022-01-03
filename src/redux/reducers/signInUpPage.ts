import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import type { RootState } from '../../redux'
import api from '../../services/api'


interface saveSingInActionProps {
  token: string
  user: userDataInterface
}

interface userDataInterface {
  id: number
  user_login: string
  display_name: string
  user_email: string
}

interface saveErrorSingInActionProps {
  status: number
  message: string
}

export interface SignInUpState {
  token: string | null
  user: userDataInterface | null
  errorSingIn: saveErrorSingInActionProps | null
}
export type SignInUpStateTypes = SignInUpState

interface singInDataInterface {
  login: string
  pass: string
}
export type singInDataType = singInDataInterface

const initialState: SignInUpState = {
  token: null,
  user: null,
  errorSingIn: null
}

export const signInUpSlice = createSlice({
  name: 'signInUp',
  initialState,
  reducers: {
    saveSingIn: (state, action: PayloadAction<saveSingInActionProps>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.errorSingIn = null
    },
    saveErrorSingIn: (state, action: PayloadAction<saveErrorSingInActionProps>) => {
      state.token = null
      state.user = null
      state.errorSingIn = {
        status: action.payload.status,
        message: action.payload.message
      }
    },
    saveSingOut: (state) => {
      state.token = null
      state.user = null
      state.errorSingIn = null
    },
    getStorageData: (state) => {
      async () => {
        const storageToken = await AsyncStorage.getItem('@PosicionamentoAuth:token')
        const storageUser = await AsyncStorage.getItem('@PosicionamentoAuth:user')

        if(storageUser && storageToken) {
          api.defaults.headers.Authorization = `Bearer ${storageToken}`

          state.token = storageToken
          state.user = JSON.parse(storageUser)
          state.errorSingIn = null
        }
      }
    }
  }
})

export const { saveSingIn, saveErrorSingIn, saveSingOut, getStorageData } = signInUpSlice.actions

export const currentUser = (state: RootState) => state.signInUp.user
export const currentUserID = (state: RootState) => state.signInUp.user?.id
export const isSigned = (state: RootState) => state.signInUp.user ? true : false
export const errorSingIn = (state: RootState) => state.signInUp.errorSingIn

export const singInAsync = ({login, pass}: singInDataType) => async dispatch => {
  try {
    const { data } = await api
    .post('signInUp', {
      user_login: login,
      user_pass: pass
    })

    const { token, user } = data

    const dataResponse: saveSingInActionProps = {
      token,
      user
    }

    api.defaults.headers.Authorization = `Bearer ${token}`

    await AsyncStorage.multiSet([
      ['@PosicionamentoAuth:token', token],
      ['@PosicionamentoAuth:user', JSON.stringify(user)]
    ])

    dispatch(saveSingIn(dataResponse))

  } catch (error) {
    dispatch(saveErrorSingIn({ status: error.request.status, message: error.message }))
  }
}

export const singOutAsync = () => async dispatch => {
  await AsyncStorage.clear()
  dispatch(saveSingOut())
}

export default signInUpSlice.reducer
