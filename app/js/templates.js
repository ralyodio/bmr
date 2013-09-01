(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['inbox'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section id=\"inbox\">\n    <table>\n        <caption>\n            <form id=\"inbox-action\">\n                <select>\n                    <option value=\"trash\">Move to trash</option>\n                </select>\n                <button type=\"submit\">Apply</button>\n            </form>\n        </caption>\n        <thead>\n        <tr>\n            <th class=\"no-sort\"><input type=\"checkbox\" name=\"mark-all\"></th>\n            <th>From</th>\n            <th>To</th>\n            <th>Subject</th>\n            <th class=\"date\">Date</th>\n        </tr>\n        </thead>\n        <tbody></tbody>\n    </table>\n</section>";
  });
templates['inboxMessage'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr class=\"msg\" data-msgid=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <td colspan=\"";
  if (stack1 = helpers.colCount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.colCount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        <div class=\"content loading\"></div>\n    </td>\n</tr>\n";
  return buffer;
  });
templates['inboxMessageContent'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a href=\"#\" class=\"close\">Close</a>\n<h3 class=\"subject\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.subject)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n<p class=\"date\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.receivedTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n<p data-from=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.fromAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"from\">From: "
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.fromAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n<p data-to=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.toAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"to\">To: "
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.toAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n<nav>\n    <a href=\"#\" class=\"reply\">Reply</a>\n    <a href=\"#\" class=\"trash\">Trash</a>\n</nav>\n<section class=\"message\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.message)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</section>";
  return buffer;
  });
templates['inboxMessages'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <td class=\"mark-item\"><input type=\"checkbox\" name=\"mark\" value=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></td>\n    <td data-sort=\"";
  if (stack1 = helpers.from) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.from; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"nowrap\" data-from=\"";
  if (stack1 = helpers.from) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.from; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.from) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.from; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n    <td data-sort=\"";
  if (stack1 = helpers.to) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.to; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"nowrap\" data-to=\"";
  if (stack1 = helpers.to) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.to; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.to) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.to; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n    <td data-sort=\"";
  if (stack1 = helpers.subject) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.subject; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"subject wrap\">";
  if (stack1 = helpers.subject) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.subject; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n    <td class=\"nowrap\" data-sort=\"";
  if (stack1 = helpers.timeSortable) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.timeSortable; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span title=\"";
  if (stack1 = helpers.time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.timeReadable) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.timeReadable; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n</tr>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.messages, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });
templates['inboxReply'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<form id=\"reply\" method=\"post\">\n    <input type=\"hidden\" name=\"id\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.msgid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <fieldset>\n        <p>\n            <label for=\"reply-from\">From</label>\n            <select name=\"from\" id=\"reply-from\">";
  if (stack2 = helpers.options) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.options; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</select> <span id=\"reply-id\">";
  if (stack2 = helpers.selectedId) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.selectedId; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n        </p>\n        <p><label for=\"reply-to\">To</label> <input type=\"text\" name=\"to\" id=\"reply-to\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.fromAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></p>\n        <p><label for=\"reply-subject\">Subject</label> <input type=\"text\" name=\"subject\" id=\"reply-subject\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.subject)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></p>\n        <textarea name=\"message\" class=\"message\" id=\"reply-body\">&#13;&#10;&#13;&#10;------------------------------------------------------&#13;&#10;"
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.message)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n    </fieldset>\n</form>";
  return buffer;
  });
templates['inboxReplyOptions'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, depth0.selected, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <option value=\"";
  if (stack1 = helpers.address) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" selected>";
  if (stack1 = helpers.label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <option value=\"";
  if (stack1 = helpers.address) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n    ";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.identities, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  });
templates['login'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form id=\"login\" class=\"clearfix\" method=\"post\">\n    <fieldset>\n        <p><label for=\"user\">Username</label> <input type=\"text\" name=\"user\" id=\"user\" value=\"bradley\"></p>\n        <p><label for=\"password\">Password</label> <input type=\"password\" id=\"password\" name=\"pass\" value=\"manning\"></p>\n        <p><label for=\"host\">Host</label> <input type=\"text\" id=\"host\" name=\"host\" value=\"bitmessagehost\"></p>\n        <p><label for=\"port\">Port</label> <input type=\"text\" id=\"port\" name=\"port\" value=\"9442\"></p>\n    </fieldset>\n    <button type=\"submit\">Login</button>\n</form>";
  });
})();
