import * as React from 'react'
import { Image } from 'react-native'

import { styles } from './index.style'
import LogInImage from '../../../assets/images/HomeNotSigned/sign-in.png'

const HomeNotSignedInfoBoxImage: React.FC = () => {
  return <Image source={LogInImage} style={styles.image} />
}

export default HomeNotSignedInfoBoxImage
