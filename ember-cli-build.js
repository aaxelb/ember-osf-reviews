/* eslint-env node */

'use strict';

const fs = require('fs');
const path = require('path');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const configFunc = require('./config/environment');

const nonCdnEnvironments = ['development', 'test'];

const {
    EMBER_ENV
} = process.env;

module.exports = function(defaults) {
    const config = configFunc(EMBER_ENV);
    const useCdn = !nonCdnEnvironments.includes(EMBER_ENV);

    const css = {
        'app': '/assets/reviews-service.css'
    };


    const {
        OSF: {url: osfUrl}
    } = defaults.project.config(EMBER_ENV);

    // Reference: https://github.com/travis-ci/travis-web/blob/master/ember-cli-build.js
    const app = new EmberApp(defaults, {
        sourcemaps: {
            enabled: true,
            extensions: ['js']
        },
        vendorFiles: {
            // next line is needed to prevent ember-cli to load
            // handlebars (it happens automatically in 0.1.x)
            'handlebars.js': {production: null},
            [useCdn ? 'ember.js' : '']: false,
            [useCdn ? 'jquery.js' : '']: false,
        },
        'ember-bootstrap': {
            importBootstrapCSS: false,
            'bootstrapVersion': 3,
            'importBootstrapFont': false
        },
        // Needed for branded themes
        fingerprint: {
            customHash: config.ASSET_SUFFIX
        },
        outputPaths: {
            app: {
                css
            }
        },
        sassOptions: {
            includePaths: [
                'node_modules/@centerforopenscience/ember-osf/addon/styles',
                'bower_components/bootstrap-sass/assets/stylesheets',
                'bower_components/osf-style/sass',
                'bower_components/hint.css',
                'bower_components/bootstrap-daterangepicker',
            ]
        },
        inlineContent: {
            raven: {
                enabled: useCdn,
                content: `
                    <script src="https://cdn.ravenjs.com/3.5.1/ember/raven.min.js"></script>
                    <script>Raven.config("${config.sentryDSN}", {}).install();</script>`
            },
            cdn: {
                enabled: useCdn,
                content: `
                    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
                    <script src="//cdnjs.cloudflare.com/ajax/libs/ember.js/2.12.2/ember.min.js"></script>`
            },
            assets: {
                enabled: true
            }
        },
        postcssOptions: {
            compile: {
                enabled: false
            },
            filter: {
                enabled: true,
                plugins: [{
                    module: require('autoprefixer'),
                    options: {
                        browsers: ['last 4 versions'],
                        cascade: false
                    }
                }, {
                    // Wrap progid declarations with double-quotes
                    module: require('postcss').plugin('progid-wrapper', () => {
                        return css =>
                            css.walkDecls(declaration => {
                                if (declaration.value.startsWith('progid')) {
                                    return declaration.value = `"${declaration.value}"`;
                                }
                            });
                    })
                }]
            }
        },
        // bable options included to fix issue with testing discover controller
        // http://stackoverflow.com/questions/32231773/ember-tests-passing-in-chrome-not-in-phantomjs
        'ember-cli-babel': {
            includePolyfill: true
        },
    });

    // Use `app.import` to add additional libraries to the generated
    // output files.
    //
    // If you need to use different assets in different
    // environments, specify an object as the first parameter. That
    // object's keys should be the environment name and the values
    // should be the asset to use in that environment.
    //
    // If the library that you are including contains AMD or ES6
    // modules that you would like to import into your application
    // please specify an object with the list of modules as keys
    // along with the exports of each module as its value.

    // osf-style
    app.import(path.join(app.bowerDirectory, 'osf-style/vendor/prism/prism.css'));
    app.import(path.join(app.bowerDirectory, 'osf-style/page.css'));
    app.import(path.join(app.bowerDirectory, 'osf-style/css/base.css'));
    app.import(path.join(app.bowerDirectory, 'loaders.css/loaders.min.css'));


    app.import(path.join(app.bowerDirectory, 'osf-style/img/cos-white2.png'), {
        destDir: 'img'
    });

    app.import(path.join(app.bowerDirectory, 'jquery.tagsinput/src/jquery.tagsinput.js'));

    app.import({
        test: path.join(app.bowerDirectory, 'ember/ember-template-compiler.js')
    });

    // Import component styles from addon
    app.import('vendor/assets/ember-osf.css');

    return app.toTree();
};