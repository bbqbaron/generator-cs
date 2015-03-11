var Marionette = require('backbone.marionette');

module.exports = OnShowRivets = Marionette.Behavior.extend({
	onShow: function() {
		this.$('[rv-focus]').focus();
	}
})