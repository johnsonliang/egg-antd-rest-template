// 1 获取内容列表，分页，每页几个
exports.index = async function() {
  const response = { success: false, message: "操作失败" };
  let { res } = this.params;
  const tableList = await this.service.tableinfo.index();
  if (res && this.helper.inarray(tableList, res)) {
    const result = await this.service.restql.index(res, this.query);
    if (result) {
      response.message = "操作成功";
      response.success = true;
      response.data = result;
    }
  }
  this.body = response;
  this.status = 200;
};
// 2 根据ID获取内容信息
exports.show = async function() {
  const response = { success: false, message: "操作失败" };
  let { res } = this.params;
  delete this.params.res;
  const tableList = await  this.service.tableinfo.index();
  if (res && this.helper.inarray(tableList, res)) {
    // 调用 service 获取数据
    const result = await  this.service.restql.show(res, this.params);
    const preOne = await  this.service.restql.preOne(res, this.params);
    const nextOne = await  this.service.restql.nextOne(res, this.params);
    if (result) {
      result.preOne = preOne[0] ? preOne[0] : "没有上一个了";
      result.nextOne = nextOne[0] ? nextOne[0] : "没有下一个了";
      response.message = "操作成功";
      response.success = true;
      response.data = result;
    }
  }
  this.body = response;
  this.status = 200;
};

// 3 创建内容
exports.create = async function() {
  const response = { success: false, message: "操作失败" };
  let res = this.params.res;
  const tableList = await  this.service.tableinfo.index();
  if (res && this.helper.inarray(tableList, res)) {
    const result = await  this.service.restql.create(res, this.request.body);
    if (result.affectedRows) {
      let returnBody = this.request.body;
      returnBody.uid = result.insertId;
      response.message = "操作成功";
      response.success = true;
      response.data = returnBody;
    }
  }
  this.body = response;
  this.status = 200;
};
// 4 更新内容信息
exports.update = async function() {
  const response = { success: false, message: "操作失败" };
  let { res } = this.params;
  const tableList = await  this.service.tableinfo.index();
  if (res && this.helper.inarray(tableList, res)) {
    const result = await  this.service.restql.update(
      res,
      this.params.id,
      this.request.body
    );
    if (result.affectedRows) {
      response.message = "操作成功";
      response.success = true;
      response.data = result;
    }
  }
  this.body = response;
  this.status = 200;
};

// 5 删除内容信息
exports.destroy = async function() {
  const response = { success: false, message: "操作失败" };
  let { res } = this.params;
  const tableList = await  this.service.tableinfo.index();
  if (res && this.helper.inarray(tableList, res)) {
    const result = await  this.service.restql.destroy(res, this.params);
    if (result.affectedRows) {
      response.message = "操作成功";
      response.success = true;
      response.data = result.affectedRows; //删除的条数
    }
  }
  this.body = response;
  this.status = 200;
};
