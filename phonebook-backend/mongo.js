const mongoose = require("mongoose");




const password = encodeURIComponent(process.argv[2]);
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://maharjansujal100:${password}@cluster0.hvhmrmd.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);



const bookSchema = mongoose.Schema({
    name: String,
    number: String,
});

const Book = mongoose.model('Person', bookSchema);

const people = new Book({
    name: name,
    number: number,
})

if (!process.argv[3] && !process[4]) {
    Book.find({}).then(result => {
        console.log("phonebook");
        result.forEach(element => {
            console.log(`${element.name} ${element.number}`);
        });
        mongoose.connection.close();
    })
} else {
    people.save().then(result => {
    console.log(`saved ${name} ${number} to the phonebook`);
    mongoose.connection.close();
})
}


