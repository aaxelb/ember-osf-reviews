import Ember from 'ember';


export default Ember.Component.extend({
    store: Ember.inject.service(),
    toast: Ember.inject.service(),

    classNames: ['review-log-feed'],

    moreLogs: Ember.computed('totalPages', 'page', function() {
        return this.get('page') < this.get('totalPages');
    }),

    init() {
        this._super(...arguments);
        this.logs = [];
        this.page = 1;
        this.loadPage();
    },

    loadPage() {
        const page = this.get('page');
        this.set('loadingPage', page);
        this.get('store').query('review-log', {page, embed: ['creator', 'provider', 'reviewable']}).then((response) => {
            if (this.get('loadingPage') == page) {
                this.setProperties({
                    logs: this.get('logs').concat(response.toArray()),
                    totalPages: response.get('meta.total'),
                    loadingPage: null,
                });
            }
        }, (errorResponse) => {
            this.set('loadingPage', null);
            this.get('toast').error('Error fetching more events');
        });
    },

    actions: {
        nextPage() {
            if (!this.get('loadingPage')) {
                this.incrementProperty('page');
                this.loadPage();
            }
        },
    }
});
