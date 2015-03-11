var _ = require('lodash'),
    Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    Rivets = require('rivets'),
    BaseItemView;

BaseItemView = Marionette.ItemView.extend({
    initialize: function() {
        if (this.viewModel == null) {
            this.viewModel = new Backbone.Model();
        }
    },

    behaviors: {
        RvFocus: {
            behaviorClass: require('../../lib/behavior/RvFocus')
        }
    },

    onRender: function() {
        this.binding = Rivets.bind(this.el, _.result(this, 'bindingContext'));
    },

    onClose: function() {
        if (this.binding != null) {
            this.binding.unbind();
        }
    },

    bindingContext: function() {
        return {
            view: this,
            viewModel: this.viewModel,
            model: this.model
        }
    }
});

module.exports = BaseItemView
