import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['reviews-contact-bar'],

    // Show language asking for feedback instead of setting up a provider
    feedback: null,

    keys: Ember.computed('feedback', function() {
        const key = this.get('feedback') ? 'feedback' : 'startService';
        return {
            title: `contactBar.${key}.title`,
            paragraph: `contactBar.${key}.paragraph`,
            button: `contactBar.${key}.button`,
        };
    }),
});
