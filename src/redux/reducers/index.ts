import { combineReducers } from 'redux'

import { localStorageReducer } from './localStorage.reducer'
import { homeReducer } from './home.reducer'
// import { storiesReducer } from './stories.reducer'

export const rootReducer = combineReducers({
  localStorage: localStorageReducer,
  home: homeReducer
  // feed: feedReducer,
  // stories: storiesReducer
})

export type RootState = ReturnType<typeof rootReducer>
