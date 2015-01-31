# TODO make these classes
# TODO BaseLayoutView that just uses BaseItemView?
# TODO these belong in a bower package that gets used in the scaffold
require! {'lodash':_, 'backbone':Backbone, 'backbone.marionette':Marionette, 'rivets':Rivets}

class BaseCollectionView extends Marionette.CollectionView
    # If you apply Rivets bindings after render, it wipes out the child views
    onBeforeRender: !~> @binding = Rivets.bind @el, _.result @, 'bindingContext'

    onClose: !~> @binding?.unbind!

    bindingContext: ~> {view: @, viewModel: @viewModel}

module.exports = BaseCollectionView
