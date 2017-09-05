import Ember from 'ember';

export default Ember.Controller.extend({

    showDashboard: Ember.computed('model.[]', function() {
        const providers = this.get('model');
        return providers.any((p) => p.get('reviewsWorkflow'));
    }),

    actions: {
        transitionToDetail(reviewable) {
            this.transitionToRoute('provider.preprint_detail', [reviewable.get('provider'), reviewable]);
        }
    },
});
