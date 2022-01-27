# Remote Shutdown Service

Node/Express server for https://github.com/EkaanshArora/remote-shutdown-app to trigger shutdown, restart and sleep desktop commands from your phone.

Should work on Mac, Windows and Linux. You'll need to launch the service as a superuser to have necessary privileges to execute shutdown command. 

## How to use
- Install [Node.js](https://nodejs.org/) and NPM
- Download the project and navigate to the folder
- Install dependencies `npm i`
- Start the server `npm start`

### How to setup background task and autostart
I use [pm2](https://github.com/Unitech/pm2)
- Install pm2 globally `npm i -g pm2`
- Start the server in the project directory `pm2 start index.js` 
- Configure autostart (optional) `pm2 autostart`
- Save the current running tasks for autostart `pm2 save`

Listens on port: `5001` with password: `e` by default  
You can configure this in `index.js`

TODO: 
- Tests
- One click executable

I put this together in a few hours, please open a PR if you find bugs.
