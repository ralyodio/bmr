(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['login'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form id=\"login\" class=\"clearfix\" method=\"post\">\n    <fieldset>\n        <p><label for=\"user\">Username</label> <input type=\"text\" name=\"user\" id=\"user\" value=\"payton\"></p>\n        <p><label for=\"password\">Password</label> <input type=\"password\" id=\"password\" name=\"pass\" value=\"manning\"></p>\n        <p><label for=\"host\">Host</label> <input type=\"text\" id=\"host\" name=\"host\" value=\"bitmessagehost\"></p>\n        <p><label for=\"port\">Port</label> <input type=\"text\" id=\"port\" name=\"port\" value=\"8442\"></p>\n    </fieldset>\n    <button type=\"submit\">Login</button>\n</form>";
  });
})();
