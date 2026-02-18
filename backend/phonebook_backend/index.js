require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const Person = require("./models/Person");


const app = express();

app.use(cors())
app.use(express.json());

// Custom token to log POST body
morgan.token("body", (req) => {
    return req.method === "POST" ? JSON.stringify(req.body) : "";
});

// Morgan logging middleware
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) => {
    Person.find({}).then(result => {
        res.json(result);

    })
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);
    if (person) {
        res.json(person);
    }
    else {
        res.status(404).end();
    }
})

app.post("/api/persons", (req, res) => {
    body = req.body;
    if (!body.name || !body.number) {
        res.status(400).json({ error: "name or number is missing" });
    }
    else {
        const newPerson = new Person({
            name: body.name,
            number: body.number
        })
        newPerson.save().then(savedPerson => {
            res.json(savedPerson);
            console.log(savedPerson);
        }).catch(err => {
            res.status(400).json({ error: err.message });
        })
        // const exists = persons.some(p => p.name.toLowerCase() === body.name.toLowerCase());
        // if (exists) {
        //     res.status(400).json({ error: "name must be unique" });
        // }
        // else {
        //     const newPerson = {
        //         id: String(Math.max(...persons.map(p => Number(p.id))) + 1),
        //         name: body.name,
        //         number: body.number
        //     }
        //     persons.push(newPerson);
        //     res.json(newPerson);
        // }
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    persons = persons.filter(p => p.id !== id);
    res.status(204).end();
})

app.get("/info", (req, res) => {
    const info = `Phonebook has info for ${persons.length} people <br/> ${new Date()}`;
    res.send(info);
})

app.put("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const person = persons.find(p => p.id === id);
    console.log(body, id);
    if (person) {
        const updatedPerson = { ...person, number: body.number }
        persons = persons.map(p => p.id === id ? updatedPerson : p);
        res.json(updatedPerson);
    }
    else {
        res.status(404).end();
    }
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})