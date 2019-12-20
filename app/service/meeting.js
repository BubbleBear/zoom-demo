const request = require('../util/request');

const BaseService = require('./base');

class MeetingService extends BaseService {
    async list(userId) {
        const token = await this.app.services.authentication.getJWT();

        return request.get(`https://api.zoom.us/v2/users/${userId}/meetings`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async create(userId, body) {
        const token = await this.app.services.authentication.getJWT();

        return request.post(`https://api.zoom.us/v2/users/${userId}/meetings`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body,
            json: true,
        });
    }

    async get(meetingId) {
        const token = await this.app.services.authentication.getJWT();

        return request.get(`https://api.zoom.us/v2/meetings/${meetingId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

module.exports = MeetingService;

if (require.main === module) {
    const LoaderService = require('./loader');

    const app = {
        config: {
            secrets: require('../../secrets.json'),
        }
    };

    const loader = new LoaderService(app);

    const meeting = new MeetingService(app);

    (async () => {
        await loader.loadServices();

        const list = await meeting.list('6WG0RF0eTNGPfUVLULpDRg');

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

        // const r = await meeting.create('6WG0RF0eTNGPfUVLULpDRg', createBody);

        // console.dir(r.body, {
        //     depth: null,
        // });

        const m = await meeting.get(251374804);

        console.dir(JSON.parse(m.body), {
            depth: null,
        });
    })();
}
