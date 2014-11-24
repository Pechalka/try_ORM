var Waterline = require('waterline');
var config = require('../config');
var mongo = require('sails-mongo');
var mysql = require('sails-mysql');


config.mongo.adapter = 'mongo';
config.mysql.adapter = 'mysql';


var ormConfig = {
    adapters: {
        mongo: mongo,
        mysql: mysql
    },
    connections: {
        mongo: config.mongo,
        mysql: config.mysql
    },
    defaults: {
        migrate: 'alter'
    }
};

var orm = new Waterline();
orm.loadCollection(require('./Page'));
orm.loadCollection(require('./Site'));


var init =  function(app, done) {
	orm.initialize(ormConfig, function(e, models){
		if (e){
			console.log('ORM error: ', e);
		}
		
		exports.db = models.collections; 
			
        done(e, models)
	});
}

var middleware = function(req, res, next){
	req.db = exports.db;
	next();
}

var exports = {
	db : {},
	init : init,
	middleware : middleware
}
module.exports = exports;