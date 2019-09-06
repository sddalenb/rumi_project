import Route from '@ember/routing/route';
import Authenticated from 'ember-cli-gatekeeper/mixins/authenticated';
import { hash } from 'rsvp';

export default Route.extend(Authenticated,{
  model(){
    return this.store.findRecord('user',this.get('currentUser').get('id'))
  },

  setupController(controller, user){
    this._super (...arguments);

    let store = this.get('store');
    hash({

      claims: store.query('claim',{user: user.id}),

      polls: store.query('poll', {user: user.id})

    }).then(result=>{controller.setProperties(result)});
  }
});
