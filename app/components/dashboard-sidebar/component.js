import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['dashboard-sidebar'],

    iconMap: {
        preprint: 'fa-graduation-cap',
        paper: 'fa-file-text-o',
        thesis: 'fa-book',
    },
});
