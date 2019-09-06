import Route from '@ember/routing/route';
import Authenticated from 'ember-cli-gatekeeper/mixins/authenticated';

export default Route.extend(Authenticated, {
  beforeModel() {
    this.replaceWith('dashboard');
  },

  model () {
    return this.get ('store').findRecord ('user', this.get ('currentUser.id'), { reload: true });
  }
});
