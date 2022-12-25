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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})