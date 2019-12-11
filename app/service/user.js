const request = require('../util/request');

const BaseService = require('./base');

class UserService extends BaseService {
    async list() {
        const token = await this.app.services.authentication.getJWT();

        return request.get('https://api.zoom.us/v2/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async create(body) {
        const token = await this.app.services.authentication.getJWT();

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
    const LoaderService = require('./loader');

    const app = {
        config: {
            secrets: require('../../secrets.json'),
        }
    };

    const loader = new LoaderService(app);

    const user = new UserService(app);

    (async () => {
        await loader.loadServices();

        const list = await user.list();

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
            const create = await user.create(createBody);

            console.log(create.body);
        } catch (e) {
            console.log(e);
        }
    })();
}
