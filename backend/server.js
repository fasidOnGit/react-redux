/*
* In a single file for breavity
* RBAs, ACLs with Node security
* @author Kader Fasid
*/

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken'
import User from './model/userModel'
import http from 'http';
/////////////////////Server Setup////////////////
var app = express();

let server = http.Server(app);
mongoose.Promise = global.Promise;
var dbUrl = 'mongodb://user:yangI0bmsn@ds257241.mlab.com:57241/user'
mongoose.connect(dbUrl, {
	useMongoClient: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//jwt setup

app.use((req, res, next)=> {
	if(	req.headers && 
		req.headers.authorization && 
		req.headers.authorization.split(' ')[0] == 'JWT'
	){
		jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
			if(err) req.user = undefined;

			req.user = decode;
			next();
		});
	} else {
		req.user = undefined;
		next();
	}
});



//////////////Server Setup ends/////////////////

import { login, register, loginRequired } from './userController'; 

app.route('/contact')
	.get(loginRequired ,getContacts)
	.post(loginRequired, addNewContact)


//register route

app.route('/auth/register')
	.post(register);

//login route
app.route('/auth/login')
	.post(login)



var contacts = [];
function getContacts(req, res) {
	// body...
	res.json(contacts);
}

function addNewContact(req, res) {
	// body...
	contacts.push(req.body);
	return res.status(201).json({
		message: 'Successfully Added'
	});
}

server.listen(3000 , () =>{


console.log ('Server listening to port', server.address().port) ;	
}) 