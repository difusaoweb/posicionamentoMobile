import AsyncStorage from '@react-native-async-storage/async-storage'

import api from './api'
import { CurrentUserInterface, LocalStorageInterface } from '../redux/types'

export const localStorageService = {
  getLocalStorage,
  setLocalStorage
}

async function getLocalStorage(): Promise<LocalStorageInterface> {
  const storageToken = await AsyncStorage.getItem('@PosicionamentoAuth:token')
  const storageUser = await AsyncStorage.getItem('@PosicionamentoAuth:user')

  // let storageToken: (string | null) = null
  // let storageUser: (string | null) = null

  // await AsyncStorage.multiGet([
  //   '@PosicionamentoAuth:token',
  //   '@PosicionamentoAuth:user'
  // ], (err, stores) => {
  //   stores?.map((result, i, store) => {
  //     storageToken = (store[i][0] == '@PosicionamentoAuth:token') ? store[i][1] : null
  //     storageUser = (store[i][0] == '@PosicionamentoAuth:user') ? store[i][1] : null
  //   })
  // })

  let token: string | null = null
  let user: CurrentUserInterface | null = null

  if(storageUser && storageToken) {
    api.defaults.headers.Authorization = `Bearer ${storageToken}`

    token = storageToken
    user = JSON.parse(storageUser)
  }

  return {token, user}
}

async function setLocalStorage({ token, user }: LocalStorageInterface): Promise<LocalStorageInterface> {
  if(token && user) {
    api.defaults.headers.Authorization = `Bearer ${token}`

    await AsyncStorage.multiSet([
      ['@PosicionamentoAuth:token', token],
      ['@PosicionamentoAuth:user', JSON.stringify(user)]
    ])
  }

  return {token, user}
}
