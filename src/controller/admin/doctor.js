const Base = require('./base.js');
const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');
const sDateTime = require('silly-datetime');
module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

    /**
     * 查看医生
     */
    async listAction() {
        const doctor = this.model('doctor'); // controller 里实例化模型
        const data = await doctor.select();
        return this.json(data);
    }
    /**
     * 保存医生(默认头像)
     */
    async saveAction() {
        let data = this.post();
        console.log(data);
        data.avatar = 'static/avatars/defaultAvatar.png';
        if (think.isEmpty(data.id)) {
            //保存
            let res = await this.model("doctor").add(data);
            if (res) {
                this.json({"succ":true});
            } else {
                this.json({"succ":false});
            }
        } else {
            //更新
            let res = await this.model("doctor").update(data);
            if (res) {
                this.json({"succ":true});
            } else {
                this.json({"succ":false});
            }
        }
    }

    /**
     * 删除医生
     */
    async delAction() {
        let doctorModel = this.model("doctor");
        let posts = this.post("id");
        let delNums = doctorModel.where({id: ['IN', posts]}).delete();
        if(delNums){
            this.json({"succ":true});
        }else{
            this.json({"succ":false});
        }
    }

    //上传头像和数据信息
    async avatarAction(){
        let data = this.post();
        console.log("data====="+JSON.stringify(data));
        let themefile = this.file('avatar');
        let filepath = themefile.path;

        let uploadpath = path.join(think.ROOT_PATH, 'www/static/avatars');//文档目标位置
        think.mkdir(uploadpath);//创建该目录

        //新文件重命名
        //先拿到文件扩展名
        let extname = path.extname(themefile.name) || '.png';
        //重命名
        let newName =  sDateTime.format(new Date(), 'YYYYMMDDHHmmss') + extname;

        // let basename = themefile.name;//因为本系统不允许上传同名主题，所以文件名就直接使用主题名
        // Read the file
        fs.readFile(filepath, function (err, data) {
            if (err) throw err;
            console.log('File read!');
            // Write the file
            fs.writeFile(uploadpath + '/' + newName, data, function (res,err) {
                if (err) throw err;
                res.end();
            });
            // Delete the file
            fs.unlink(filepath, function (err) {
                if (err) throw err;
            });
        });

        // fs.renameSync(filepath, uploadpath + '/' + basename);
        themefile.path = uploadpath + '/' + newName;

        console.log("path====="+themefile.path);

        data.avatar = 'static/avatars/'+newName;
        //存数据库
        if (think.isEmpty(data.id)) {
            //保存
            let res = await this.model("doctor").add(data);
            if (res) {
                this.json({"succ":true});
            } else {
                this.json({"succ":false});
            }
        } else {
            //更新
            let res = await this.model("doctor").update(data);
            if (res) {
                this.json({"succ":true});
            } else {
                this.json({"succ":false});
            }
        }
    }
  addAction() {
        return this.display();
  }
};
