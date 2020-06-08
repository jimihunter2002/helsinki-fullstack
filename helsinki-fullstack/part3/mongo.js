const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('password and other details are missing');
  console.log('run command: node mongo.js <password> <name> <phone>');
  process.exit(1);
}

const [, , password, name, phone] = process.argv;

const url = `mongodb+srv://jimihunter:${password}@fullstack-cluster-g1mec.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo connected'))
  .catch(err => console.log(err));

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length === 3) {
  fetchAllContacts();
} else if (name === undefined || phone === undefined) {
  console.log('provide name and phone as arguments');
  console.log('run command: node mongo.js <password> <name> <phone>');
  process.exit(1);
} else {
  createNewContact();
}

function createNewContact() {
  const contact = new Contact({
    name,
    phone,
  });

  contact
    .save()
    .then(response => {
      console.log(`added ${name} number ${phone} to phonebook`);
      mongoose.connection.close();
    })
    .catch(err => {
      console.log(err);
    });
}

function fetchAllContacts() {
  console.log('phonebook:');
  Contact.find({})
    .then(results => {
      results.forEach(contact => {
        console.log(contact.name, contact.phone);
      });
      mongoose.connection.close();
    })
    .catch(err => {
      console.log(err);
    });
}
