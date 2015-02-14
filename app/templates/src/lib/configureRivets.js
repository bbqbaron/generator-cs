var _ = require('lodash'),
    Rivets = require('rivets');

module.exports = function() {
    // This passes the observed object as 'this', effectively making click callbacks sticky
    // TODO if the user is using bound methods, is this redundant? where should the expectation lie?
    Rivets.configure({ handler: function(context, ev, binding){ this.call(binding.model, context, ev, binding);}});

    // TODO this doesn't _only_ get functions; perhaps this should be the '.' definition
    Rivets.adapters['>'] = {
        get: function(obj, keypath) { return obj[keypath]; },
        set: function() { },
        observe: function() { },
        unobserve: function () { }
    }

    // http://softgpl.com/libs/js/rivets.ie7.js
    /* IE7 does not support Object.defineProperty...  So we just add
    * properties directly to the object, and add getter and setters
    * as just functions
    */
    // TODO i think this means that raw updates to properties won't trigger the crappy IE8 observer
    // probably wise to just set these to read-only one-time gets with no subscribe functionality,
    // since we should be putting dependency logic in templates.
    // this is only here to support binding context access, and you should _never_ change base binding context

    // TODO alternately, we could just require all bindings to start with an explicit :,
    // and make all binding contexts backbone models : ).
    // and then disable the . adapter

    Rivets.adapters['.'].weakReference = function(obj) {
        if (obj[this.id] == null) {
            id = this.counter++;
        }
        this.weakmap[id] = {
            callbacks: {}
        };
        obj[this.id] = id;
        return this.weakmap[obj[this.id]];
    }

    Rivets.adapters['.'].subscribe = function(obj, keypath, callback) {
        callbacks = this.weakReference(obj).callbacks;
        if (callbacks[keypath] == null) {
            callbacks[keypath] = [];
            value = obj[keypath];
            setter = {
                get: function() { return value },
                set: _.bind(function (newValue) {
                    if (newValue !== value) {
                        value = newValue;
                        _.each(callbacks[keypath], function(callback) {
                            callback();
                        });
                    }
                    this.observeMutations(newValue, obj[this.id], keypath);
                }, this)
            }
            value.set = setter.set;
            value.get = setter.get;
        }
    };

    Rivets.formatters['!'] = function(x) { return !x; };

    // TODO this binder requires explicit view support and is not very useable
    // better to have an rv-on-show, and fire that event to Rivets
    Rivets.binders.focus = function (el, value) {
        el.focus();
    };

    onEnter = function(t) {
        return function(e) {
            if (e.keyCode === 13) {
                t.view.models.view.addCharacter();
            }
        }
    };

    Rivets.binders.enter = {
        function: true,

        bind: function (el) {
            el.addEventListener('keydown', onEnter(this));
        },

        unbind: function(el) {
            el.removeEventListener('keydown', onEnter(this));
        }
    };

    Rivets.binders['region'] = {
        bind: function(el) {
            var v = this.view.models.view;
            v.updateRegion(el, this.keypath);
            v.regionListen(el, this.keypath);
        }
    };
};
