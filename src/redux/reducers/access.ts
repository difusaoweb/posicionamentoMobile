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

export interface AccessState {
  token: string | null
  user: userDataInterface | null
  errorSingIn: saveErrorSingInActionProps | null
}
export type AccessStateTypes = AccessState

interface singInDataInterface {
  login: string
  pass: string
}
export type singInDataType = singInDataInterface

const initialState: AccessState = {
  token: null,
  user: null,
  errorSingIn: null
}

export const accessSlice = createSlice({
  name: 'access',
  initialState,
  reducers: {
    saveSingIn: (state, action: PayloadAction<saveSingInActionProps>) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    saveErrorSingIn: (state, action: PayloadAction<saveErrorSingInActionProps>) => {
      state.errorSingIn = {
        status: action.payload.status,
        message: action.payload.message
      }
    },
    saveNullSingIn: (state) => {
      state.token = null
      state.user = null
    }
  }
})

export const { saveSingIn, saveErrorSingIn, saveNullSingIn } = accessSlice.actions

export const currnetUser = (state: RootState) => state.access.user
export const currnetUserID = (state: RootState) => state.access.user.id
export const isSigned = (state: RootState) => state.access.user ? true : false
export const errorSingIn = (state: RootState) => state.access.errorSingIn

export const loadStorageDataAsync = () => async dispatch => {
  const storageToken = await AsyncStorage.getItem('@PosicionamentoAuth:token')
  const storageUser = await AsyncStorage.getItem('@PosicionamentoAuth:user')

  if(storageUser && storageToken) {
    const dataResponse: saveSingInActionProps = {
      token: storageToken,
      user: JSON.parse(storageUser)
    }

    api.defaults.headers.Authorization = `Bearer ${storageToken}`

    dispatch(saveSingIn(dataResponse))
  }
}

export const singInAsync = ({login, pass}: singInDataType) => async dispatch => {
  try {
    const { data } = await api
    .post('access', {
      user_login: login,
      user_pass: pass
    })

    const { token, user } = data

    const dataResponse: saveSingInActionProps = {
      token,
      user
    }

    api.defaults.headers.Authorization = `Bearer ${token}`

    dispatch(saveSingIn(dataResponse))

    await AsyncStorage.multiSet([
      ['@PosicionamentoAuth:token', token],
      ['@PosicionamentoAuth:user', JSON.stringify(user)]
    ])

  } catch (error) {
    dispatch(saveErrorSingIn({ status: error.request.status, message: error.message }))
  }
}

export const singOutAsync = () => async dispatch => {
  await AsyncStorage.clear()
  dispatch(saveNullSingIn())
}

export default accessSlice.reducer
