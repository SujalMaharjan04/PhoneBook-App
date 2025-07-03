const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(cors());



let data =[
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

//Exercise 3.1

app.get('/api/persons', (request, response) => {
    response.json(data);
})

app.use(express.static("dist"));

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

app.use(express.json());
morgan.token("body", (req, res) => {
        return JSON.stringify(req.body);
    })
app.use(morgan(":method :url :status :res[content-length] :response-time ms :body"));
app.post('/api/persons', (req, res) => {
    let id;
    do {
        id = Math.floor(Math.random() * 200000).toString();
    } while (data.find(n => n.id === id));

    const body = req.body;
    
    const checkName = data.find(n => n.name === body.name);
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "No Name or Number"
        })
    } else if (checkName) {
        return res.status(400).json({
            error: "Name should be unique"
        })
    }

    const person = {
        id : id,
        name: body.name,
        number: body.number
    }

    data.push(person);    
    res.json(data)

   
})




app.get('/', (req, res) => {
    res.send("Hello World!");
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 