import { configureStore } from '@reduxjs/toolkit'

import AccessReducer from './reducers/access'
import AffirmationReducer from './reducers/affirmation'

const store = configureStore({
  reducer: {
    access: AccessReducer,
    affirmation: AffirmationReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
