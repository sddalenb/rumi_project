const mongodb = require('@onehilltech/blueprint-mongodb');
const {Schema} = mongodb;
const {Types: {refersTo, ref}} = Schema;
const Group = require('./group');

// use mongodb.Types to access mongoose.Types

const options = {

  // Support soft delete of the resource.
  softDelete: true,
};

const schema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  role: {type: String, required: true, enum: ['admin', 'user']},
  group: [ref(Group, {required: false})],
}, options);

module.exports = mongodb.resource('user', schema);
