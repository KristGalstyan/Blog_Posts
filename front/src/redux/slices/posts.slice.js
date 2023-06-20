import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://localhost:4444/'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  endpoints: (builder) => ({
    fetchPost: builder.query({
      query: () => '/posts'
    }),
    getTags: builder.query({
      query: () => '/tags'
    }),
    getPostsById: builder.query({
      query: (id) => `/posts/${id}`
    })
  })
})

export const { useFetchPostQuery, useGetTagsQuery, useGetPostsByIdQuery } = api
