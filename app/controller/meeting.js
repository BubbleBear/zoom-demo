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

        if (query.meetingKey) {
            await req.app.services.storage.set(query.meetingKey, r.body);
        }

        res.write(JSON.stringify({
            meeting: r.body,
        }));
    }

    async get(req, res) {
        const query = req.query;

        let meeting = await req.app.services.storage.get(query.meetingKey);

        if (meeting) {
            const r = await req.app.services.meeting.get(meeting.id);

            meeting = JSON.parse(r.body);
        }

        res.write(JSON.stringify({
            meeting,
        }));
    }

    async delete(req, res) {
        const query = req.query;

        await req.app.services.storage.unset(query.meetingKey);

        res.write(JSON.stringify({}));
    }
};

module.exports = new MeetingController;
