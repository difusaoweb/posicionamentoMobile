import { configureStore } from '@reduxjs/toolkit'

import AccessReducer from './reducers/access'

const store = configureStore({
  reducer: {
    access: AccessReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
