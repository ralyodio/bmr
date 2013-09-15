(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['compose'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<form id=\"compose\" method=\"post\">\n    <fieldset>\n        <p>\n            <label for=\"compose-from\">From</label>\n            <select name=\"from\" id=\"compose-from\">";
  if (stack1 = helpers.options) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.options; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</select> <span id=\"compose-id\">";
  if (stack1 = helpers.selectedId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.selectedId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        </p>\n        <p><label for=\"compose-to\">To</label> <input type=\"text\" name=\"to\" id=\"compose-to\" value=\"";
  if (stack1 = helpers.toAddress) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.toAddress; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></p>\n        <p><label for=\"compose-subject\">Subject</label> <input type=\"text\" name=\"subject\" id=\"compose-subject\"></p>\n        <textarea name=\"message\" class=\"message\" id=\"compose-body\"></textarea>\n    </fieldset>\n</form>";
  return buffer;
  });
templates['contacts'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<section id=\"contacts\">\n    <table>\n        <caption>\n            <form id=\"contacts-action\" class=\"action\">\n                <select id=\"contacts-select-action\">\n                    <option value=\"add-contact\">Add contact</option>\n                    <option value=\"delete-contact\">Delete contact</option>\n                </select>\n                <button type=\"submit\">Apply</button>\n                <fieldset id=\"add-contact\" class=\"clearfix\">\n                    <p><label>Contact label: <input type=\"text\" name=\"label\"></label></p>\n                    <p><label>Contact address: <input type=\"text\" name=\"address\"></label></p>\n                </fieldset>\n            </form>\n            ";
  stack1 = self.invokePartial(partials.filter, 'filter', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </caption>\n        <thead>\n            <tr>\n                <th class=\"no-sort\"><input type=\"checkbox\" name=\"mark-all\"></th>\n                <th>Label</th>\n                <th>Address</th>\n            </tr>\n        </thead>\n        <tbody></tbody>\n    </table>\n</section>";
  return buffer;
  });
templates['contactsList'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <tr data-address=\"";
  if (stack1 = helpers.address) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        <td class=\"mark-item\"><input type=\"checkbox\" name=\"mark\" value=\"";
  if (stack1 = helpers.address) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></td>\n        <td data-sort=\"";
  if (stack1 = helpers.label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"nowrap label\">";
  if (stack1 = helpers.label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n        <td data-sort=\"";
  if (stack1 = helpers.address) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"nowrap address\">";
  if (stack1 = helpers.address) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n    </tr>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.contacts, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
templates['filter'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form id=\"filter\">\n    <label for=\"filter-value\">Filter</label>\n    <input type=\"text\" name=\"filter-value\" id=\"filter-value\">\n    <button type=\"reset\">Clear</button>\n</form>";
  });
templates['fromOptions'] = template(function (Handlebars,depth0,helpers,partials,data) {
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
templates['identities'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<section id=\"identities\">\n    <table>\n        <caption>\n            <form id=\"identities-action\">\n                <select id=\"identities-select-action\">\n                    <option value=\"create-address\">Create address</option>\n                    <option value=\"create-deterministic\">Create deterministic address</option>\n                    <!-- not supported by API yet\n                    <option value=\"enable-address\">Enable address</option>\n                    <option value=\"disable-address\">Disable address</option>\n                    -->\n                </select>\n                <button type=\"submit\">Apply</button>\n                <fieldset id=\"create-address\" class=\"clearfix\">\n                    <div>\n                        <p><label>Address label: <input type=\"text\" name=\"label\"></label></p>\n                        <p><label><input type=\"checkbox\" name=\"eighteenByteRipe\"> Do extra work for shorter address (18-byte RIPE)</label></p>\n                    </div>\n                    <div>\n                        <p><label>Total difficulty: <input type=\"text\" class=\"small\" name=\"totalDifficulty\" value=\"1.0\" maxlength=\"3\"></label></p>\n                        <p><label>Small message difficulty: <input class=\"small\" type=\"text\" name=\"smallMessageDifficulty\" value=\"1.0\"></label></p>\n                    </div>\n                </fieldset>\n                <fieldset id=\"create-deterministic\" class=\"clearfix hide\">\n                    <div>\n                        <p>\n                            <label>Address passphrase: <input type=\"text\" name=\"passphrase\"></label>\n                        </p>\n                        <p>\n                            <label>Number of addresses: <input type=\"text\" name=\"number\" size=\"1\" value=\"1\"></label>\n                        </p>\n                        <p>\n                            <label><input type=\"checkbox\" name=\"eighteenByteRipe\"> Do extra work for shorter address (18-byte RIPE)</label>\n                        </p>\n                    </div>\n                    <div>\n                        <p><label>Total difficulty: <input type=\"text\" class=\"small\" name=\"totalDifficulty\" value=\"1.0\" maxlength=\"3\"></label></p>\n                        <p><label>Small message difficulty: <input class=\"small\" type=\"text\" name=\"smallMessageDifficulty\" value=\"1.0\"></label></p>\n                    </div>\n                </fieldset>\n                <!--\n                <fieldset id=\"enable-address\" class=\"hide\">\n                    enable\n                </fieldset>\n                <fieldset id=\"disable-address\" class=\"hide\">\n                    disable\n                </fieldset>\n                -->\n            </form>\n            ";
  stack1 = self.invokePartial(partials.filter, 'filter', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </caption>\n        <thead>\n        <tr>\n            <th class=\"no-sort\"><input type=\"checkbox\" name=\"mark-all\"></th>\n            <th>Label</th>\n            <th>Address</th>\n            <th>Enabled</th>\n            <th>Stream</th>\n        </tr>\n        </thead>\n        <tbody></tbody>\n    </table>\n</section>";
  return buffer;
  });
templates['identitiesList'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr data-address=\"";
  if (stack1 = helpers.address) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <td class=\"mark-item\"><input type=\"checkbox\" name=\"mark\" value=\"";
  if (stack1 = helpers.address) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></td>\n    <td data-sort=\"";
  if (stack1 = helpers.label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"nowrap label\">";
  if (stack1 = helpers.label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n    <td data-sort=\"";
  if (stack1 = helpers.address) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"nowrap address\">";
  if (stack1 = helpers.address) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n    <td data-sort=\"";
  if (stack1 = helpers.enabled) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.enabled; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"enabled\">";
  if (stack1 = helpers.enabled) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.enabled; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n    <td data-sort=\"";
  if (stack1 = helpers.stream) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.stream; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"stream\">";
  if (stack1 = helpers.stream) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.stream; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n</tr>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.identities, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
templates['inbox'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<section id=\"inbox\">\n    <table>\n        <caption class=\"clearfix\">\n            <form id=\"inbox-action\">\n                <select>\n                    <option value=\"trash\">Move to trash</option>\n                    <option value=\"read\">Mark as read</option>\n                    <option value=\"unread\">Mark as unread</option>\n                </select>\n                <button type=\"submit\">Apply</button>\n            </form>\n            ";
  stack1 = self.invokePartial(partials.filter, 'filter', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </caption>\n        <thead>\n        <tr>\n            <th class=\"no-sort\"><input type=\"checkbox\" name=\"mark-all\"></th>\n            <th>From</th>\n            <th>To</th>\n            <th>Subject</th>\n            <th class=\"date\">Date</th>\n            <th>Size</th>\n        </tr>\n        </thead>\n        <tbody></tbody>\n    </table>\n</section>";
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
    + "\" class=\"";
  if (stack1 = helpers['class']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['class']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <td class=\"mark-item\"><input type=\"checkbox\" name=\"mark\" value=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></td>\n    <td data-sort=\"";
  if (stack1 = helpers.from) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.from; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"from nowrap\" data-address=\"";
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
    + "\"><span class=\"to nowrap\" data-address=\"";
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
    + "\">\n    ";
  stack1 = helpers['if'].call(depth0, depth0.subject, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </td>\n    <td class=\"nowrap\" data-sort=\"";
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
    + "</span></td>\n    <td class=\"nowrap right\" data-sort=\"";
  if (stack1 = helpers.bytes) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.bytes; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"size\">";
  if (stack1 = helpers.size) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.size; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n</tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <span class=\"subject wrap\">";
  if (stack1 = helpers.subject) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.subject; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n        <span class=\"subject wrap\">--</span>\n    ";
  }

  stack1 = helpers.each.call(depth0, depth0.messages, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });
templates['login'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form id=\"login\" class=\"clearfix\" method=\"post\">\n    <fieldset>\n        <p><label for=\"user\">Username</label> <input type=\"text\" name=\"user\" id=\"user\" value=\"\"></p>\n        <p><label for=\"password\">Password</label> <input type=\"password\" id=\"password\" name=\"pass\" value=\"\"></p>\n        <p><label for=\"host\">Host</label> <input type=\"text\" id=\"host\" name=\"host\" value=\"\"></p>\n        <p><label for=\"port\">Port</label> <input type=\"text\" id=\"port\" name=\"port\" value=\"8442\"></p>\n        <p class=\"remember\"><input type=\"checkbox\" id=\"remember\" name=\"remember\" value=\"1\"> <label for=\"remember\">Remember me</label></p>\n    </fieldset>\n    <button type=\"submit\">Login</button>\n</form>";
  });
templates['message'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr class=\"msg\" data-msgid=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-ack=\"";
  if (stack1 = helpers.ackData) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ackData; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <td colspan=\"";
  if (stack1 = helpers.colCount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.colCount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        <div class=\"content loading\"></div>\n    </td>\n</tr>\n";
  return buffer;
  });
templates['messageContent'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <p class=\"date\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.lastActionTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <p class=\"date\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.receivedTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n    ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n            <!-- <a href=\"#\" class=\"add-address\">Add to address book</a> -->\n        ";
  }

function program7(depth0,data) {
  
  
  return "\n            <a href=\"#\" class=\"reply\">Reply</a>\n        ";
  }

function program9(depth0,data) {
  
  
  return "\n            <a href=\"#\" class=\"render-html\">Show HTML</a>\n        ";
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <section class=\"message\">";
  stack2 = ((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.message)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</section>\n    ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"message\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.message)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</section>\n    ";
  return buffer;
  }

  buffer += "<div class=\"message-container\">\n    <nav class=\"icons\">\n        <a href=\"#\" class=\"minimize\">Minimize</a>\n        <a href=\"#\" class=\"maximize hide\">Maximize</a>\n        <a href=\"#\" class=\"close\">Close</a>\n    </nav>\n    <h3 class=\"subject\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.subject)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n    ";
  stack2 = helpers['if'].call(depth0, depth0.isSentMessage, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    <p data-address=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.fromAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"from\">From: "
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.fromAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n    <p data-address=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.toAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"to\">To: "
    + escapeExpression(((stack1 = ((stack1 = depth0.msg),stack1 == null || stack1 === false ? stack1 : stack1.toAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n    <nav>\n        ";
  stack2 = helpers['if'].call(depth0, depth0.isSentMessage, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        <a href=\"#\" class=\"trash\">Trash</a>\n        ";
  stack2 = helpers.unless.call(depth0, depth0.renderHtml, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        <a href=\"#\" class=\"reverse\">Reverse thread</a>\n    </nav>\n    ";
  stack2 = helpers['if'].call(depth0, depth0.renderHtml, {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>";
  return buffer;
  });
templates['modal'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"modal\">\n    <header>\n        <h2>";
  if (stack1 = helpers.header) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.header; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n        <div class=\"icons\">\n            <a href=\"#\" class=\"maximize hide\">Maxmimize</a>\n            <a href=\"#\" class=\"minimize\">Minimize</a>\n            <a href=\"#\" class=\"close\">Close</a>\n        </div>\n    </header>\n    <section></section>\n    <footer>\n        <button class=\"btn-primary\">";
  if (stack1 = helpers.primaryButton) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.primaryButton; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</button>\n    </footer>\n</div>";
  return buffer;
  });
templates['reply'] = template(function (Handlebars,depth0,helpers,partials,data) {
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
templates['sent'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<section id=\"sent\">\n    <table>\n        <caption>\n            <form id=\"sent-action\">\n                <select>\n                    <option value=\"trash\">Move to trash</option>\n                </select>\n                <button type=\"submit\">Apply</button>\n            </form>\n            ";
  stack1 = self.invokePartial(partials.filter, 'filter', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </caption>\n        <thead>\n        <tr>\n            <th class=\"no-sort\"><input type=\"checkbox\" name=\"mark-all\"></th>\n            <th>From</th>\n            <th>To</th>\n            <th>Subject</th>\n            <th class=\"status\">Status</th>\n            <th class=\"date\">Last</th>\n        </tr>\n        </thead>\n        <tbody></tbody>\n    </table>\n</section>";
  return buffer;
  });
templates['sentMessages'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-status=\"";
  if (stack1 = helpers.status) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-ack=\"";
  if (stack1 = helpers.ack) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ack; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <td class=\"mark-item\"><input type=\"checkbox\" name=\"mark\" value=\"";
  if (stack1 = helpers.ack) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ack; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></td>\n    <td data-sort=\"";
  if (stack1 = helpers.from) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.from; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"from nowrap\" data-from=\"";
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
    + "\"><span class=\"to nowrap\" data-address=\"";
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
    + "\">\n        ";
  stack1 = helpers['if'].call(depth0, depth0.subject, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </td>\n    <td class=\"nowrap\" data-sort=\"";
  if (stack1 = helpers.status) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span title=\"";
  if (stack1 = helpers.lastActionTime) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lastActionTime; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.status) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
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
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <span class=\"subject wrap\">";
  if (stack1 = helpers.subject) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.subject; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n        ";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n            <span class=\"subject wrap\">--</span>\n        ";
  }

  stack1 = helpers.each.call(depth0, depth0.messages, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });
templates['subscriptions'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<section id=\"subscriptions\">\n    <table>\n        <caption>\n            <form id=\"subscriptions-action\" class=\"action\">\n                <select id=\"subscriptions-select-action\">\n                    <option value=\"add-subscription\">Add subscription</option>\n                    <option value=\"delete-subscription\">Delete subscription</option>\n                </select>\n                <button type=\"submit\">Apply</button>\n                <fieldset id=\"add-subscription\" class=\"clearfix\">\n                    <p><label>Subscription label: <input type=\"text\" name=\"label\"></label></p>\n                    <p><label>Subscription address: <input type=\"text\" name=\"address\"></label></p>\n                </fieldset>\n            </form>\n            ";
  stack1 = self.invokePartial(partials.filter, 'filter', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </caption>\n        <thead>\n        <tr>\n            <th class=\"no-sort\"><input type=\"checkbox\" name=\"mark-all\"></th>\n            <th>Label</th>\n            <th>Address</th>\n            <th>Enabled</th>\n        </tr>\n        </thead>\n        <tbody></tbody>\n    </table>\n</section>";
  return buffer;
  });
templates['subscriptionsList'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr data-address=\"";
  if (stack1 = helpers.address) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <td class=\"mark-item\"><input type=\"checkbox\" name=\"mark\" value=\"";
  if (stack1 = helpers.address) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></td>\n    <td data-sort=\"";
  if (stack1 = helpers.label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"nowrap label\">";
  if (stack1 = helpers.label) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n    <td data-sort=\"";
  if (stack1 = helpers.address) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"nowrap address\">";
  if (stack1 = helpers.address) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.address; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n    <td data-sort=\"";
  if (stack1 = helpers.enabled) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.enabled; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><span class=\"enabled\">";
  if (stack1 = helpers.enabled) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.enabled; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n</tr>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.subscriptions, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
})();
