import Ember from 'ember';
import ResetScroll from 'gup/mixins/resetscroll';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(AuthenticatedRouteMixin,ResetScroll, {
  i18n: Ember.inject.service(),


  beforeModel: function() {
		Ember.$("body").addClass("loading");
	},

  model: function(params){
    return this.store.find('publication',params.id);
  },

	afterModel: function(/*model, transition */) {
		Ember.$("body").removeClass("loading");
	},

  actions: {
    refreshModel: function(modelId) {
      this.refresh(modelId);
    },
    error: function() {
      this.send('setMsgHeader', 'error', this.get('i18n').t('messages.publicationNotFound'));
	  this.transitionTo('publications.dashboard.start');
    }
  }
});
