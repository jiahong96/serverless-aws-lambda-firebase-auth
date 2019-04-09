const firebase = require("firebase");

const config = {
  apiKey: process.env.KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  storageBucket: process.env.STORAGE_URL,
};

firebase.initializeApp(config);

module.exports = firebase;