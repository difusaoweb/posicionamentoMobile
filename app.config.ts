import 'dotenv/config'

export default {
  name: 'Posicionamento',
  version: '1.0.0',
  extra: {
    enableComments: process.env.COOLAPP_COMMENTS === 'true'
  }
}
