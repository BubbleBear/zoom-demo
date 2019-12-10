const http = require('http');
const fs = require('fs');
const { join: joinPath } = require('path');
const { parse: parseUrl } = require('url');

const PORT = 3005;

const server = http.createServer();

const route = {
    '/': '/index.html',
};

server
    .on('request', (req, res) => {
        const path = parseUrl(route[req.url] || req.url).pathname;

        if (path.startsWith('/api')) {
            try {
                const [_0, _1, controllerName, actionName] = path.split('/');
                const controller = require(`./controller/${controllerName}`);
                const action = controller[actionName](req, res);

                if (action instanceof Promise) {
                    action.then(() => {
                        res.end();
                    });
                } else {
                    res.end();
                }
            } catch (e) {
                console.log(e);
                res.end();
            }

            return;
        }

        // static resources
        fs.createReadStream(joinPath(__dirname, '../', 'public', path))
            .on('error', (e) => {
                console.log(e);
                res.statusCode = 400;
                res.end();
            })
            .pipe(res);
    });

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
