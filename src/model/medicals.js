module.exports = class extends think.Model {
     getMedicalData () {//联合查询  自定义方法
         return this.join('myh_medical_type ON myh_medicals.typeid=myh_medical_type.typeid').select();
     }
};
