# TODO is it best to do this, or to override some internal _itemViewClass var
# on Marionette.LayoutView? We don't need Rivets to bind to regions
require! {'lodash':_, 'backbone':Backbone, 'backbone.marionette':Marionette, 'rivets':Rivets}

class BaseLayoutView extends Marionette.LayoutView
    onRender: !~> @binding = Rivets.bind @el, _.result @, 'bindingContext'

    onClose: !~> @binding?.unbind!

    bindingContext: ~> { model: @model, view: @, viewModel: @viewModel }

module.exports = BaseLayoutView
