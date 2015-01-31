require! {'lodash':_, 'backbone':Backbone, 'backbone.marionette':Marionette, 'rivets':Rivets}

class BaseItemView extends Marionette.ItemView
    onRender: !~> @binding = Rivets.bind @el, _.result @, 'bindingContext'

    onClose: !~> @binding?.unbind!

    bindingContext: ~> { model: @model, view: @, viewModel: @viewModel }

module.exports = BaseItemView
