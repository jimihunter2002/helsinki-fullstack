const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://jimihunter:${password}@fullstack-cluster-g1mec.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

/*Steps for connecting to Mongo
1. Create Document Schema
2. Create Document Model (model name  Singular e.g Note and database name plural notes)
3. Save create document
*/
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'Testing can be',
  date: new Date(),
  important: true,
});

//Save to MongoDB
// note.save().then(response => {
//   console.log('note saved!');
//   mongoose.connection.close();
// });

//Fetch data from Mongo
Note.find({ important: false }).then(result => {
  result.forEach(note => console.log(note));
  mongoose.connection.close();
});
