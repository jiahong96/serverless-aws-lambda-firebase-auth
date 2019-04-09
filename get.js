'use strict';

const admin = require('./firebase-admin');

module.exports.getUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const id = event.pathParameters.id;

  admin.auth().getUser(id)
  .then(function(user) {
    console.log('Successfully fetched user data:', user.toJSON());
    const response = {
      statusCode: 200,
      body: JSON.stringify(user),
    };
    callback(null, response);
  })
  .catch(function(error) {
    console.log('Error fetching user data:', error);
    callback(null, {
      statusCode: 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t fetch the user',
    });
  });
};
