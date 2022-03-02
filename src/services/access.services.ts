import { AxiosResponse } from 'axios'

import api from './api'
import {
  GetSignInParametersServiceInterface,
  PostSignUpParametersServiceInterface
} from '../redux/types'

export const accessService = {
  getIsAuthenticated,
  getSignIn,
  postSignUp,
  deleteLogOut
}

async function getIsAuthenticated(): Promise<AxiosResponse> {
  return await api.get('access/authenticated')
}

async function getSignIn({
  userLogin,
  userPass
}: GetSignInParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('access', {
    params: {
      user_login: userLogin,
      user_pass: userPass
    }
  })
}

async function postSignUp({
  userLogin,
  userPass,
  userEmail,
  displayName
}: PostSignUpParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('users/create', {
    params: {
      user_login: userLogin,
      user_pass: userPass,
      user_email: userEmail,
      display_name: displayName
    }
  })
}

async function deleteLogOut(): Promise<AxiosResponse> {
  return await api.get('access/delete')
}
