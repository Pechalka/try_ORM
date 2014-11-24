var express = require('express'),
	path = require('path'),
	app = express(),
	ORM = require('./models/ORM'),
	config = require('./config.json'),
	bodyParser = require('body-parser')
;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static(path.join(__dirname, 'public')));

app.use(ORM.middleware);


app.get('/api/pages', function(req, res) {
	req.db.page.find().exec(function(e, rows){
		res.json(rows)
	})
})

app.post('/api/sites', function(req, res, next) {
	req.db.site.create(req.body).exec(function(e, obj){
		req.result = obj;
		next();
	})
})

app.get('/api/sites', function(req, res, next) {
	req.db.site.find().exec(function(e, rows){
		req.result = rows;
		next();
	})
})


app.delete('/api/sites/:id', function(req, res, next) {
	req.db.site.destroy(req.params.id).exec(function(e, obj){
		req.result = obj;
		next();
	})
})

app.put('/api/sites/:id', function(req, res, next) {
	req.db.site.update(req.params.id, req.body).exec(function(e, rows){
		req.result = rows[0];
		next();
	})
})

app.use(function(req, res, next){
	console.log('RETURN JSON--');

	if (req.result)
		res.json(req.result)	
	else
		next();
})


ORM.init(app, function(e){
	app.listen(config.port, function () {
        console.log('http://localhost:' + config.port);
    });
})
