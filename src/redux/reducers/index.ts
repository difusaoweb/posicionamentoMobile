import { combineReducers } from 'redux'

import { notificationsReducer } from './notifications.reducer'
import { affirmationsReducer } from './affirmations.reducer'
import { opinionsReducer } from './opinions.reducer'
import { accessReducer } from './access.reducer'
import { usersReducer } from './users.reducer'

export const rootReducer = combineReducers({
  notifications: notificationsReducer,
  affirmations: affirmationsReducer,
  opinions: opinionsReducer,
  access: accessReducer,
  users: usersReducer
})

export type RootState = ReturnType<typeof rootReducer>
