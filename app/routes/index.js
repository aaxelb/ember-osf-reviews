import Ember from 'ember';

export default Ember.Route.extend({
    store: Ember.inject.service(),
    currentUser: Ember.inject.service(),

    model() {
        return this.get('store').query('preprint-provider', {'filter[permissions]': 'view_logs'})
    }
});
