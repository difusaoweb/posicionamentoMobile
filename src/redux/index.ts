import { configureStore } from '@reduxjs/toolkit'

import SignInUpReducer from './reducers/signInUpPage'
import HomeReducer from './reducers/homePage'
import AddReducer from './reducers/addPage'
import SearchReducer from './reducers/searchPage'
// import ProfileReducer from './reducers/profilePage'
// import AffirmationReducer from './reducers/affirmationPage'

const store = configureStore({
  reducer: {
    signInUp: SignInUpReducer,
    home: HomeReducer,
    add: AddReducer,
    search: SearchReducer,
    // profile: ProfileReducer,
    // affirmation: AffirmationReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
