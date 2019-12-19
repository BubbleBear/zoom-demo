const { readFile, writeFile } = require('fs');
const util = require('util');
const { resolve: resolvePath } = require('path');

const BaseService = require('./base');

class StorageService extends BaseService {
    constructor(app) {
        super(app);

        this.read = util.promisify(readFile);
        this.write = util.promisify(writeFile);
        this.storePath = resolvePath(__dirname, '../../store.json');
    }

    async set(key, value) {
        let store = {};

        try {
            store = JSON.parse(await this.read(this.storePath));
        } catch (e) { }

        store[key] = value;

        await this.write(this.storePath, JSON.stringify(store));
    }

    async get(key) {
        let store = {};

        try {
            store = JSON.parse(await this.read(this.storePath));
        } catch (e) { }

        return store[key];
    }

    async unset(key) {
        let store = {};

        try {
            store = JSON.parse(await this.read(this.storePath));
        } catch (e) { }

        delete store[key];

        await this.write(this.storePath, JSON.stringify(store));
    }
}

module.exports = StorageService;

if (require.main === module) {
    const LoaderService = require('./loader');

    const app = {
        config: {
            secrets: require('../../secrets.json'),
        }
    };

    const loader = new LoaderService(app);
    
    (async () => {
        const services = await loader.loadServices();

        let x;

        x = await services.storage.get('x');

        console.log(x);

        await services.storage.set('x', {
            1: 2,
            3: 4
        });

        x = await services.storage.get('x');

        console.log(x);

        await services.storage.set('y', 'asdf');

        await services.storage.unset('x');

        x = await services.storage.get('x');

        console.log(x);
    })();
}
