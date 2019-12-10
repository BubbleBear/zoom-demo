module.exports = class BaseService {
    constructor(app) {
        this.app = app;
        this.config = this.app.config;
    }
}
