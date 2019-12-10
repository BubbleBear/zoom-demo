const jwt = require('jsonwebtoken');
const request = require('../util/request');

const BaseService = require('./base');

class AuthenticationService extends BaseService {
    async getJWT(expire = 5000) {
        const secrets = this.config.secrets.jwt;

        const payload = {
            iss: secrets.apiKey,
            exp: ((new Date()).getTime() + expire),
        };

        //Automatically creates header, and returns JWT
        const token = jwt.sign(payload, secrets.apiSecret);

        return token;
    }

    // todo
    async oauth() {
        const secrets = this.config.secrets.oauth;
    }
}

module.exports = AuthenticationService;

if (require.main === module) {
    (async () => {
        const app = {
            config: {
                secrets: require('../../secrets.json'),
            }
        };
    
        const auth = new AuthenticationService(app);
    
        const jwt = await auth.getJWT();
    
        console.log(jwt);
    })();
}
