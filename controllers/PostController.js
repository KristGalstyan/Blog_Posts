import PostSchema from '../models/Post.js'

export const getAll = async (req, res) => {
  try {
    const posts = await PostSchema.find().populate('user').exec()

    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось получит статьи'
    })
  }
}

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostSchema.find().limit(5).exec()

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5)

    res.json(tags)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось получит статьи'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id

    PostSchema.findByIdAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    )
      .populate('user')
      .then((found) => {
        res.json(found)
      })
      .catch((err) => {
        console.log(err)
        res.status(404).json({
          message: 'Не удалось найти статья'
        })
      })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось получит статьи'
    })
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id
    PostSchema.findOneAndDelete({ _id: postId })
      .then((data) => {
        if (!data) {
          console.log(err)
          res.status(404).json({
            message: 'Статья не найдена'
          })
        }
        res.json({ success: true })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          message: 'Не удалось удалить статью'
        })
      })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось получит статьи'
    })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new PostSchema({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId
    })
    const post = await doc.save()
    res.json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось создать статью'
    })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id

    await PostSchema.updateOne(
      {
        _id: postId
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags
      }
    )

    res.json({
      success: true
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось обновить статью'
    })
  }
}
