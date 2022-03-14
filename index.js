const express = require('express');
const { screenOff, sleep, shutdown, restart } = require('./utils');
const mdns = require('mdns')
// const bonjour = require('bonjour')()

const app = express();
const PORT = 5001;
const password = 'e'

const ping = (req, resp) => {
    resp.send({ message: 'pong' });
}

const withPassword = (req, resp) => {
    const requestPassword = req.params.password;
    if (!password) {
        return resp.status(500).json({ 'error': 'password is required' });
    }
    const mode = req.params.mode;
    if (!mode) {
        return resp.status(500).json({ 'error': 'mode is required' });
    }

    if (password === requestPassword) {
        switch (mode) {
            case 'screen':
                screenOff()
                break;
            case 'sleep':
                sleep()
                break;
            case 'shutdown':
                shutdown()
                break;
            case 'restart':
                restart()
                break;
            default:
                break;
        }
        return resp.json({ 'status': 'success' });
    } else {
        return resp.status(500).json({ 'error': 'incorrect password' });
    }

}

app.get('/ping', ping)
app.get('/:password/:mode', withPassword);

// bonjour.publish({ name: 'remote-shutdown-service', type: 'http', port: PORT })

mdns.createAdvertisement(mdns.tcp('http'), 5001, {name: 'remote-shutdown-service'}).start()

app.listen(PORT, () => {
    const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}
    console.log(`Listening on port: ${PORT}`, results);
});