var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'page',
    connection: 'mongo',

    attributes: {
        id: {
            primaryKey: true
        },
        // userId: {
        //     model: 'user',
        //     required: true
        // },
        siteId: {
            model: 'site',
            required: true
        },
        index: {
            type: 'integer',
            required: true
        },
        headerText: 'string',
        showHeader: 'boolean',
        title: {
            type: 'string',
            required: true
        },
        isHomePage: 'boolean',
        content: 'array',
        html: 'text'
    }
});
