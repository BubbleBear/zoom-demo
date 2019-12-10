const request = require('../util/request');

const BaseService = require('./base');

class MeetingService extends BaseService {
    async list(token, userId) {
        return request.get(`https://api.zoom.us/v2/users/${userId}/meetings`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async create(token, userId, body) {
        return request.post(`https://api.zoom.us/v2/users/${userId}/meetings`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body,
            json: true,
        });
    }
}

module.exports = MeetingService;

if (require.main === module) {
    const AuthenticationService = require('./authentication');

    const app = {
        config: {
            secrets: require('../../secrets.json'),
        }
    };

    const auth = new AuthenticationService(app);

    const meeting = new MeetingService(app);

    (async () => {
        const jwt = await auth.getJWT();

        const list = await meeting.list(jwt, 'Af1u82ftSNO6GiMp9l6ihw');

        console.log(JSON.stringify(JSON.parse(list.body), 0, 4));

        console.log('###################################################');

        const createBody = {
            topic: 'asdf',
            type: 1, // 1.instant | 2.scheduled | 3.recurring w/out fixed time | 4.recurring w/ fixed time
            // start_time: moment.utc(),
            settings: {
                host_video: true,
                participant_video: true,
                cn_meeting: true,
            }
        };

        try {
            const create = await meeting.create(jwt, 'Af1u82ftSNO6GiMp9l6ihw', createBody);

            console.log(create.body);
        } catch (e) {
            console.log(e);
        }
    })();
}
