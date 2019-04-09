'use strict';

const admin = require('./firebase-admin');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const request = JSON.parse(event.body);
  
  admin.auth().createUser({
    uid: request.uid,
    email: request.email,
    password: request.password
  }).then(function(user) {
    console.log('Successfully created new user:', user);
    const response = {
      statusCode: 200,
      body: JSON.stringify(user),
    };
    callback(null, response);
  }).catch(function(error) {
    console.log('Error creating new user:', error);
    callback(null, {
        statusCode: 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the user',
      });
  });
};
