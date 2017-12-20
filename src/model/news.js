module.exports = class extends think.Model {
     getNewsData () {//联合查询  自定义方法
         return this.join('myh_news_type ON myh_news.typeid=myh_news_type.typeid').select();
     }
};
