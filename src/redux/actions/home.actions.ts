import { ActionCreator } from 'redux'

import { UPDATE_HOME, HomeActionTypes, HomeInterface } from '../types'
import { homeService } from '../../services'
import { request, failure } from './common.actions'

const updateHomeSuccess: ActionCreator<HomeActionTypes> = ({ affirmations }: HomeInterface) => {
  return { type: UPDATE_HOME, payload: { affirmations } }
}

export function updateHome() {
  return dispatch => {
    dispatch(request())
    return homeService.updateHome()
      .then(
        response => {
          dispatch(updateHomeSuccess(response))
        },
        error => {
          dispatch(failure('Server error.'))
        }
      )
  }
}
