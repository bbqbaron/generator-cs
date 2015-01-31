require! {'lodash':_, 'backbone':Backbone, 'backbone.marionette':Marionette, 'rivets':Rivets}

module.exports = Backbone.Marionette.CompositeView.extend {
    # override to call Rivet bindings before rendering children, to keep your grubby hands off their bindings
    render: ~>
        @_ensureViewIsIntact!
        @isRendered = true
        @resetChildViewContainer!

        @triggerMethod 'before:render', @

        @_renderTemplate!

        @binding = Rivets.bind @el, _.result @, 'bindingContext'

        @_renderChildren!

        @triggerMethod 'render', @

        @

    onClose: !~> @binding?.unbind!

    bindingContext: ~>
        { collection: @collection,
            model: @model,
            view: this,
            viewModel: @viewModel }
}
