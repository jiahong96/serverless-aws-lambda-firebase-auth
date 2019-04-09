'use strict';

const admin = require('./firebase-admin');
const AuthPolicy = require('./lib/utils');

module.exports.auth = (event, context, callback) => {
    if (!event.authorizationToken) {
        callback('Unauthorized');
    }

    const tokenParts = event.authorizationToken.split(' ');
    const tokenValue = tokenParts[1];

    if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
        // no auth token!
        callback('Unauthorized');
    }

    admin.auth().verifyIdToken(tokenValue)
    .then(function(decodedToken) {
        console.log('decoded yea');
        console.log(decodedToken);
        console.log(event.methodArn);

        const principalId = decodedToken.uid;
        
        var apiOptions = {};
        var tmp = event.methodArn.split(':');
        var apiGatewayArnTmp = tmp[5].split('/');
        var awsAccountId = tmp[4];
        apiOptions.region = tmp[3];
        apiOptions.restApiId = apiGatewayArnTmp[0];
        apiOptions.stage = apiGatewayArnTmp[1];
        var method = apiGatewayArnTmp[2];
        var resource = '/'; // root resource
        if (apiGatewayArnTmp[3]) {
            resource += apiGatewayArnTmp.slice(3, apiGatewayArnTmp.length).join('/');
        }

        var policy = new AuthPolicy(principalId, awsAccountId, apiOptions);
        policy.allowAllMethods();

        var authResponse = policy.build();
        context.succeed(policy.build());
        //callback(null, generatePolicy('user', 'Allow', '*'));
    }).catch(function(error) {
        // Handle error
        console.log(error);
        callback('Unauthorized');
    });
};
