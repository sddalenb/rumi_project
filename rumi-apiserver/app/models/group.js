const mongodb = require ('@onehilltech/blueprint-mongodb');
const { Schema } = mongodb;
const { Types: { refersTo }} = Schema;

// use mongodb.Types to access mongoose.Types

const options = {

  // Support soft delete of the resource.
  softDelete: true,
};

const schema = new Schema ({
  // add your schema definition here
  group_name: {type: String, required: false},
}, options);

module.exports = mongodb.resource ('group', schema);
