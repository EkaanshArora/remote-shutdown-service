const turnOffDisplay = require("turn-off-display");
const os = require('os');
const { exec } = require("child_process");

let currentOs = os.type()

const screenOff = () => {
    console.log('trying screen off')
    if (currentOs === 'Linux') {
        exec(`xset dpms force off`, (err, out, stde) => {
            if (err) {
                console.log(err, out, stde)
            } else {
                console.log('screen off')
            }
        })
    }
    try {
        turnOffDisplay();
        console.log('screen off')
    }
    catch (err) {
        console.log(err)
    }
}

const shutdown = () => {
    console.log('trying shut down')
    if (currentOs === 'Windows_NT') {
        try {
            exec(`shutdown -s -t 2`, (err, out, stde) => {
                if (err) {
                    console.log(err, out, stde)
                } else {
                    console.log('shutting down')
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    } else {
        try {
            exec(`shutdown -h now`, (err, out, stde) => {
                if (err) {
                    console.log(err, out, stde)
                } else {
                    console.log('shutting down')
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}

const restart = () => {
    console.log('trying restarting')
    if (currentOs === 'Windows_NT') {
        exec(`shutdown -r -t 2`, (err, out, stde) => {
            if (err) {
                console.log(err, out, stde)
            } else {
                console.log('restarting')
            }
        })
    } else {
        exec(`shutdown -r now`, (err, out, stde) => {
            if (err) {
                console.log(err, out, stde)
            } else {
                console.log('restarting')
            }
        })
    }
}

const sleep = () => {
    console.log('trying sleeping')
    if (currentOs === 'Windows_NT') {
        try {
            exec(`%windir%\\System32\\rundll32.exe powrprof.dll,SetSuspendState 0,1,0`, (err, out, stde) => {
                console.log('sleeping')
                if (err)
                    console.log(err, out, stde)
            })
            // if your windows system uses hibernate use this instead
            // exec(`powercfg -hibernate off  &&  start /min "" %windir%\\System32\\rundll32.exe powrprof.dll,SetSuspendState Standby  &&  ping -n 3 127.0.0.1  &&  powercfg -hibernate on`)
        }
        catch (err) {
            console.log(err)
        }
    } else if (currentOs === 'Linux') {
        exec(`systemctl suspend`, (err, out, stde) => {
            if (err) {
                console.log(err, out, stde)
            } else {
                console.log('sleeping')
            }
        })
    } else if (currentOs === 'Darwin') {
        exec(`pmset sleepnow`, (err, out, stde) => {
            if (err) {
                console.log(err, out, stde)
            } else {
                console.log('sleeping')
            }
        })
    }
}

module.exports = {sleep, shutdown, screenOff, restart}