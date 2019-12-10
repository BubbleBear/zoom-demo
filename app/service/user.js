const request = require('../util/request');

const BaseService = require('./base');

class UserService extends BaseService {
    async list(token) {
        return request.get('https://api.zoom.us/v2/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async create(token, body) {
        return request.post('https://api.zoom.us/v2/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body,
            json: true,
        });
    }
}

module.exports = UserService;

if (require.main === module) {
    const AuthenticationService = require('./authentication');

    const app = {
        config: {
            secrets: require('../../secrets.json').zoom,
        }
    };

    const auth = new AuthenticationService(app);

    const user = new UserService(app);

    (async () => {
        const jwt = await auth.getJWT();

        const list = await user.list(jwt);

        console.log(JSON.stringify(JSON.parse(list.body), 0, 4));

        console.log('###################################################');

        const createBody = {
            action: 'create', // create | autoCreate | custCreate | ssoCreat e,
            user_info: {
                email: 'vesselvatel@163.com',
                type: 1, // 1: basic | 2: pro | 3: crop
                first_name: 'adios',
                last_name: 'aloha',
                password: 'asdAA234f',
            },
        }

        try {
            const create = await user.create(jwt, createBody);

            console.log(create.body);
        } catch (e) {
            console.log(e);
        }
    })();
}
