const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});
userSchema.plugin(AutoIncrement, { inc_field: 'id' });
module.exports = mongoose.model('User', userSchema);
