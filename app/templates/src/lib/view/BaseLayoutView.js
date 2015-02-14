var _ = require('lodash');
    Backbone = require('backbone');
    Marionette = require('backbone.marionette');
    Rivets = require('rivets'),
    BaseLayoutView;

BaseLayoutView = Marionette.LayoutView.extend({
    initialize: function(){
        if (!this.viewModel) {
            this.viewModel = new Backbone.Model();
        }
        this.viewModel.set('regionViews', new Backbone.Model());
    },

    activateRegion: function(regionName, view){
        this.viewModel.get('regionViews').set(regionName, view);
    },

    onRender: function(){
        this.binding = Rivets.bind(this.el, _.result(this, 'bindingContext'));
    },

    onClose: function(){
        if (this.binding != null) {
            this.unbind();
        }
    },

    bindingContext: function(){
        return {
            model: this.model,
            view: this,
            viewModel: this.viewModel
        };
    },

    getViewForRegion: function(regionName){
        return this.viewModel.get('regionViews').get(regionName);
    },

    updateRegion: function(el, regionName){
        var requiredView, region;
        requiredView = this.getViewForRegion(regionName);
        if (requiredView) {
            region = this.getRegion(regionName);
            if (!region) {
                region = this.addRegion(regionName, {
                    el: el
                });
            }
            if (region && requiredView) {
                if (region.currentView !== requiredView) {
                    region.show(requiredView);
                }
            }
        }
    },

    regionListen: function(el, regionName){
        this.listenTo(this.viewModel.get('regionViews'), "change:" + regionName, function(){
            this.updateRegion(el, regionName);
        });
    };
});

module.exports = BaseLayoutView;
