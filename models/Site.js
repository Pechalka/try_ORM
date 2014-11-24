var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'site',
    tableName : 'sites',
    connection: 'mysql',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: 'string',
            required: true
        },
        // userId: {
        //     model: 'user',
        //     required: true
        // },
        published: {
            type: 'boolean',
            defaultsTo: false
        },
        menu: 'text',

        pages: {
            collection: 'page',
            via: 'siteId'
        }
    }
});
