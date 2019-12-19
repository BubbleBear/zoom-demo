const http = require('http');
const fs = require('fs');
const { join: joinPath } = require('path');
const { parse: parseUrl } = require('url');

const LoaderService = require('./service/loader');

const config = {
    secrets: require('../secrets.json'),
};

const PORT = 3005;

const server = http.createServer();

const route = {
    '/': '/index.html',
};

const app = {
    config,
    server,
};

const loader = new LoaderService(app);

server
    .on('request', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');

        const path = parseUrl(route[req.url] || req.url).pathname;
        req.app = res.app = app;

        const querystring = parseUrl(req.url).query || '';
        req.query = querystring
            .split('&')
            .filter(e => e)
            .reduce((acc, cur) => {
                const [key, value] = cur.split('=');
                acc[key] = value;

                return acc;
            }, {});

        if (path.startsWith('/api')) {
            try {
                const [_0, _1, controllerName, actionName] = path.split('/');
                console.log(controllerName, actionName);
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

loader.loadServices().then(() => {
    server.listen(PORT, () => {
        console.log(`listening on ${PORT}`);
    });
});
