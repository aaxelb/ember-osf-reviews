export default {
    global: {
        cancel: `Cancel`,
        abstract: `Abstract`,
        doi: `DOI`,
        tags: `Tags`,
        title: `Title`,
        authors: `Authors`,
        license: 'License',
        pre_moderation: `pre-moderation`,
        post_moderation: `post-moderation`,
    },
    documentType: {
        preprint: {
            pluralCapitalized: `Preprints`,
            plural: `preprints`,
            singular: `preprint`,
            singularCapitalized: `Preprint`,
        }
    },
    index: {
        feature: {
            title: `Moderate your collection`,
            description: `At last, the ability to manage what scholarly works are displayed with your branding. 
            No more working on off-topic papers confusing loyal researchers.`,
            list_1: `See all submissions in one place.`,
            list_2: `Provide feedback to authors.`,
            list_3: `Manage collections settings.`
        },
        workflow: {
            title: `Choose your workflow`,
            list_1: `Have greater control over what material is publicly available by choosing pre-moderation.`,
            list_2: `Keep the time delay between submission and public access minimal by choosing post-moderation.`,
            figure: {
                pre_moderation: `Pre-moderation`,
                post_moderation: `Post-moderation`
            }
        },
    },
    moderation_base: {
        moderation_tab: `Moderation`,
        settings_tab: `Settings`
    },
    error_page: {
        title: `Page not found`,
        details: `The page you were looking for is not found on the OSF Reviews service.`,
        report: `If this should not have occurred and the issue persists, please report it to`,
        go_to: `Go to OSF Reviews`
    },
    setup: {
        start: `Start Moderating`,
        which: `Which provider would you like to set up first?`,
        multiple_providers: `You're an Admin for Multiple Providers`,
        choose_settings: `Choose moderation settings for {{provider.name}}`,
        once_finalized: `Once finalized, moderation settings can only be changed by an OSF administrator.`,
        finalize: `Finalize Settings`,
        error: {
            message: `Unable to complete the setup of {{provider.name}}. Please contact support@osf.io.`,
            title: `Something went wrong`,
        },
        settings: {
            reviewsWorkflow: {
                title: `Moderation Type`,
                description: ``,
                options: {
                    'pre-moderation': {
                        title: `Pre-moderation`,
                        description: `All {{provider.type.plural}} are placed in a queue for a moderator to accept or reject. {{provider.type.pluralCapitalized}} are displayed publicly only after approval.`,
                    },
                    'post-moderation': {
                        title: `Post-moderation`,
                        description: `All {{provider.type.plural}} are displayed publicly immediately upon submission. {{provider.type.pluralCapitalized}} also appear in a queue for a moderator to accept or reject. If rejected, the {{provider.type.singular}} is no longer displayed publicly.`,
                    },
                },
            },
            reviewsCommentsPrivate: {
                title: `Comment Visibility`,
                description: `Moderators can add comments when making a decision about a submission.`,
                options: {
                    true: {
                        title: `Moderators`,
                        description: `Comments will be visible to {{provider.name}} moderators NOT contributors on the submission.`,
                    },
                    false: {
                        title: `Moderators and Contributors`,
                        description: `Comments will be visible to {{provider.name}} moderators AND contributors on the submission.`,
                    },
                }
            },
            reviewsCommentsAnonymous: {
                title: `Moderator Comments`,
                description: `If moderator's comments are visible to contributors, the moderator's name can can be displayed or hidden from the contributors.`,
                options: {
                    true: {
                        title: `Anonymized Comments`,
                        description: `All comments will be visible to the contributors of the submission, but the moderators name will not be displayed.`,
                    },
                    false: {
                        title: `Named Comments`,
                        description: `All comments will be visible to the contributors of the submission and the moderator’s OSF profile name will be displayed.`,
                    },
                }
            }
        }
    },
    dashboard: {
        title: `Reviews Dashboard`,
        log_message: {
            submit: `submitted a {{documentType}} to {{providerName}}`,
            accept: `accepted a {{documentType}} in {{providerName}}`,
            reject: `rejected a {{documentType}} from {{providerName}}`,
            edit_comment: `edited the comment for a {{documentType}} in {{providerName}}`,
        },
        see_more: `See more`,
        error_loading: `Error fetching more events`,
        sidebar: {
            providers: `Providers`,
            moderation: `Moderation`,
            settings: `Settings`,
            set_up: `Set up moderation`,
        },
    },
    contactBar: {
        startService: {
            title: `Want to start a moderated service?`,
            paragraph: `Create your own branded preprint servers backed by the OSF. Check out the open source code and the requirements and road map. Input welcome!`,
            button: `Contact us`
        },
        feedback: {
            title: `Send us your thoughts`,
            paragraph: `Help us make OSFReviews even better. Let us know your thoughts and comments about our beta version of OSFReviews.`,
            button: `Send feedback`
        },
    }
};
