import Route from '@ember/routing/route';
import Authenticated from 'ember-cli-gatekeeper/mixins/authenticated';

export default Route.extend(Authenticated, {
  model(){
    let currentUser = this.get('currentUser');
    return this.store.findRecord('user',currentUser.get('id'));
  }
});
