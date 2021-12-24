import * as React from 'react'
import { BottomNavigation } from 'react-native-paper'
import { FontAwesome5 } from '@expo/vector-icons'

import { HomePage } from '../../pages/HomePage'
import { SearchPage } from '../../pages/SearchPage'
import { AddPage } from '../../pages/AddPage'
import { ProfilePage } from '../../pages/ProfilePage'


const AppRoutes: React.FC = () => {
  const [index, setIndex] = React.useState<number>(0)
  const [routes] = React.useState([
    {
      key: 'homePage',
      title: 'Home',
      icon: () => (
        <FontAwesome5 name="home" color="#ffffff" size={20} />
      )
    },
    {
      key: 'searchPage',
      title: 'Procurar',
      icon: () => (
        <FontAwesome5 name="search" color="#ffffff" size={20} />
      )
    },
    {
      key: 'addPage',
      title: 'Adicionar',
      icon: () => (
        <FontAwesome5 name="plus" color="#ffffff" size={20} />
      )
    },
    {
      key: 'profilePage',
      title: 'Perfil',
      icon: () => (
        <FontAwesome5 name="user" color="#ffffff" size={20} />
      )
    }
  ])

  const renderScene = BottomNavigation.SceneMap({
    homePage: HomePage,
    searchPage: SearchPage,
    addPage: AddPage,
    profilePage: ProfilePage
  })

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

export default AppRoutes
