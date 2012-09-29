
/**
 * Module dependencies.
 */

var express = require('express');

var app = express();

// Configurations
app.set('port', process.env.PORT || 3000); // Configure the listening port
app.set('views', __dirname + '/views'); // The folder for the views, such as .html. The folder is <website>/views/
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public')); // Static resources.

app.engine('html', require('ejs').renderFile);

// routers
app.get('/', function(req, res, next){
   res.render('../public/design.html');
});

app.get('/login', function (req, res)
{
    res.render('login');
});

app.listen(app.get('port'));
console.log('Listening on port ' + app.get('port'));