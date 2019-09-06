import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),

  lastName: DS.attr('string'),

  role: DS.attr('string'),

  group: DS.belongsTo('group')

  // Might add more to this eventually

});
