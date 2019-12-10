const jwt = require('jsonwebtoken');

const BaseService = require('./base');

class AuthenticationService extends BaseService {
    async getJWT(expire = 5000) {
        const secrets = this.config.secrets;

        const payload = {
            iss: secrets.apiKey,
            exp: ((new Date()).getTime() + expire),
        };

        //Automatically creates header, and returns JWT
        const token = jwt.sign(payload, secrets.apiSecret);

        return token;
    }

    // todo
    async oAuth() {
        const secrets = this.config.secrets;

        const options = {
            method: 'POST',
            url: 'https://api.zoom.us/oauth/token',
            qs: {
                grant_type: 'authorization_code',
                //The code below is a sample authorization code. Replace it with your actual authorization code while making requests.
                code: 'B1234558uQ',
                //The uri below is a sample redirect_uri. Replace it with your actual redirect_uri while making requests.
                redirect_uri: 'https://abcd.ngrok.io'
            },
            headers: {
                /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
                **/
                Authorization: 'Basic abcdsdkjfesjfg'
            }
        };
    }
}

module.exports = AuthenticationService;

if (require.main === module) {
    (async () => {
        const app = {
            config: {
                secrets: require('../../secrets.json').zoom,
            }
        };
    
        const auth = new AuthenticationService(app);
    
        const jwt = await auth.getJWT();
    
        console.log(jwt);
    })();
}
