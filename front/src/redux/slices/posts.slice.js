import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://localhost:4444/'

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['posts'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  endpoints: (builder) => ({
    fetchPost: builder.query({
      query: () => '/posts'
    }),
    getTags: builder.query({
      query: () => '/tags'
    })
  })
})

export const { useFetchPostQuery, useGetTagsQuery } = api
