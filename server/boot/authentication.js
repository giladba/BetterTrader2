var loopback = require('loopback');
module.exports = function enableAuthentication(server) {
  // enable authentication
  server.enableAuth();
};


module.exports = function(app) {
  var User = app.models.User;
  User.find(function(err,ret) {
    console.log("Users: %j", ret);
  });
};

