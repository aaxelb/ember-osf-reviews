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

export default Ember.Component.extend({
    classNames: ['review-log-feed-entry'],

    iconClass: Ember.computed('log.action', function() {
        return CLASS_NAMES[this.get('log.action')];
    }),

    icon: Ember.computed('log.action', function() {
        return ICONS[this.get('log.action')];
    }),

    message: Ember.computed('log.toState', 'log.creator.fullName', 'log.provider.name', function() {
        // TODO i18n
        switch (this.get('log.action')) {
            case SUBMIT:
                return `${this.get('log.creator.fullName')} submitted a preprint to ${this.get('log.provider.name')}`;
            case ACCEPT:
                return `${this.get('log.creator.fullName')} accepted a preprint in ${this.get('log.provider.name')}`;
            case REJECT:
                return `${this.get('log.creator.fullName')} rejected a preprint from ${this.get('log.provider.name')}`;
            case EDIT_COMMENT:
                return `${this.get('log.creator.fullName')} edited the comment of a ${this.get('log.toState')} preprint in ${this.get('log.provider.name')}`;
        }
        // TODO error
    }),
});
