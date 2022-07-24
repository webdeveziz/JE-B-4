const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString()
  }
  notes.push(note)
  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.bgRed('Some note was added!'))
}

async function editNote(title, id) {
  const notes = await getNotes()

  const newNotes = notes.map(note => {
    if (note.id === id) {
    return {title, id}
    } else {
      return note
    }
  })

  await fs.writeFile(notesPath, JSON.stringify(newNotes))
  console.log(chalk.white('Some note was edited!'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
  const notes = await getNotes()
  console.log(chalk.bgRed('Here is the list of notes :: '))
  console.log(chalk.underline.bold.red('Id ') + '          ', chalk.underline.bold.green('Title '))
  notes.forEach(note => {
    console.log(chalk.red(note.id), chalk.green(note.title))
  });
}

async function removeNote(id) {
  const notes = await getNotes()
  const newNotes = notes.filter(note => note.id !== id)
  await fs.writeFile(notesPath, JSON.stringify(newNotes))
}

module.exports = {
  addNote, printNotes, removeNote, getNotes, editNote
}