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

app.get("/api/persons", (req, res, next) => {
    Person.find({}).then(result => {
        res.json(result);
    }).catch(err => next(err))
})

app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id).
        then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post("/api/persons", (req, res, next) => {
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
            next(err)
        })
    }
})

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.get("/info", (req, res) => {
    Person.find({}).then(result => {
        const info = `Phonebook has info for ${result.length} people <br/> ${new Date()}`;
        res.send(info);
    }).catch(err => next(err))

})

app.put("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    console.log(body, id);
    Person.findById(id).
        then(person => {
            if (!person) {
                return response.status(404).end()
            }

            person.name = body.name
            person.number = body.number

            return person.save().then((updatedPerson) => {
                res.json(updatedPerson)
            })
        }).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    return response.status(500).send({ error: 'internal server error' })
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})