import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dashboard');
  this.route('calendar');
  this.route('messages');
  this.route('settings');
  this.route('profile');
  this.route('task', { path: 'tasks/:task_id' });
  this.route('new-task', function() {
    this.route('personal', function() {});
    this.route('household');
    this.route('p-success');
    this.route('h-success');
  });

  this.route('sign-in');
  this.route('sign-up');
  this.route('polls');
});

export default Router;
