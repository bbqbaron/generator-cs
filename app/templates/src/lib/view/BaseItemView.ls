require! {'lodash':_, 'backbone':Backbone, 'backbone.marionette':Marionette, 'rivets':Rivets}

module.exports = Marionette.ItemView.extend {
    onRender: !~> @binding = Rivets.bind @el, _.result @, 'bindingContext'

    onClose: !~> @binding?.unbind!

    bindingContext: ~> { model: @model, view: @, viewModel: @viewModel }
}
