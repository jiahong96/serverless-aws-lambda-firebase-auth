# serverless-aws-lambda-firebase-auth
Integrate AWS Lambda with Firebase Auth using Serverless framework

# Use cases
- **Create** a Firebase user
- **Get** a Firebase user by `ID`
- **Login** with Email and Password & get JWT Token
- **List** 1st 1000 Firebase users (pass Bearer Token retrieved from Login)

# Setup
1. Download your Firebase service account key file and put it as `firebase.json` at root directory
2. Copy `secrets.example.json` to `secrets.json` and fill in your Firebase configs
3. Edit region and profile in `serverless.yml`
4. npm install
5. serverless deploy
