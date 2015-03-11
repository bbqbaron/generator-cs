var _ = require('lodash'),
    Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    Rivets = require('rivets'),
    BaseCollectionView;

BaseCollectionView = Marionette.CollectionView.extend({
    initialize: function(options) {
        if (this.viewModel == null) {
            this.viewModel = new Backbone.Model();
        }
    },

    behaviors: {
        RvFocus: {
            behaviorClass: require('../../lib/behavior/RvFocus')
        }
    },

    onBeforeRender: function() {
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
            viewModel: this.viewModel
        }
    }

});

module.exports = BaseCollectionView
