const { join: joinPath } = require('path');

const { scan } = require('directory-scanner');

const BaseService = require('./base');

class LoaderService extends BaseService {
    async loadServices(force = false) {
        if (this.loaded && !force) {
            return this.app.services;
        }

        const serviceMap = await scan(joinPath(__dirname), (filename, filepath) => {
            return new (require(filepath))(this.app);
        });

        const renamed = Object.keys(serviceMap).reduce((acc, cur) => {
            const serviceName = cur.split('.').splice(-2, 1).join('.');
            acc[serviceName] = serviceMap[cur];

            return acc;
        }, {});

        this.app.services = renamed;

        this._loaded = true;

        return renamed;
    }

    get loaded() {
        return Boolean(this._loaded);
    }

    set loaded(loaded) {
        this._loaded = Boolean(loaded);
    }
}

module.exports = LoaderService;

if (require.main === module) {
    (async () => {
        const app = {
            config: {
                secrets: require('../../secrets.json'),
            }
        };
    
        const loader = new LoaderService(app);
    
        await loader.loadServices();
    })();
}
