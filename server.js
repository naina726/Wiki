///////////////////////////////////////////////////////////////////////////
//  SETUP
///////////////////////////////////////////////////////////////////////////
var express        = require("express");
var app            = express();
var logger         = require("morgan");
var path           = require('path');
var exphbs         = require('express-handlebars');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var fs             = require('fs');
var session        = require('express-session');
var bcrypt         = require('bcrypt');


app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
  console.log("App running on port : ", app.get('port'));
});

//app.listen(3000);


app.use(logger("dev"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({extname:'handlebars', defaultLayout:'main.handlebars'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); 

app.use(methodOverride(function(req, res){
 if (req.body && typeof req.body === 'object' && '_method' in req.body) {
   var method = req.body._method
   delete req.body._method
   return method
 }
}));
app.use(session({
  secret: 'nainasWiki',
  saveUninitialized: false,
  resave: false
}));



//Controllers
fs.readdirSync('./controllers').forEach(function (file) {
 if(file.substr(-3) == '.js') {
     route = require('./controllers/' + file);
     route.controller(app);
 }
});
///////////////////////////////////////////////////////////////////////////
//  ROUTES
///////////////////////////////////////////////////////////////////////////
//     ROOT
///////////////////////////////////////////////////////////////////////////
app.get('/', function (req, res){
	res.render('splash');
});

app.get('/home', function (req, res){
	if(req.session.currentUser = null){
		res.redirect('/');
	}
	else{
		res.render('home')
	}
});
