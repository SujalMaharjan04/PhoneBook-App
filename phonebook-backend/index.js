require('dotenv').config();
const Person = require('./modules/phone');
const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");
const phone = require('./modules/phone');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));


//Exercise 3.1

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result);
    })
})




//Exercise 3.2

// app.get('/info', (request, response) => {
//     const count = data.length;
//     const date = new Date();

//     response.send(`<h3>Phonebook has info for ${count} people</h3><br>
//         ${date.toDateString()} ${date.toTimeString()}`)
// })


//Exercise 3.3

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = data.find(person => person.id === id);

    if (person) {
        response.json(person)
    } else {
        response.status(400).end();
    }
})

//Exercise 3.4

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    data = data.filter(person => person.id !== id);

    response.status(204).end();
})

//Exercise 3.5


// morgan.token("body", (req, res) => {
//         return JSON.stringify(req.body);
//     })
// app.use(morgan(":method :url :status :res[content-length] :response-time ms :body"));
app.post('/api/persons', (req, res) => {
    // let id;
    // do {
    //     id = Math.floor(Math.random() * 200000).toString();
    // } while (data.find(n => n.id === id));

    const body = req.body;
    
    // const checkName = data.find(n => n.name === body.name);
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "No Name or Number"
        })
    // } else if (checkName) {
    //     return res.status(400).json({
    //         error: "Name should be unique"
    //     })
    }

    const person = new Person({
        name: body.name,
        number: body.number.toString(),
    });

    person.save().then(result => {
        res.json(result);
    })   

   
})




app.get('/', (req, res) => {
    res.send("Hello World!");
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 