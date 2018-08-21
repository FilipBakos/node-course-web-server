const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port = process.env.PORT || 3000;
var app = express(); //toto treba aby sa vytvoril server

hbs.registerPartials(__dirname + '/views/partials');

app.set('view-engine','hbs');
app.use(express.static(__dirname + '/public')); //citanie zo statickeho suboru

app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Error message :' + err );
		}
	})
	next();
});

// app.use((req,res,next) => {
// 	res.render('maintenance.hbs');
// })

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

app.get('', (req, res) => { // toto sa zase ukaze uzivatelovi ked pride na url
	//res.send('HEllo Express.'); // mozem posielat aj JSON
	// res.send({
	// 	name:'Filip',
	// 	priezvisko: 'Bakos'
	// });
	res.render('home.hbs', {
		pageTitle:'Home Page1',
		welcome: 'Vitajte na ansej stranke'
	});
});


app.get('/about', (req, res) => { // toto sa zase ukaze uzivatelovi ked pride na url
	res.render('about.hbs', {
		pageTitle:'About Page2'
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs',{
		pageTitle:'Projects'
	})
});

app.listen(port, () => {
	console.log(`Server je na porte ${port}`);
}); //port na ktorom caka aplikacia

app.get('/bad', (req,res) => {
	res.send({
		error: 'ERROR 400',
		errorMessage: 'Could not find server'
	});
});

