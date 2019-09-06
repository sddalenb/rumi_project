import Route from '@ember/routing/route';
import Authenticated from 'ember-cli-gatekeeper/mixins/authenticated';
import { hash } from 'rsvp';

export default Route.extend(Authenticated, {
  model(){
    let currentUser = this.get('currentUser');
    return this.store.findRecord('user',currentUser.get('id'));
  },

  setupController(controller, user){
    this._super (...arguments);
    let store = this.get('store');
    hash({

      tasks: store.query('task', {assignee: user.get('id')}),

      groupTasks: store.query('task', {group: user.belongsTo('group').id()}),

    }).then(result=>{controller.setProperties(result)});
  }
});
