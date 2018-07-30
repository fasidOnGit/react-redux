import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from './model/userModel';

const User = mongoose.model('User', UserSchema);

export const register = (req, res) => {
	const newUser = new User(req.body);
	newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
	newUser.save().then((user)=>{
		user.hashPassword = undefined;
		return res.json(user)
	})
	.catch(err =>{
		return res.status(400).send({
			message: err
		});
	});
}

export const login = (req, res) => {
	User.findOne({
		email: req.body.email
	})
	.then(user =>{
		if(!user){
			return res.status(401).json({
				message: 'Authentication failed. No user found!'
			});
		} else if(user){
			if(!user.comparePassword(req.body.password, user.hashPassword)){
				return res.status(401).json({
					message: 'Authentication failed. wrong password!'
				});
			} else {
			return res.json({
				token: jwt.sign({
					email: user.email,
					username: user.userName,
					_id: user.id
				}, 'RESTFULAPIs')
			})
		}
		} 
	})
	.catch(err => {
		return res.status(400).send({
			message: err
		})
	})

}


export const loginRequired = (req, res, next) => {
	if(req.user){
		next();
	} else {
		return res.status(401).json({
			message: 'Unauthorized user!'
		});
	}
}
