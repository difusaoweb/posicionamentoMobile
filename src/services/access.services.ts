import { AxiosResponse } from 'axios'

import api from './api'
import {
  GetLogInParametersServiceInterface,
  PostSignUpParametersServiceInterface,
  AccessResetPasswordParameters
} from '../redux/types'

export const accessService = {
  getIsAuthenticated,
  getLogIn,
  postSignUp,
  deleteLogOut,
  accessResetPassword
}

async function getIsAuthenticated(): Promise<AxiosResponse> {
  return await api.get('access/authenticated')
}

async function getLogIn({
  userLogin,
  userPass
}: GetLogInParametersServiceInterface): Promise<AxiosResponse> {
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

async function accessResetPassword({
  userLogin
}: AccessResetPasswordParameters): Promise<AxiosResponse> {
  return await api.get('access/reset-password', {
    params: {
      user_login: userLogin
    }
  })
}
