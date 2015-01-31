require! {'lodash':_, 'backbone':Backbone, 'backbone.marionette':Marionette, 'rivets':Rivets}

module.exports = Marionette.CollectionView.extend {
    # If you apply Rivets bindings after render, it wipes out the child views
    onBeforeRender: !~> @binding = Rivets.bind @el, _.result @, 'bindingContext'

    onClose: !~> @binding?.unbind!

    bindingContext: ~> {view: @, viewModel: @viewModel}
}
