# serverless-aws-lambda-firebase-auth
Integrate AWS Lambda with Firebase Auth using Serverless framework

# Use cases
Create a Firebase user\
Get a Firebase user by id\
Login with Email and Password & get JWT Token\
List 1st 1000 Firebase users (pass Bearer Token retrieved from Login)

# Setup
Download your Firebase service account key file and put it as 'firebase.json' at root directory\
Copy secrets.example.json to secrets.json and fill in your Firebase configs
Edit region and profile in serverless.yml 
npm install\
serverless deploy
