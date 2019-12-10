const request = require('request');

function getCallback(resolve, reject) {
    return function callback(err, res) {
        if (err) {
            reject(err);
        } else {
            resolve(res);
        }
    }
}

async function promisify(...args) {
    const potentialCallback = args[args.length - 1];

    if (typeof potentialCallback === 'function') {
        throw new Error();
    }

    return new Promise((resolve, reject) => {
        this(...args, getCallback(resolve, reject));
    });
}

const requestAsync = new Proxy(promisify.bind(request), {
    get(_, method) {
        if (typeof request[method] !== 'function') {
            throw new Error();
        }

        return promisify.bind(request[method]);
    }
});

module.exports = requestAsync;

if (require.main === module) {
    (async () => {
        const a = await requestAsync.get('https://api.zoom.us/v2/users', {
            headers: {
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6ImZpMTZvblMxUlhPZHNHZUl1RHo3QXciLCJleHAiOjE1NzU5NTk3NzYsImlhdCI6MTU3NTk1NDM3Nn0.CWe4Cp5IjS4mxoEMrl4a49wU0_3nqyhKamx0PjK06Lc',
            },
        });

        console.log('request.get(): ', a.body);

        const b = await requestAsync({
            uri: 'https://api.zoom.us/v2/users',
            headers: {
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6ImZpMTZvblMxUlhPZHNHZUl1RHo3QXciLCJleHAiOjE1NzU5NTk3NzYsImlhdCI6MTU3NTk1NDM3Nn0.CWe4Cp5IjS4mxoEMrl4a49wU0_3nqyhKamx0PjK06Lc',
            },
            method: 'get',
        });

        console.log('request(): ', b.body);
    })();
}
