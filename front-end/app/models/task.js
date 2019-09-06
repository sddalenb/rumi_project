import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),

  description: DS.attr('string'),

  dateDue: DS.attr('date'),

  dateAssigned: DS.attr('date'),

  taskCompleted: DS.attr('boolean'),

  completionDate: DS.attr('date'),

  assignee: DS.belongsTo('user'),

  creator: DS.belongsTo('user'),

  group: DS.belongsTo('group'),

  status: DS.attr('string')

});
