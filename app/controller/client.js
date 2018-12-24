"use strict";

module.exports = app => {
  class ClientController extends app.Controller {
    async index() {
      const ctx = this.ctx;
      ctx.body = await ctx.renderView("public/index.html");
    }
  }
  return ClientController;
};
