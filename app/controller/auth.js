const { parse: parseUrl } = require('url');

const AuthenticationService = require('../service/authentication');

class AuthenticationController {
    getOAuthCode(req, res) {
        const querystring = parseUrl(req.url).query || '';
        const query = querystring
            .split('&')
            .filter(e => e)
            .reduce((acc, cur) => {
                const [key, value] = cur.split('=');
                acc[key] = value;

                return acc;
            }, {});

        if (query.code === undefined) {
            res.writeHead(301, 'redirect', {
                Location: '',
            });
        }
    }
};

module.exports = new AuthenticationController;
