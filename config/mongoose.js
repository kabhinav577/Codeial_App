const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error occur in DB'));


db.once('open', ()=> {
    console.log('Successfully connected to the DB');
})