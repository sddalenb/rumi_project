import DS from 'ember-data';

export default DS.Model.extend({

  // the user that is voting
  user: DS.belongsTo('user'),

  // the rumi this user is voting for
  vote: DS.belongsTo('user'),

  // the task in question
  task: DS.belongsTo('task'),

});
