import Ember from 'ember';
/**
 * @module ember-osf-reviews
 * @submodule routes
 */

// TODO: add this to osf-model, remove ember-data-has-many-query dependency?
function query(model, propertyName, params) {
    const reference = model.hasMany(propertyName);
    const store = reference.store;
    const promise = new Ember.RSVP.Promise((resolve, reject) => {
        const url = reference.hasManyRelationship.link;
        Ember.$.ajax(url, {
            data: params,
            xhrFields: {
                withCredentials: true
            },
        }).then(payload => {
            store.pushPayload(payload);
            const records = payload.data.map(datum => store.peekRecord(datum.type, datum.id));
            records.meta = payload.meta;
            records.links = payload.links;
            resolve(records);
        }, reject);
    });

    const ArrayPromiseProxy = Ember.ArrayProxy.extend(Ember.PromiseProxyMixin)
    return ArrayPromiseProxy.create({ promise });
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
        controller.set('loading', false);
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
