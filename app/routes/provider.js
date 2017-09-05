import Ember from 'ember';

/**
 * @module ember-osf-reviews
 * @submodule routes
 */

/**
 * @class Provider Route Handler
 */
export default Ember.Route.extend({
    theme: Ember.inject.service(),
    model(params, transition) {
        const {provider_id = ''} = transition.params.provider;
        const slugLower = provider_id.toLowerCase();
        return this.store.find('preprint-provider', slugLower).then((provider) =>{
            this.set('theme.id', provider.id);
        }).catch(() =>{
            this.replaceWith('page-not-found');
        });
    },
});
