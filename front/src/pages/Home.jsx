import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'

import { Post } from '../components/Post'
import { TagsBlock } from '../components/TagsBlock'
import { CommentsBlock } from '../components/CommentsBlock'
import { useFetchPostQuery, useGetTagsQuery } from '../redux/slices/posts.slice'
import { useSelector } from 'react-redux'

export const Home = () => {
  const userData = useSelector((state) => state.auth.data)
  const { data, isLoading } = useFetchPostQuery()
  const tagData = useGetTagsQuery()
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isLoading ? [...Array(5)] : data).map((obj, i) =>
            isLoading ? (
              <Post key={i} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
                key={i}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tagData.data} isLoading={tagData.isLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'
                },
                text: 'Это тестовый комментарий'
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg'
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top'
              }
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  )
}
