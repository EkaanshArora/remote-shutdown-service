# Remote Shutdown Service

Node/Express server for https://github.com/EkaanshArora/remote-shutdown-app to trigger shutdown, restart and sleep desktop commands from your phone.

Should work on Mac, Windows and Linux. You'll need to launch the service as a superuser to have necessary privileges to execute shutdown command. 

There's a [version](https://github.com/EkaanshArora/remote-shutdown-service/tree/mdns) with network discovery using [MDNS](https://github.com/agnat/node_mdns). You'll need to compile MDNS for your system to use it. Use the [mdns branch](https://github.com/EkaanshArora/remote-shutdown-app/tree/mdns) of the app.

## How to use
- Install [Node.js](https://nodejs.org/) and NPM
- Download the project and navigate to the folder
- Install dependencies `npm i`
- Start the server `npm start`

### How to setup background task and autostart
I use [pm2](https://github.com/Unitech/pm2)
- Install pm2 globally `npm i -g pm2`
- Start the server in the project directory `pm2 start index.js --name RemoteShutdownService` 
- Configure autostart (optional) `pm2 autostart`.
  - On Windows you can add `pm2 resurrect` to a `start.cmd` file and add it to your registry at `HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Run` to launch the command on startup
- Save the current running tasks for autostart `pm2 save`

Listens on port: `5001` with password: `e` by default  
You can configure this in `index.js`

TODO: 
- Tests
- One click executable

I put this together in a few hours, please open a PR if you find bugs.
