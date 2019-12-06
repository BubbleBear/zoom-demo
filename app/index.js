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
