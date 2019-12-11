const { parse: parseUrl } = require('url');

const AuthenticationService = require('../service/authentication');

class AuthenticationController {
    getOAuthCode(req, res) {
        if (query.code === undefined) {
            res.writeHead(301, 'redirect', {
                Location: '',
            });
        }
    }
};

module.exports = new AuthenticationController;
