require! { 'jquery':$, 'backbone':Backbone, 'rivets':Rivets,
    './lib/configureRivets':configureRivets,
    './lib/createCustomRivetsFormatters':createCustomerRivetsFormatters }

Backbone.$ = $
# modifies Rivets in place : /
require 'rivets-backbone-adapter'
# execute more Rivets changes
configureRivets!
createCustomerRivetsFormatters!

require! './app/MainApp'

$ MainApp.start
