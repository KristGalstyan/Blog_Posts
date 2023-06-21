import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../../axios'

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params) => {
    const { data } = await instance.post('/auth/register', params)
    return data
  }
)

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
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading'
        state.data = null
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'loading'
        state.data = action.payload
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = 'error'
        state.data = null
      })
  }
})
