const mongoose = require('mongoose');


const uri = 'mongodb+srv://admin:8FGRj07hN9baGq4K@cluster0.yfhml.mongodb.net/verq?retryWrites=true&w=majority';
const uriLocal = 'mongodb://localhost/verq';

mongoose.connect(uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((db) => {
  console.log('Se ha realizado la conexion a la db.');
}).catch((err) => {
  console.log('Ha ocurrido un error al conectar a la db.');
})

module.exports = mongoose;