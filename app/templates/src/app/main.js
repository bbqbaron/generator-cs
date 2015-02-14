var $ = require('jquery'),
    Backbone = require('Backbone'),
    Rivets = require('rivets'),
    configureRivets = require('../lib/configureRivets');

Backbone.$ = $;
// modifies Rivets in place : /
require('rivets-backbone-adapter');
// execute more Rivets changes
configureRivets();

var app = require('./app');

$(app.start);
