require('dotenv').config();
const Person = require('./modules/phone');
const express = require("express");
// const morgan = require("morgan");
const phone = require('./modules/phone');
const app = express();
app.use(express.json());
app.use(express.static("dist"));


//Exercise 3.1

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result);
    })
})




//Exercise 3.2

app.get('/info', (request, response) => {
    Person.find({}).then(result => {
        const count = result.length;

        const date = new Date();

        response.send(`<h3>Phonebook has info for ${count} people</h3><br>
        ${date.toDateString()} ${date.toTimeString()}`)
    })
    
    
})


//Exercise 3.3

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(result => {
        response.json(result);
    })    
})

//Exercise 3.4

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(result => {
        if (result) {
            return response.status(204).end();
        } 
        })
        .catch(error => next(error));
    })

//Exercise 3.5


// morgan.token("body", (req, res) => {
//         return JSON.stringify(req.body);
//     })
// app.use(morgan(":method :url :status :res[content-length] :response-time ms :body"));

//Post Operation Function
app.post('/api/persons', (req, res, next) => {
    // let id;
    // do {
    //     id = Math.floor(Math.random() * 200000).toString();
    // } while (data.find(n => n.id === id));

    const body = req.body;
    
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "No Name or Number"
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number.toString(),
    });

    person.save().then(result => {
        res.json(result);
    }).catch(err => next(err));      
});



//Put operation function
app.put('/api/persons/:id', (req, res, next) => {
    const {name, number} = req.body;
    Person.findById(req.params.id).then(person => {
        person.name = name;
        person.number = number;
        return person.save().then(result => {
            res.json(result);
        })        
    }
)
    .catch(error => next(error));
})






const errorHandler = (err, req, res, next) => {
    console.error(err.message);

    if (err.name === "CastError") {
        return res.status(400).json({error: 'Malformatted id'});
    } else if (err.name === "ValidationError") {
        return res.status(400).json({error: err.message})
    }

    next(err);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 