import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  assignedBy: belongsTo('user', {inverse: null}),
  assignedTo: belongsTo('user'),
  group: belongsTo('group')
});
