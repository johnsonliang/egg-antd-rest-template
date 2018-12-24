module.exports = app => {
  class RestqlService extends app.Service {
    async index(modal, query, condition = {}) {
      console.log(modal);
      const offset = (parseInt(query.page) - 1) *  parseInt(query.pageSize);
      const record = await this.app.mysql.select(modal, {
        where: condition,
        limit: parseInt(query.pageSize),
        offset: offset
      });
      let conditionstr = "";
      if (JSON.stringify(condition) != "{}") {
        conditionstr = " where ";
        for (const key in condition) {
          conditionstr = conditionstr + key + " = " + condition[key] + " and ";
        }
        conditionstr = conditionstr.substring(
          0,
          conditionstr.lastIndexOf(" and ")
        );
      }
      const totalsql = "select count(*) as total from " + modal + conditionstr;
      const totalRecord = await this.app.mysql.query(totalsql);
      return { record, totalRecord: totalRecord[0].total };
    }
    async show(modal, params) {
      console.log(modal);
      const modalId = await this.service.tableinfo.primaryKey(modal);
      console.log(modalId);
      let condition = {};
      condition[modalId] = params.id;
      let record = await this.app.mysql.get(modal, condition);
      return record;
    }
    async update(modal, id, request) {
      const modalId = await this.service.tableinfo.primaryKey(modal);
      let upstr = `update ${modal} set `;
      let upEscape = [];
      for (const key in request) {
        if (upEscape.length != 0) {
          upstr += ", ";
        }
        upstr += `${key} = ?`;
        upEscape.push(request[key]);
      }
      upstr += ` where ${modalId} = ?`;
      upEscape.push(id);
      let result = await app.mysql.query(upstr, upEscape);
      return result;
    }
    async create(modal, request) {
      const result = await this.app.mysql.insert(modal, request);
      return result;
    }
    async destroy(modal, params) {
      const modalId = await this.service.tableinfo.primaryKey(modal);
      const ids = params.id.split(",");
      let condition = {};
      condition[modalId] = ids;
      const result = await this.app.mysql.delete(modal, condition);
      return result;
    }
    async preOne(modal, params) {
      const modalId = await this.service.tableinfo.primaryKey(modal);
      let queryStr = `select *  from ${modal} where ${modalId} < ?  order by ${modalId} desc limit 1 `;
      let sqlEscape = [params.id];
      let result = await app.mysql.query(queryStr, sqlEscape);

      return result;
    }
    async nextOne(modal, params) {
      const modalId = await this.service.tableinfo.primaryKey(modal);
      let queryStr = `select *  from ${modal} where ${modalId} > ?  order by ${modalId} asc limit 1 `;
      let sqlEscape = [params.id];
      let result = await app.mysql.query(queryStr, sqlEscape);
      return result;
    }
  }
  return RestqlService;
};
