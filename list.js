'use strict';

const admin = require('./firebase-admin');

module.exports.list = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  // Start listing users from the beginning, 1000 at a time.
  listAllUsers().then(function(listUsersResult) {
    callback(null, {
      statusCode: 200, 
      body: JSON.stringify(listUsersResult.users),
    });
  })
  .catch(function(error) {
    console.log('Error listing users:', error);
    callback(null, {
      statusCode: 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t list the users',
    });
  });
};

function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  return admin.auth().listUsers(1000, nextPageToken);
}
