const Base = require('./base.js');
const sDateTime = require('silly-datetime');
module.exports = class extends Base {
    indexAction() {
        return this.display();
  }

    async addAction() {
        const news_type = this.model('news_type'); // controller 里实例化模型
        const data = await news_type.select();
        this.assign('type',data);
        return this.display();
    }

    /**
     * 查看资讯
     */
    async listAction() {
        const news = this.model('news'); // controller 里实例化模型
        const data = await news.getNewsData();
        return this.json(data);
    }

    /**
     * 查看资讯
     */
    async oneAction() {
        let pdata = this.post('id');
        const news = this.model('news'); // controller 里实例化模型
        const data = await news.where({'id':pdata}).select();
        const newstype = this.model('news_type');
        const type = await newstype.select();
        return this.json({"succ":true,"data":data,"type":type});
    }
    /**
     * 保存资讯
     */
    async saveAction() {
        let data = this.post();
        console.log(data);

        let time =  sDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        data.time = time;
        if (think.isEmpty(data.id)) {
            //保存
            let res = await this.model("news").add(data);
            if (res) {
                this.json({"succ":true});
            } else {
                this.json({"succ":false});
            }
        } else {
            //更新
            let res = await this.model("news").where({id: ['IN', data.id]}).update(data);
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
        let newsModel = this.model("news");
        let posts = this.post("typeid");
        let delNums = newsModel.where({typeid: ['IN', posts]}).delete();
        if(delNums){
            this.json({"succ":true});
        }else{
            this.json({"succ":false});
        }
    }
};
