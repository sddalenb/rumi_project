import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['rumi-bottom-navbar'],
  router: service(),
  actions: {
    logoutFunction() {

      this.get('session').signOut().then (() => {
        this.get("router").transitionTo('sign-in');
      });

    }
  }

});
