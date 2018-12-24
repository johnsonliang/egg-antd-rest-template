module.exports = app => {
  class UsersService extends app.Service {
    async login(request) {
      let condition = { name: request.name };
      let record = await this.app.mysql.get("web_admin", condition);
      return record;
    }
  }
  return UsersService;
};
