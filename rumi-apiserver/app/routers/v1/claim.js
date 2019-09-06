const { Router } = require ('@onehilltech/blueprint');

module.exports = Router.extend ({
  specification: {
    '/claims': {
      resource: {
        controller: 'claim',
      }
    }
  }
});
