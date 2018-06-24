'use strict';
import { User, IUserModel } from './user.model';
import * as bcrypt from 'bcryptjs';

const sendUser = (req, res, user):void => {
    req.session._userId = user._id;

    if (user.admin) {
        req.session._adminId = user._id;
    }

    res.status(200).json({
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        admin: user.admin,
    });
}

function UserController() {};

// creates new user from email, password, and name. Attaches UserKey session.
UserController.prototype.createUser = function(req, res, next) {
    // generates the salt for bcrypt to encrypt the passwordz
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        // generates encrypted password
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            return new Promise(function(resolve, reject) {
                // creates user useing email, encrypted password (hash), name
                User.create({
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname
                }, function(error, user) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(user);
                    }
                })
            }).then(function(user) {
                sendUser(req, res, user);
            }).catch(function(error) {
                next(error);
            });
        });
    });
};

// one get returns users name
UserController.prototype.getUser = function(req, res, next) {
    return new Promise(function(resolve, reject) {
        User.findOne({
            _id: req.session._userId
        }, function(error, user) {
            if (error) {
                reject(error);
            } else {
                if (user) {
                    if ('_id' in user) {
                        return resolve(user);
                    }
                }
                resolve(false);
            }
        });
    }).then(function(user) {
        if (user) {
            sendUser(req, res, user);
        } else {
            let error = new Error('Not logged In.');
            error.name = 'LoginError';
            return next(error);
        }
    }).catch(function(error) {
        next(error);
    });
};

// Attaches UserKey if email and password are vaild.
UserController.prototype.login = function(req, res, next) {
    let email:string = req.body.email;
    let password:string = req.body.password;
    return new Promise(function(resolve, reject) {
        User.findOne({email: email}, function(error, user) {
            if (error) {
                reject(error);
            } else {
                resolve(user);
            }
        })
    }).then(function(user:IUserModel | null) {
        if (user == null) {
            let error = new Error('Invaild Username.');
            error.name = 'LoginError';
            return next(error);
        }
        return new Promise(function(resolve, reject) { 
            user.validatePassword(password, function(error, isVaild) {
                if (error) {
                    reject(error);
                } else {
                    if (isVaild) {
                        resolve(user);
                    } else {
                        resolve(false);
                    }
                }
            });
        }).then(function(user) {
            if (user) {
                sendUser(req, res, user);
            } else {
                let error = new Error('Invaild Password.');
                error.name = 'LoginError';
                return next(error);
            }
        }).catch(function(error) {
            next(error);
        });
    }).catch(function(error) {
        next(error);
    });
};

// Log user out
UserController.prototype.logout = function(req, res, next){
    req.session.regenerate(function(err) {
        if (err) {
            return next(err);
        }
        res.status(200).end();
    });
};

UserController.prototype.updateUser = function(req, res, next) {
    let changes:IUserModel;
    if ('body' in req) {
        if ('email' in req.body) {
            changes.email = req.body.email;
        }
        if ('username' in req.body) {
            changes.username = req.body.username;
        }
        if ('firstname' in req.body) {
            changes.firstname = req.body.firstname;
        }
        if ('lastname' in req.body) {
            changes.lastname = req.body.lastname;
        }
    } else {
        let error = new Error('missing Body');
        error.name = 'BadRequest'
        return next(error);
    }   
    return new Promise(function(resolve, reject) {
        User.findOneAndUpdate({
            _id: req.session._userId
        }, {
            $set: changes
        }, {
            new: true
        }, function(error, user) {
            if (error) {
                reject(error);
            } else {
                resolve(user);
            }
        });
    }).then(function(user) {
        sendUser(req, res, user);
    }).catch(function(error) {
        next(error);
    });
};

UserController.prototype.updateUserPassword = function(req, res, next) {
    let oldpassword: string;
    let newpassword: string;
    if ('body' in req) {
        if ('oldpassword' in req.body) {
            oldpassword = req.body.oldpassword;
        }
        if ('newpassword' in req.body) {
            newpassword = req.body.newpassword;
        }
    } else {
        let error = new Error('missing Body');
        error.name = 'BadRequest'
        return next(error);
    }   
    return new Promise(function(resolve, reject) {
        User.findOne({
            _id: req.session._userId
        }, function(error, user) {
            if (error) {
                reject(error);
            } else {
                if (user) {
                    if ('_id' in user) {
                        return resolve(user);
                    }
                }
                resolve(false);
            }
        });
    }).then(function(user:IUserModel | null) {
        if (user == null) {
            let error = new Error('Invaild User.');
            error.name = 'LoginError';
            return next(error);
        }
        return new Promise(function(resolve, reject) { 
            user.validatePassword(oldpassword, function(error, isVaild) {
                if (error) {
                    reject(error);
                } else {
                    if (isVaild) {
                        resolve(user);
                    } else {
                        resolve(false);
                    }
                }
            });
        }).then(function(user) {
            if (user) {
                bcrypt.genSalt(10, function(err, salt) {
                    if (err) {
                        return next(err);
                    }
                    // generates encrypted password
                    bcrypt.hash(newpassword, salt, function(err, hash) {
                        if (err) {
                            return next(err);
                        }
                        let changes: IUserModel;
                        changes.password = hash;
                        return new Promise(function(resolve, reject) {
                            User.findOneAndUpdate({
                                _id: req.session._userId
                            }, {
                                $set: changes
                            }, {
                                new: true
                            }, function(error, user) {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(user);
                                }
                            });
                        }).then(function(user) {
                            sendUser(req, res, user);
                        }).catch(function(error) {
                            next(error);
                        });
                    });
                });                

            } else {
                let error = new Error('Invaild Password.');
                error.name = 'LoginError';
                return next(error);
            }
        }).catch(function(error) {
            next(error);
        });
    }).catch(function(error) {
        next(error);
    });
};

export default UserController.prototype;