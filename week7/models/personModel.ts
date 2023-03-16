const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A person needs a name'],
        trim: true,
    },
    age: {
        type: Number,
        required: [true, 'A person needs an age'],
        minValue: [0, 'A person cannot be under 0 years old'],
    },
    city: {
        type: String,
        maxLength: [85, 'City name cannot be over 85 characters'],
        minLength: [1, 'City name cannot be under 1 character'],
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const Person = mongoose.model('Person', personSchema);

export default Person;