const { parse: parseUrl } = require('url');

class FooController {
    beforeUnload(req, res) {
        console.log('bar');
    }
};

module.exports = new FooController;
