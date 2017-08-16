import Ember from 'ember';

export default Ember.Controller.extend({

    showDashboard: Ember.computed('model.[]', function() {
        const providers = this.get('model');
        return providers.any((p) => p.get('reviews_workflow') !== 'none');
    }),

});
