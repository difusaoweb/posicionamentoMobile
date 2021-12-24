import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import type { RootState } from '../../redux'
import { singIn as singInApi } from '../../services/auth'
import api from '../../services/api'

export interface AccessState {
  signed: boolean
  token: string
  user: {
    id: number
    user_login: string
    display_name: string
    user_email: string
  }
}
export type AccessStateTypes = AccessState

const initialState: AccessState = {
  signed: false,
  token: '',
  user: {
    id: 0,
    user_login: '',
    display_name: '',
    user_email: ''
  }
}

export const accessSlice = createSlice({
  name: 'access',
  initialState,
  reducers: {
    logar: (state, action: PayloadAction<AccessState>) => {
      state.signed = action.payload.signed
      state.token = action.payload.token
      state.user = action.payload.user
    },
  }
})

export const { logar } = accessSlice.actions
export const isSigned = (state: RootState) => state.access.signed

export const loadStorageDataAsync = () => async dispatch => {
  const storageUser = await AsyncStorage.getItem('@PosicionamentoAuth:user')
  const storageToken = await AsyncStorage.getItem('@PosicionamentoAuth:token')

  if(storageUser && storageToken) {
    const dataResponse: AccessStateTypes = {
      signed: !!storageUser,
      token: storageToken,
      user: JSON.parse(storageUser)
    }

    api.defaults.headers.Authorization = `Bearer ${storageToken}`

    dispatch(logar(dataResponse))
  }
}

interface singInDataInterface {
  login: string
  pass: string
}
export type singInDataType = singInDataInterface

export const singInAsync = ({login, pass}: singInDataType) => async dispatch => {
  console.log(login, pass)

  const response = await singInApi()
  const { token, user } = response

  const dataResponse: AccessState = {
    signed: !!user,
    token,
    user
  }

  api.defaults.headers.Authorization = `Bearer ${token}`

  dispatch(logar(dataResponse))

  await AsyncStorage.setItem('@PosicionamentoAuth:user', JSON.stringify(user))
  await AsyncStorage.setItem('@PosicionamentoAuth:token', token)
}

export const singOutAsync = () => async dispatch => {
  await AsyncStorage.clear()
  dispatch(logar(initialState))
}

export default accessSlice.reducer
