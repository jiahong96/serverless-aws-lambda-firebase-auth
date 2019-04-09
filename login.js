const firebase = require('./firebase.js');

module.exports.login = (event, context, callback) => {  
    context.callbackWaitsForEmptyEventLoop = false;

    const request = JSON.parse(event.body);

    firebase.auth().signInWithEmailAndPassword(request.email, request.password).then(() => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            // Send token to your backend via HTTPS
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({token: idToken})
            });
        }).catch(function(error) {
            callback(null, {
                statusCode: 501,
                headers: { 'Content-Type': 'text/plain' },
                body: error.message,
            });
        });
    }).catch(function(error) {
        console.log(error)
        callback(null, {
            statusCode: 501,
            headers: { 'Content-Type': 'text/plain' },
            body: error.message,
        });
    });    
}