import { moduleFor, test } from 'ember-qunit';

moduleFor('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    needs: [
        'service:currentUser',
        'service:session',
        'service:metrics',
    ],
});

test('it exists', function(assert) {
    const route = this.subject();
    assert.ok(route);
});
