import Ember from 'ember';

export default Ember.Controller.extend({
    pendingCount: Ember.computed.reads('model.reviewableStatusCounts.pending'),
});
