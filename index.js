const express = require('express');
const { screenOff, sleep, shutdown, restart } = require('./utils');

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

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});