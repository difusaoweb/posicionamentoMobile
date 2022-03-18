import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignContent: 'flex-start',
    // justifyContent: 'center',
    flexDirection: 'column',
    // flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingTop: 30
  },
  row: {
    flexDirection: 'row'
    // width: '100%'
  },
  rowJustifyEnd: {
    justifyContent: 'flex-end'
  },
  input: {
    marginBottom: 6
  },
  inputPassword: {
    marginBottom: 6
  },
  button: {
    marginBottom: 8
  },
  buttonSignIn: {
    marginBottom: 16
  },
  buttonLeft: {
    width: '100%',
    justifyContent: 'flex-end'
  }
})
