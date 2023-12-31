import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../../axios'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await instance.post('/auth/login', params)
  return data
})

const initialState = {
  data: null,
  status: 'loading'
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading'
        state.data = null
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'loading'
        state.data = action.payload
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = 'error'
        state.data = null
      })
  }
})

export const selectIsAuth = (state) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { actions } = authSlice
