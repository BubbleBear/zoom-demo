const { parse: parseUrl } = require('url');

const UserService = require('../service/user');

class UserController {
    async list(req, res) {
        const li = await req.app.services.user.list();
        res.write(li.body);
    }
};

module.exports = new UserController;
