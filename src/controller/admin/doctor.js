const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

    /**
     * 查看医生
     */
    async listAction() {
        const doctor = this.model('myh_doctor'); // controller 里实例化模型
        const data = await doctor.select();
        return this.json(data);
    }

  addAction() {
        return this.display();
  }
};
