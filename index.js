const chalk = require('chalk')
const express = require('express')
const path = require('path')
const { addNote, getNotes, removeNote, editNote } = require('./notes.controller')

const port = 3000
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', 'pages')


app.get('/', async(req, res) => {
  res.render('index', {
    title: 'Welcome To Ejs & Express!',
    notes: await getNotes() || [],
    created: false
  })
})


app.post('/', async (req, res) => {
  await addNote(req.body.title)
  res.render('index', {
    title: 'Welcome To Ejs & Express!',
    notes: await getNotes(),
    created: true
  })
})


app.put('/:data', async (req, res) => {
  const {title, id} = JSON.parse(req.params.data)
  await editNote(title, id)

  res.render('index', {
    title: 'Welcome To Ejs & Express!',
    notes: await getNotes(),
    created: false
  })
})


app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id)
  console.log('id from server', req.params.id)

  res.render('index', {
    title: 'Welcome To Ejs & Express!',
    notes: await getNotes(),
    created: false
  })
})


app.listen(port, () => {
  console.log(chalk.yellow(`Example app listening on port ${port}`))
})