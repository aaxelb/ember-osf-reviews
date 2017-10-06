import Ember from 'ember';
/**
 * @module ember-osf-reviews
 * @submodule routes
 */

// TODO: add this to osf-model, remove ember-data-has-many-query dependency?
function query(model, propertyName, params) {
    const reference = model.hasMany(propertyName);
    const store = reference.store;
    return new Ember.RSVP.Promise((resolve, reject) => {
        const url = reference.hasManyRelationship.link;
        Ember.$.ajax(url, {
            data: params,
            xhrFields: {
                withCredentials: true
            },
        }).then(payload => {
            store.pushPayload(payload);
            const records = payload.data.map(datum => store.peekRecord(datum.type, datum.id));
            resolve(Ember.ArrayProxy.create({
                content: records,
                meta: payload.meta,
                links: payload.links,
            }));
        }, reject);
    });
}

/**
 * @class provider Route Handler
 */
export default Ember.Route.extend({
    theme: Ember.inject.service(),

    queryParams: {
        sort: { refreshModel: true },
        status: { refreshModel: true },
        page: { refreshModel: true }
    },

    model(params) {
        const provider = this.modelFor('preprints.provider');
        return query(provider, 'preprints', {
            'filter[reviews_state]': params.status,
            'meta[reviews_state_counts]': true,
            sort: params.sort,
            page: params.page
        }).then(response => {
            return {
                submissions: response.toArray(),
                totalPages: response.meta.total,
                statusCounts: response.meta.reviews_state_counts,
            };
        });
    },

    setupController(controller, model) {
        this._super(controller, model);
        this.controllerFor('preprints.provider').set('pendingCount', model.statusCounts.pending);
    },

    actions: {
        loading(transition) {
            let controller = this.controllerFor('preprints.provider.moderation');
            controller.set('loading', true);
            transition.promise.finally(function() {
                controller.set('loading', false);
            });
        },
    }
});
