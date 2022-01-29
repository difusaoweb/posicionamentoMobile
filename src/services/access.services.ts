import { AxiosResponse } from 'axios'

import api from './api'
import {
  LogInAccessParametersServiceInterface,
  SignUpAccessParametersServiceInterface
} from '../redux/types'

export const accessService = { logIn, signUp, logOut, getIsAuthenticated }

async function logIn({ userLogin, userPass }: LogInAccessParametersServiceInterface): Promise<AxiosResponse> {
  return await api
    .get('access', {
      params: {
        user_login: userLogin,
        user_pass: userPass
      }
    })
}

async function signUp({ userLogin, userPass, userEmail, displayName }: SignUpAccessParametersServiceInterface): Promise<AxiosResponse> {
  return await api
    .get('users/create', {
      params: {
        user_login: userLogin,
        user_pass: userPass,
        user_email: userEmail,
        display_name: displayName
      }
    })
}

async function logOut(): Promise<AxiosResponse> {
  return await api
    .get('access/delete')
}

async function getIsAuthenticated(): Promise<AxiosResponse> {
  return await api
    .get('access/delete')
}
