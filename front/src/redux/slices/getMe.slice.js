import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../../axios'

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await instance.get('/auth/me')
  return data
})

const initialState = {
  data: null,
  status: 'loading'
}

createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = 'loading'
        state.data = null
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = 'loading'
        state.data = action.payload
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = 'error'
        state.data = null
      })
  }
})
