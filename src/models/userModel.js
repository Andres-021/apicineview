const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const userPermissionsMovie = new mongoose.Schema({
  add: {
    type: Number,
    default: 0
  },
  edit: {
    type: Number,
    default: 0
  },
  delete: {
    type: Number,
    default: 0
  },
  getter: {
    type: Number,
    default: 0
  }
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  second_name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  second_surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
    // unique: true,
    // validate: validate({
    //   validator: 'isEmail',
    //   message: 'Introduce un email valido.'
    // })
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: {
      values: ['M', 'F', 'Otro'],
      message: 'genero {VALUE} no soportado.'
    }
  },
  rol: {
    type: String,
    required: true,
    enum: {
      values: ['admin', 'mod'],
      message: 'rol {VALUE} no soportado.'
    }
  },
  verified: {
    type: Number,
    default: 0
  },
  permissions:[userPermissionsMovie],
  img:{
    data: Buffer,
    contentType: String
  },
  date_of_creation: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('users', userSchema);