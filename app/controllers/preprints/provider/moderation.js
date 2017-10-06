import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['page', 'sort', 'status'],
    page: 1,
    status: 'pending',
    sort: '-date_last_transitioned',
    loading: true,

    actions: {
        statusChanged(status) {
            this.setProperties({
                status,
                page: 1,
                loading: true,
            });
        },
        pageChanged(page) {
            this.setProperties({
                page,
                loading: true,
            });
        },
        sortChanged(sort) {
            this.setProperties({
                sort,
                page: 1,
                loading: true,
            });
        },
    }
});
