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

    delete Rivets.adapters['.'];

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
