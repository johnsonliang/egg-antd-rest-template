// 1 获取内容列表，分页，每页几个
exports.index = async function() {
  const response = { success: false, message: "操作失败" };
  const result = await this.service.tableinfo.index();
  if (result) {
    response.message = "操作成功";
    response.success = true;
    response.data = result;
  }
  this.body = response;
  this.status = 200;
};
// 2 根据ID获取内容信息
exports.show = async function () {
  const response = { success: false, message: "操作失败" };
  const result = await this.service.tableinfo.show(this.params);
  if (result) {
    response.message = "操作成功";
    response.success = true;
    response.data = result;
  }
  this.body = response;
  this.status = 200;
};

// 3 创建内容
exports.create = async function () {
  const response = { success: false, message: "操作失败" };
  const result = await this.service.tableinfo.create(this.request.body);
  if (result) {
    response.message = "操作成功";
    response.success = true;
    response.data = result;
  }
  this.body = response;
  this.status = 200;
};
// 4 更新内容信息
exports.update = async function () {
  const response = { success: false, message: "操作失败" };
  let params = { res: this.request.body.tableName };
  const result1 = await this.service.tableinfo.destroy(params);
  if (result1) {
    const result2 = await this.service.tableinfo.create(this.request.body);
    if (result2) {
      response.message = "操作成功";
      response.success = true;
      response.data = result2;
    }
  }
  this.body = response;
  this.status = 200;
};

// 5 删除内容信息
exports.destroy = async function () {
  const response = { success: false, message: "操作失败" };
  const result = await this.service.tableinfo.destroy(this.params);
  if (result) {
    response.message = "操作成功";
    response.success = true;
    response.data = result;
  }
  this.body = response;
  this.status = 200;
};
