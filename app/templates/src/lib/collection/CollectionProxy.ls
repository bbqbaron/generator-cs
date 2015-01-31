require! { 'lodash':_, 'backbone':Backbone }

# I wish I had lua metatables for this
CollectionProxy = Backbone.Collection.extend {
    initialize: (options) !~>
        @_master = options.collection
        delete options.collection

        @_filter = options.filter
        delete options.filter

        Backbone.Collection.prototype.initialize.call @, options

        @_updateFromMaster!

        @listenTo @_master, 'add remove reset', @_updateFromMaster

    _proxyReset: !~>
        Backbone.Collection.prototype.reset.apply @, arguments

    _updateFromMaster: !~>
        @_proxyReset @_master.where @_filter

    add: (models, options) !~>
        Backbone.Collection.prototype.add.call @, models, options

        @_master.add models, options

    fetch: !-> throw "read-only"
    push: !-> throw "read-only"
    pop: !-> throw "read-only"
    remove: !-> throw "read-only"
    shift: !-> throw "read-only"
    sort: !-> throw "read-only"
    unshift: !-> throw "read-only"

    _masterAddMergeOnly: (models, options) !~>
        _options = _.cloneDeep options

        _options.remove = false

        @_master.set models, _options

    reset: (models, options) !~>
        Backbone.Collection.prototype.reset.call @, models, options

        @_masterAddMergeOnly models, options

    set: (models, options) !->
        Backbone.Collection.prototype.set.call @, models, options

        @_masterAddMergeOnly models, options
}

module.exports = CollectionProxy
