import * as React from 'react'
import { Image } from 'react-native'

import { styles } from './index.style'
import SignInImage from '../../../assets/images/HomeNotSigned/sign-in.png'

const HomeNotSignedInfoBoxImage: React.FC = () => {
  return <Image source={SignInImage} style={styles.image} />
}

export default HomeNotSignedInfoBoxImage
