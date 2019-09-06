import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  tasks: hasMany('task'),
  group: belongsTo('group')
});
