import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './slices/posts.slice'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware)
  }
})
export default store
