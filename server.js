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

//app.use(ORM.middleware);




ORM.init(app, function(e){
    // app.use('/api/sites', ORM.REST('site').get('/:id/publish', function(req, res){
    // 		res.send('ok')
    // 	}))
       
  	app.use('/api/sites', ORM.REST('site'))
    app.use('/api/pages', ORM.REST('page'));

	app.listen(config.port, function () {
        console.log('http://localhost:' + config.port);
    });

})
