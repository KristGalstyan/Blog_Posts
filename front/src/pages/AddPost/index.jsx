import React from 'react'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import SimpleMDE from 'react-simplemde-editor'
import { selectIsAuth } from '../../redux/slices/auth.slice'

import 'easymde/dist/easymde.min.css'
import styles from './AddPost.module.scss'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from '../../axios'

export const AddPost = () => {
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)

  const [isLoading, setIsLoading] = React.useState(false)

  const [text, setText] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [tags, setTags] = React.useState('')
  const [imageUrl, setimageUrl] = React.useState('')
  const inputFileRef = React.useRef(null)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      formData.append('image', event.target.files[0])
      const { data } = await axios.post('/upload', formData)
      setimageUrl(data.url)
    } catch (err) {
      console.warn(err)
      alert('Ошибка при загрузке файла')
    }
  }

  const onClickRemoveImage = (event) => {
    setimageUrl('')
  }

  const onChange = React.useCallback((value) => {
    setText(value)
  }, [])

  const onSubmit = async () => {
    try {
      setIsLoading(true)

      const fields = {
        title,
        text,
        imageUrl,
        tags: tags.split(',')
      }
      const { data } = await axios.post('/posts', fields)
      const id = data._id
      navigate(`/posts/${id}`)
    } catch (err) {
      console.warn(err)
      alert('Ошибка при создании файла')
    }
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000
      }
    }),
    []
  )

  if (!isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:4444${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опубликовать
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  )
}
