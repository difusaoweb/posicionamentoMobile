import * as React from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native'
import {
  Paragraph,
  Card,
  useTheme,
  ActivityIndicator
} from 'react-native-paper'

import HomeAffirmationListItem from '../../organims/HomeAffirmationListItem'
import ErrorHome from '../../organims/ErrorHome'
import api from '../../../services/api'

interface Affirmation {
  id: number,
  message: string
  strongly_agree: number | null
  agree: number | null
  neutral: number | null
  disagree: number | null
  strongly_disagree: number | null
}

const ListAfirmationsHome2 = () => {
  const { colors } = useTheme()

  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [affirmations, setAffirmations] = React.useState<Affirmation[]>([])

  React.useEffect(() => {
    async function getAffirmations() {
      try {
        const { data } = await api
        .get('affirmations/home')
        setAffirmations(data)
      } catch (error) {
        console.log(error)
        setError(true)
      }
    }

    getAffirmations()
    setLoading(false)
  },[])

  if(loading)
    return (
      <View style={styles.row}>
        <ActivityIndicator />
      </View>
    )

  if(error)
    return <ErrorHome />

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      renderItem={({ item }) => (
        <HomeAffirmationListItem
          message={item.message}
          stronglyAgree={item.strongly_agree}
          agree={item.agree}
          neutral={item.neutral}
          disagree={item.disagree}
          stronglyDisagree={item.strongly_disagree}
        />
      )}
      keyExtractor={item => item.id}
      data={affirmations}
    />
  )
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  }
})

export default ListAfirmationsHome2
