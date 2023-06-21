import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

import styles from './Login.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/slices/auth.slice'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { fetchRegister } from '../../redux/slices/fetchRegister.slice'

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: ''
    },
    mode: 'all'
  })

  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if (!data.payload) {
      return alert('Не удалось авторизоваться!')
    }

    if ('token' in data.payload) {
      localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    navigate('/login')
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('fullName', { required: 'Полное имя' })}
          className={styles.field}
          error={!!errors.fullName?.message}
          label="Полное имя"
          fullWidth
        />
        <TextField
          {...register('email', { required: 'Укажите E-Mail' })}
          className={styles.field}
          error={!!errors.email?.message}
          label="E-Mail"
          fullWidth
        />
        <TextField
          {...register('password', { required: 'Укажите пароль' })}
          className={styles.field}
          error={!!errors.password?.message}
          label="Пароль"
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  )
}
