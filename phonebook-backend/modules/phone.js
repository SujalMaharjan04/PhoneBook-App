const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGO_URI;

console.log("Connecting to DB", url);

mongoose.connect(url).then(result => {
    console.log("Connected to the DB");
}).catch(error => {
    console.log("Failed to connect to DB", error.message);
})

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true},
    number: String,
});

bookSchema.set("toJSON", {
    transform: (document, requestedObject) => {
        requestedObject.id = requestedObject._id.toString();
        delete requestedObject._id;
        delete requestedObject.__v;
    }
})
module.exports = mongoose.model('Person', bookSchema);

