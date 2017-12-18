const Base = require('./base.js');

module.exports = class extends Base {
    async indexAction() {
        const user = this.model('user'); // controller 里实例化模型
        const data = await user.select();
        this.assign('title',"测试网页之hello world!");
        return this.display();
    }
    async welcomeAction() {
        return this.display();
    }
};
