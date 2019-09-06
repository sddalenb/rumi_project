import DS from 'ember-data';

export default DS.Model.extend({
  
  task: DS.belongsTo('task'),

  postDate: DS.attr('date'),

  message: DS.attr('string'),

  user: DS.belongsTo('user'),

});
