const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())

let notes = [
    {
        id: 1,
        content: 'content 1.',
        date: '2020-01-11T17:30:31.0982',
        important: true,
    },
    {
        id: 2,
        content: 'content 2.',
        date: '2020-01-12T17:30:31.0982',
        important: true,
    },
    {
        id: 3,
        content: 'content 3.',
        date: '2020-01-13T17:30:31.0982',
        important: true,
    },
]

app.get('/', (req, res) => {
    res.send(`<h1>Hola from Server.</h1>`)
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(item => item.id)) : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'Content is missing.'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }

    notes = notes.concat(note)

    response.json(note)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)

    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})
app.put('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const newNote = request.body

    notes = notes.map(item => item.id === id ? newNote : item)

    response.json(notes.find(item => item.id === id))
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})


// const PORT = 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server working on port: ${PORT}`)
})