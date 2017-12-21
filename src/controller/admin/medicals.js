const Base = require('./base.js');
const sDateTime = require('silly-datetime');
module.exports = class extends Base {
    indexAction() {
        return this.display();
  }

    async addAction() {
        const medical_type = this.model('medical_type'); // controller 里实例化模型
        const data = await medical_type.select();
        this.assign('type',data);
        return this.display();
    }

    /**
     * 查看资讯
     */
    async listAction() {
        const medicals = this.model('medicals'); // controller 里实例化模型
        const data = await medicals.getMedicalData();
        return this.json(data);
    }

    /**
     * 查看
     */
    async oneAction() {
        let pdata = this.post('id');
        const medicals = this.model('medicals'); // controller 里实例化模型
        const data = await medicals.where({'id':pdata}).select();
        const medical_type = this.model('medical_type');
        const type = await medical_type.select();
        return this.json({"succ":true,"data":data,"type":type});
    }
    /**
     * 保存
     */
    async saveAction() {
        let data = this.post();
        console.log(data);

        let time =  sDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        data.time = time;
        if (think.isEmpty(data.id)) {
            //保存
            let res = await this.model("medicals").add(data);
            if (res) {
                this.json({"succ":true});
            } else {
                this.json({"succ":false});
            }
        } else {
            //更新
            let res = await this.model("medicals").where({id: ['IN', data.id]}).update(data);
            if (res) {
                this.json({"succ":true});
            } else {
                this.json({"succ":false});
            }
        }
    }

    /**
     * 删除资讯
     */
    async delAction() {
        let medicalsModel = this.model("medicals");
        let posts = this.post("typeid");
        let delNums = medicalsModel.where({typeid: ['IN', posts]}).delete();
        if(delNums){
            this.json({"succ":true});
        }else{
            this.json({"succ":false});
        }
    }
};
