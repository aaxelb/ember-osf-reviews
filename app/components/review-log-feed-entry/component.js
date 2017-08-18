import Ember from 'ember';

const SUBMIT = 'submit';
const ACCEPT = 'accept';
const REJECT = 'reject';
const EDIT_COMMENT = 'edit_comment';

const ICONS = Object.freeze({
    [SUBMIT]: 'fa-hourglass-o',
    [ACCEPT]: 'fa-check-circle-o',
    [REJECT]: 'fa-times-circle-o',
    [EDIT_COMMENT]: 'fa-comment-o',
});

const CLASS_NAMES = Object.freeze({
    [SUBMIT]: 'submit-icon',
    [ACCEPT]: 'accept-icon',
    [REJECT]: 'reject-icon',
    [EDIT_COMMENT]: 'edit-comment-icon',
});

/**
 * Display a single review log on the dashboard feed
 *
 * Sample usage:
 * ```handlebars
 * {{review-log-feed-entry log=log}}
 * ```
 * @class review-log-feed-entry
 */
export default Ember.Component.extend({
    classNames: ['review-log-feed-entry'],

    click() {
        alert(`TODO: transition to detail for ${this.get('log.reviewable.id')}`);
    },

    iconClass: Ember.computed('log.action', function() {
        return CLASS_NAMES[this.get('log.action')];
    }),

    icon: Ember.computed('log.action', function() {
        return ICONS[this.get('log.action')];
    }),

    message: Ember.computed('log.toState', 'log.provider.name', function() {
        // TODO i18n
        switch (this.get('log.action')) {
            case SUBMIT:
                return `submitted a ${this.get('log.provider.preprintWord')} to ${this.get('log.provider.name')}`;
            case ACCEPT:
                return `accepted a ${this.get('log.provider.preprintWord')} in ${this.get('log.provider.name')}`;
            case REJECT:
                return `rejected a ${this.get('log.provider.preprintWord')} from ${this.get('log.provider.name')}`;
            case EDIT_COMMENT:
                return `edited the comment for a ${this.get('log.provider.preprintWord')} in ${this.get('log.provider.name')}`;
        }
        // TODO error
    }),
});
