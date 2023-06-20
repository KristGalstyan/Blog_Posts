import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './slices/posts.slice'
import { authReducer } from './slices/auth.slice'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware)
  }
})
export default store
