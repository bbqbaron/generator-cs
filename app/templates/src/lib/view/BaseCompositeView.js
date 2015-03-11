var _ = require('lodash'),
    Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    Rivets = require('rivets'),
    BaseCompositeView;

BaseCompositeView = Marionette.CompositeView.extend({
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

    onRenderTemplate: function() {
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

module.exports = BaseCompositeView
