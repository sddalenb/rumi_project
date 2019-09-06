import Route from '@ember/routing/route';
import Authenticated from 'ember-cli-gatekeeper/mixins/authenticated';
import { hash } from 'rsvp';

export default Route.extend(Authenticated, {
  model(params){
    return this.get('store').findRecord('task', params.task_id);
  },

  setupController(controller, task){
    this._super (...arguments);
    let store = this.get('store');
    hash({

      comments: store.query('comment', {task: task.get('id')}),

    }).then(result=>{controller.setProperties(result)});
  }

});
