'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'front-end',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    EmberENV: {
      FEATURES: {
      // This must be enabled for account adapter to work.
      'ds-improved-ajax': true
      }

      // ...
    },

    gatekeeper: {
      baseUrl: 'http://localhost:5000/gatekeeper',
      signInRoute: 'sign-in',
      startRoute: 'dashboard',

      tokenOptions: {
        client_id: '59ee923e1fd71c2ae68ade62',
        client_secret: 'client0'
      },

      verifyOptions: {
        alg: ['HS256'],
        iss: ['gatekeeper']
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['ember-cli-mirage'] = {
      enabled: false
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
