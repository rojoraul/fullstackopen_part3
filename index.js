require('./mongo')

const Person = require('./models/Person')
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

// let persons = [
//     {
//         id: 1,
//         name: "Arto Hellas",
//         number: "040-123456"
//     },
//     {
//         id: 2,
//         name: "Ada Lovelace",
//         number: "39-44-532523"
//     },
//     {
//         id: 3,
//         name: "Dan Abramov",
//         number: "12-43-234345"
//     },
//     {
//         id: 4,
//         name: "Mary Poppendick",
//         number: "39-23-6423122"
//     }
// ]

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/info', (req, res) => {
    let actualDate = new Date();

    Person.find({}).then(persons => {
        res.send(`Phonebook has info for ${persons.length} people <br> ${actualDate}`)
    })
})

app.get('/api/persons/:id', (req, res) => {
    const { id } = req.params
    Person.findById(id).then(person => {
        person ? res.json(person) : res.status(404).end()
    }).catch(err => {
        next(err)
    })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((person) => person.id !== id)

  // Devolvemos el estado 204 correspondiente
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const person = req.body

    if (!person.content) {
        return res.status(400).json({
            error: 'required content field is missing'
        })
    }

    const newPerson = new Person({
        name: person.name,
        number: person.number
    })
    
    newPerson.save().then(savedPerson => {
        res.status(201).json(savedPerson)
    })
})  

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})