import Ember from 'ember';

export default Ember.Route.extend({
    currentUser: Ember.inject.service(),
    session: Ember.inject.service(),
    store: Ember.inject.service(),

    model() {
        if (!this.get('session.isAuthenticated')) return [];
        return this.get('store').query('preprint-provider', {
            'filter[permissions]': 'view_actions,set_up_moderation'
        }).catch(() => []); // On any error, assume no permissions to anything.
    }
});
