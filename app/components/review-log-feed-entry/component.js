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

    message_key: Ember.computed('log.action', function() {
        return `dashboard.log_message.${this.get('log.action')}`;
    }),
});
