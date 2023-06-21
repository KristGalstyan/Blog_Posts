import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import { useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import styles from './Login.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth.slice'

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: 'kristgcalsxt@masil.ru',
      password: '601c55c6'
    },
    mode: 'all'
  })

  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if (!data.payload) {
      return alert('Не удалось авторизоваться!')
    }

    if ('token' in data.payload) {
      localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    navigate('/')
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />

        <TextField
          className={styles.field}
          label="Пароль"
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  )
}
