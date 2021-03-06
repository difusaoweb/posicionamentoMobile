import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    marginVertical: 9,
    marginHorizontal: 12
  },
  column: {
    flexDirection: 'column'
  },
  avaliationRow: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  avaliationColumn: {
    // backgroundColor: '#0ff',
    paddingHorizontal: 10
  },
  avaliationButton: {
    // backgroundColor: '#ff0',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8
  },
  icon: { marginRight: 3 },
  text: {}
})
