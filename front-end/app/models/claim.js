import DS from 'ember-data';

export default DS.Model.extend({

  user: DS.belongsTo('user'),

  task: DS.belongsTo('task'),

  reason: DS.attr('string'),

  accepted: DS.attr('boolean'),

  answered: DS.attr('boolean'),

});
