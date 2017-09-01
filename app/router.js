import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('provider', {path: 'preprints/:slug'}, function () {
      this.route('moderation');
      this.route('settings');
  });
  this.route('dashboard');
  this.route('page-not-found');
});

export default Router;