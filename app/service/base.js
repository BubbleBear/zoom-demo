module.exports = class BaseService {
    constructor(app) {
        this.app = app;
    }

    get config() {
        return this.app.config;
    }
}
