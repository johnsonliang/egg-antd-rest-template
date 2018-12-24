module.exports = app => {
  class UsersService extends app.Service {
    async login(request) {
      const condition = { name: request.name };
      const record = await this.app.mysql.get("web_admin", condition);
      return record;
    }
  }
  return UsersService;
};
