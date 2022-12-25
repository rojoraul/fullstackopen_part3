const process = require('process')

const mongoose = require('mongoose')
const connectionString = `mongodb+srv://rrojo:${process.argv[2]}@cluster0.edfy6zh.mongodb.net/rauldb?retryWrites=true&w=majority`

const Person = require('./models/Person')

mongoose.set('strictQuery', false)
mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  }).catch(error => {
    console.error(error)
  })

if (process.argv.length === 5) {
    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    newPerson.save().then(savedPerson => {
      console.log(`added ${savedPerson.name} number ${savedPerson.number} to phonebook`)
      mongoose.connection.close()
     })
}

if (process.argv.length === 3) {
  Person.find({}).then(persons => {
      console.log("phonebook:")
      persons.forEach(person => {
          console.log(person.name, person.number)
      })
    mongoose.connection.close()
  })
}

// app.post('/api/persons', (request, response) => {
//   const person = request.body

//   if (!person.number || !person.name ) {
//     return response.status(400).json({
//       error: 'required name or number field is missing'
//     })
//   }

//   const newPerson = new Person({
//     name: person.name,
//     number: person.number
//   })

//     newPerson.save().then(savedPerson => {
//         console.log(`added ${savedPerson.name} number ${savedPerson.number} to phonebook`)
//         response.status(201).json(savedPerson)
//   })
// })
