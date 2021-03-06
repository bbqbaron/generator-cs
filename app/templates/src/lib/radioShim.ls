require! {'lodash':_, 'backbone':Backbone, 'backbone.marionette':Marionette,
    'backbone.radio': Radio}

module.exports = !->
    Marionette.Application.prototype._initChannel = !->
        @channelName = (_.result @, 'channelName') or 'global'
        @channel = (_.result @, 'channel') or Radio.channel @channelName
