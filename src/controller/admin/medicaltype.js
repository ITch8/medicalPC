const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

    /**
     * 查看类型
     */
    async listAction() {
        const medical_type = this.model('medical_type'); // controller 里实例化模型
        const data = await medical_type.select();
        return this.json(data);
    }
    /**
     * 保存类型
     */
    async saveAction() {
        let data = this.post();
        if (think.isEmpty(data.typeid)) {
            //保存
            let res = await this.model("medical_type").add(data);
            if (res) {
                this.json({"succ":true});
            } else {
                this.json({"succ":false});
            }
        } else {
            //更新
            let res = await this.model("medical_type").where({typeid: ['IN', data.typeid]}).update(data);
            if (res) {
                this.json({"succ":true});
            } else {
                this.json({"succ":false});
            }
        }
    }

    /**
     * 删除类型
     */
    async delAction() {
        let medical_typeModel = this.model("medical_type");
        let posts = this.post("typeid");
        let delNums = medical_typeModel.where({typeid: ['IN', posts]}).delete();
        if(delNums){
            this.json({"succ":true});
        }else{
            this.json({"succ":false});
        }
    }
};
