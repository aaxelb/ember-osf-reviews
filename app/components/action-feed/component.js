import Ember from 'ember';
import { translationMacro as t } from 'ember-i18n';

/**
 * A feed of recent actions for all providers the user has access to
 *
 * Sample usage:
 * ```handlebars
 * {{action-feed}}
 * ```
 * @class action-feed
 */
export default Ember.Component.extend({
    store: Ember.inject.service(),
    toast: Ember.inject.service(),

    classNames: ['action-feed'],

    errorMessage: t('dashboard.error_loading'),

    moreActions: Ember.computed('totalPages', 'page', function() {
        return this.get('page') < this.get('totalPages');
    }),

    init() {
        this._super(...arguments);
        this.actionList = [];
        this.page = 1;
        this.loadPage();
    },

    loadPage() {
        const page = this.get('page');
        this.set('loadingPage', page);
        this.get('store').query('action', {page, embed: ['target', 'provider']}).then((response) => {
            if (this.get('loadingPage') === page) {
                this.setProperties({
                    actionList: this.get('actionList').concat(response.toArray()),
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
