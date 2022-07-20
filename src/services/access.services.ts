import { AxiosResponse } from 'axios'

import api from './api'
import {
  GetLogInParametersServiceInterface,
  AccessResetPasswordParameters,
  AccessResetPasswordVerifyCodeParameters,
  AccessServiceResetPasswordChangePasswordParameters
} from '../redux/types'

export const accessService = {
  getIsAuthenticated,
  getLogIn,
  deleteLogOut,
  accessResetPassword,
  accessResetPasswordVerifyCode,
  accessResetPasswordChangePassword
}

async function getIsAuthenticated(): Promise<AxiosResponse> {
  return await api.get('/access/authenticated')
}

async function getLogIn({
  userLogin,
  userPass
}: GetLogInParametersServiceInterface): Promise<AxiosResponse> {
  return await api.get('/access', {
    params: {
      user_login: userLogin,
      user_pass: userPass
    }
  })
}

async function deleteLogOut(): Promise<AxiosResponse> {
  return await api.get('/access/delete')
}

async function accessResetPassword({
  userLogin
}: AccessResetPasswordParameters): Promise<AxiosResponse> {
  return await api.get('/access/reset-password', {
    params: {
      user_login: userLogin
    }
  })
}

async function accessResetPasswordVerifyCode({
  token
}: AccessResetPasswordVerifyCodeParameters): Promise<AxiosResponse> {
  return await api.get('/access/reset-password/verify-code', {
    params: { token }
  })
}

async function accessResetPasswordChangePassword({
  token,
  password
}: AccessServiceResetPasswordChangePasswordParameters): Promise<AxiosResponse> {
  return await api.get('/access/reset-password/change-password', {
    params: { token, user_pass: password }
  })
}
