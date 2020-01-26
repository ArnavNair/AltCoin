const routes = require('next-routes')();
routes.add("/projects/new","/projects/new")
.add("/projects/:address", "/projects/show")
.add("/projects/:address/validate","/projects/validate")
.add("/projects/:address/reject","/projects/reject")
.add("/projects/:address/donate","/projects/donate")
.add("/projects/:address/add","/projects/add");
module.exports = routes;