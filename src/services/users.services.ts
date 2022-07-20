import { AxiosResponse } from 'axios'

import api from './api'
import {
  GetUserProfileParametersServiceInterface,
  ReduxUsersCreateUserServiceParameters
} from '../redux/types'

export const userService = { getUserProfile, createUser}

async function getUserProfile({
  userId
}: GetUserProfileParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('/users/profile', { params: { user_id: userId } })
}

async function createUser({
  username,
  password,
  email,
  displayName
}: ReduxUsersCreateUserServiceParameters): Promise<AxiosResponse> {
  return await api.get('/users/create', {
    params: {
      username,
      password,
      email,
      display_name: displayName
    }
  })
}