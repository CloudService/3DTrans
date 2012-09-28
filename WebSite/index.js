
/**
 * Module dependencies.
 */

var express = require('express');

var app = express();

// Configurations
app.set('port', process.env.PORT || 3000); // Configure the listening port

app.set('views', __dirname + '/views'); // The folder for the views, such as .html. The folder is <website>/views/
app.engine('html', require('ejs').renderFile); // Set the render engine for .html file.

// routers
app.get('/', function(req, res){
  res.send(__dirname + ":" + __filename);
   
});

app.get('/about', function (req, res)
{
	console.log('about');
    res.render('about.html');
});

app.listen(app.get('port'));
console.log('Listening on port ' + app.get('port'));