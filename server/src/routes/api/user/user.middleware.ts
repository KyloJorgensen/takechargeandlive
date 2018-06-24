'use strict';
import User from './user.model';

const badAuthentication = (next) => {
	const error = new Error('Bad Authentication');
	error.name = 'AuthenticationError';
	next(error);
}

// next if userId is vaild.
export const userAuth = (req, res, next): any => {
	if (req.session._userId) {
		return next();
	}
	badAuthentication(next);
};

// next if adminIs is vaild.
export const adminAuth = (req, res, next): any => {
	if (req.session._adminId && req.session._adminId == req.session._userId) {
		let query = User.findOne({_id: req.session._userId});
		return query.then((user) => {
			if (user.admin && !user.discontinued) {
				return next();
			}
			badAuthentication(next);
		}).catch((error) => {
			next(error);
		});	
	}
	badAuthentication(next);
};

export default {
	userAuth: userAuth,
	adminAuth: adminAuth,
};