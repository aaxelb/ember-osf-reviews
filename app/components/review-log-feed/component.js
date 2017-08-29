import Ember from 'ember';
import { translationMacro as t } from 'ember-i18n';

/**
 * A feed of recent reviews events for all providers the user has access to
 *
 * Sample usage:
 * ```handlebars
 * {{review-log-feed}}
 * ```
 * @class review-log-feed
 */
export default Ember.Component.extend({
    store: Ember.inject.service(),
    toast: Ember.inject.service(),

    classNames: ['review-log-feed'],

    errorMessage: t('dashboard.error_loading'),

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
        this.get('store').query('review-log', {page, embed: 'reviewable'}).then((response) => {
            if (this.get('loadingPage') === page) {
                this.setProperties({
                    logs: this.get('logs').concat(response.toArray()),
                    totalPages: response.get('meta.total'),
                    loadingPage: null,
                });
            }
        }, () => {
            // Error
            this.set('loadingPage', null);
            this.get('toast').error(this.get('errorMessage'));
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
