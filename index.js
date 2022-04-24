const express = require('express')
const app = express()
const morgan = require("morgan")
const port = 3001

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'OoOoOoOoOoOoOoOops! page not found' })
}

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req[body]'))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]


    


app.get("/api/persons", (req,res) => {
    res.json(persons)
})
app.get("/info", (req,res) => {
    const count = persons.length
    const date = new Date()
    res.send(`<p>phonebook has info for ${count} people</p><p>processed request at ${date}</p>`)
})
app.get("/api/persons/:id", (req,res) => {
    const id = Number(req.params.id)
    const contact = persons.filter(person => person.id === id)

    if(contact.length === 0){
        res.status(404, "contact not found").json({error: "contact not found"})
    }

    res.json(contact)
})

app.delete("/api/persons/:id", (req,res) => {
    const id = Number(req.params.id)
    console.log(`remove contact with the id of ${id}`)
    persons = persons.filter(person => person.id === id ? false : person)
    console.log(persons)
    res.json(persons)
})

app.post("/api/persons", (req,res) => {
    const person = req.body
    person.id = Math.floor(Math.random()*99999999999)
    console.log(person)
    if(!person.name || !person.number){
        return res.status(400).json({error: "forms not filled out"})
    }
    if(persons.some(p => p.name === person.name)){
        return res.status(400).json({error: "the name already exists, please try another name"})
    }
    
    persons = persons.concat(person)
    res.json(persons)
})


app.use(unknownEndpoint)
app.listen(port, () => {
    console.log(`app is running on http://localhost:${port}`)
})