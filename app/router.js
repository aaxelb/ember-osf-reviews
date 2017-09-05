import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('provider', {path: 'preprints/:provider_id'}, function () {
      this.route('moderation');
      this.route('settings');
      this.route('setup');
      this.route('preprint_detail', {path:':preprint_id'}); // TODO replace with actual route when merging
  });
  this.route('page-not-found');
});

export default Router;
