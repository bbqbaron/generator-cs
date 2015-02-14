var $ = require('jquery'),
    Backbone = require('Backbone'),
    Rivets = require('rivets'),
    createCustomerRivetsFormatters = require('../lib/createCustomRivetsFormatters'),
    configureRivets = require('../lib/configureRivets');

Backbone.$ = $;
// modifies Rivets in place : /
require('rivets-backbone-adapter');
// execute more Rivets changes
configureRivets();
createCustomerRivetsFormatters();

var app = require('./app');

$(app.start);
