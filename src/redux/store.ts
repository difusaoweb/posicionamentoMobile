import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducers'
import thunk from 'redux-thunk'

// const store = createStore(rootReducer, applyMiddleware(thunk))
export const store = createStore(rootReducer, {}, applyMiddleware(thunk))

// export type RootState = ReturnType<typeof store.getState>
export type RootState = typeof store.getState
export type AppDispatch = typeof store.dispatch
