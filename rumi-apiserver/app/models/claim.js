const mongodb = require ('@onehilltech/blueprint-mongodb');
const { Schema } = mongodb;
const { Types: { refersTo, ref }} = Schema;
const User = require('./user');
const Task = require('./task');


// use mongodb.Types to access mongoose.Types

const options = {

  // Support soft delete of the resource.
  softDelete: true,
};

const schema = new Schema ({
  // add your schema definition here
  user: ref(User, {required: true}),
  task: ref(Task, {required: true}),
  reason: {type: String, default: 'No reason given', required: true},
  accepted: {type: Boolean, default: null, required: false},
  answered: {type: Boolean, default: false, required: false}

}, options);

module.exports = mongodb.resource ('claim', schema);
