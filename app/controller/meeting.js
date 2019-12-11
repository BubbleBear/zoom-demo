const { parse: parseUrl } = require('url');

class MeetingController {
    async list(req, res) {
        const query = req.query;
        const li = await req.app.services.meeting.list(query.userId);
        res.write(li.body);
    }

    async create(req, res) {
        const query = req.query;
        
        const createBody = {
            topic: query.topic || 'default',
            type: query.type || 1, // 1.instant | 2.scheduled | 3.recurring w/out fixed time | 4.recurring w/ fixed time
            // start_time: moment.utc(),
            settings: {
                host_video: true,
                participant_video: true,
            }
        };

        const r = await req.app.services.meeting.create(query.userId, createBody);

        res.write(JSON.stringify(r.body));
    }
};

module.exports = new MeetingController;
