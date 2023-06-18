import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: {
    items: [],
    status: 'loading'
  },
  tags: {
    items: [],
    status: 'loading'
  }
}
