import React, { useState } from 'react'
import { Text } from 'react-native'
import AppLoading from 'expo-app-loading'

import AppRoutes from './App/index.routes'
import AuthRoutes from './Auth/index.routes'
import { useAppSelector } from '../hooks'

import { useAppDispatch } from '../hooks'
import { loadStorageDataAsync, isSigned as isSignedRedux } from '../redux/reducers/access'

export function Routes() {
  const [isReady, setIsReady] = useState(true)

  const signed = useAppSelector(isSignedRedux)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    function loadStorageData() {
      dispatch(loadStorageDataAsync())
      setIsReady(false)
    }
    loadStorageData()
  }, [])

  if(isReady)
    return <AppLoading />

  return signed ? <AppRoutes /> : <AuthRoutes />
}
