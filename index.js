const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    if (tokens.method(req, res) === 'POST') {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            JSON.stringify(req.body)
        ].join(' ')
    }
}))
app.use(cors())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-532523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.send(persons)
})

app.get('/info', (req, res) => {
    let actualDate = new Date();
    res.send(`Phonebook has info for ${persons.length} people <br> ${actualDate}`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find((person) => person.id === id)

    // Si no encontramos la nota, devolvemos un 404
    person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((person) => person.id !== id)

  // Devolvemos el estado 204 correspondiente
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const person = req.body

    const newPerson = {
        id: Math.floor(Math.random()*2000),
        name: person.name,
        number: person.number
    }    

    if (!person.number || !person.name) {
        res.status(403).json({error: "Name and number are required fields"}).end()
    } else if (persons.find((person) => person.name === newPerson.name)) {
        res.status(403).json({error: "Name is an unique field"}).end()
    } else {
        persons = [...persons, newPerson]
        res.status(201).json(newPerson)
    }
})  

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})