const express = require('express')
const app = express()

app.use(express.json())

const persons = [
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

app.get('/api/persons', (res, req) => {
    req.send(persons)
})

app.get('/info', (res, req) => {
    let actualDate = new Date();
    req.send(`Phonebook has info for ${persons.length} people <br> ${actualDate}`)
})

app.get('/api/persons/:id', (res, req) => {
    const id = Number(res.params.id)
    const person = persons.find((person) => person.id === id)

    // Si no encontramos la nota, devolvemos un 404
    person ? req.json(person) : req.status(404).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})