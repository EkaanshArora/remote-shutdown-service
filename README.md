# Remote Shutdown Service

Node/Express server for https://github.com/EkaanshArora/remote-shutdown-app to trigger shutdown, restart and sleep desktop commands from your phone.

Should work on Mac, Windows and Linux. You'll need to launch the service as a superuser to have necessary privileges to execute shutdown command. 

Listens on port: `5001` with password: `e` by default

You can configure it in `index.js`

TODO: 
- Tests
- One click executable that registers a daemon/service on system startup for window, mac and linux

I put this together in a few hours, please open a PR if you find bugs.