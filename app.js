const express = require('express');
const path = require('path');
const session = require('express-session');

//initializations
const app = express();
//settings
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
//middlewares
app.use(express.urlencoded({extended: false}));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
//Routes
app.use('/', require('./routes/main.routes'));
//starting the server
app.listen(app.get('port'), ()=> {
    console.log(`Server on port`, app.get('port'))
});