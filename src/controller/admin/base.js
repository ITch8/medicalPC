module.exports = class extends think.Controller {
    async __before() {

        console.log(this.ctx.controller +"  "+ this.ctx.action);

        if(this.ctx.controller === 'admin/login' && this.ctx.action === 'index' ){ //如果是admin_index那么久不验证了，直接返回给予登录。
            return;
        }
        if(this.ctx.controller === 'admin/index' && this.ctx.action === 'index' ){ //如果是访问后台 需要验证session是否有效。
            let userinfo = await this.session('userinfo');
            console.log("userinfo1======="+JSON.stringify(userinfo));
            if (!think.isEmpty(userinfo)){
                this.assign('userinfo',userinfo);
            }else{
                console.log("userinfo2======="+JSON.stringify(userinfo));
                return this.redirect('/admin/login');//跳到登录页面
            }
        }
    }
};
