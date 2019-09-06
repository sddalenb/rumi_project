const mongodb = require ('@onehilltech/blueprint-mongodb');
const { Schema } = mongodb;
const { Types: { refersTo, ref }} = Schema;
const Task = require ('./task');
const User = require ('./user');

// use mongodb.Types to access mongoose.Types

const options = {

  // Support soft delete of the resource.
  softDelete: true,
};

const schema = new Schema ({
  // add your schema definition here
  task: ref(Task, {required: true, unique: false}),
  post_date: {type: Date, default: Date.now(), required: true},
  message: {type: String, default: '', required: true},
  user: ref(User, {required: true}),
}, options);

module.exports = mongodb.resource ('comment', schema);
