var _ = require('lodash'),
    Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    Radio = require('backbone.radio');

module.exports = function() {
    Marionette.Application.prototype._initChannel = function() {
        this.channelName = _.result(this, 'channelName') || 'global';
        this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
    }
}
