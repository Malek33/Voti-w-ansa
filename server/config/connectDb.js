const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOURI, {
  // Check the write concern settings
  w: 'majority',
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});