import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('publications', function() {
    this.route('show', {path: ":id"});
    this.route('new');
  });
});

export default Router;
