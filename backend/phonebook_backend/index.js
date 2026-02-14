const express = require("express");
const morgan = require("morgan");



const app = express();

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
    res.json(persons);
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
        const exists = persons.some(p => p.name.toLowerCase() === body.name.toLowerCase());
        if (exists) {
            res.status(400).json({ error: "name must be unique" });
        }
        else {
            const newPerson = {
                id: String(Math.max(...persons.map(p => Number(p.id))) + 1),
                name: body.name,
                number: body.number
            }
            persons.push(newPerson);
            res.json(newPerson);
        }
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

app.listen(3001, () => {
    console.log("Server running on port 3001");
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)