import Ember from 'ember';
/**
 * The base for the provider moderation page (tabs, provider name, and breadcrumbs).
 *
 * Sample usage:
 * ```handlebars
 * {{moderation-base
 *    unread-count=10
 *    active='Settings'
 * }}
 * ```
 * @class moderation-base
 **/
export default Ember.Component.extend({
    i18n: Ember.inject.service(),
    theme: Ember.inject.service(),
    tabs: Ember.computed('i18n.locale', function(){
        return [
            { name: this.get('i18n').t('moderation_base.moderation_tab'), route: 'preprints.provider.moderation'},
            { name: this.get('i18n').t('moderation_base.settings_tab'), route: 'preprints.provider.settings'},
        ];
    }),

    breadcrumbs: Ember.computed('navigator.currentPath', function(){
        // Always include the dashboard breadcrumb
        const breadcrumbs = [{
            name: this.get('i18n').t('dashboard.title'),
            path: 'index',
        }];
        const routeContexts = this.get('navigator.routeContexts');
        for (const r of routeContexts) {
            // Skip crumbs with no context
            if (Ember.isEmpty(r.context) || !Object.keys(r.context).length) continue;

            // Skip crumbs with the same context as the prior crumb
            if (r.context === breadcrumbs[breadcrumbs.length - 1].context) continue;

            // Prefer model name or title, fall back to the route name
            r.name = (r.context.get && (r.context.get('name') || r.context.get('title'))) || r.part;
            breadcrumbs.push(r);
        }
        return breadcrumbs;
    }),

    actions: {
        toggleTab: function () {
            if (this.get('active') == 'Moderation'){
                this.set('active', 'Settings');
            } else {
                this.set('active', 'Moderation');
            }
        }
    }
});
