import RESTAdapter from 'ember-cli-gatekeeper/-lib/user/adapters/rest';

export default RESTAdapter.extend({
  host: 'http://localhost:5000',
  namespace: 'v1'
});
