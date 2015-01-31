require! {
    'jquery':$,
    'backbone':Backbone,
    'rivets':Rivets,
    '../lib/createCustomRivetsFormatters':createCustomerRivetsFormatters,
    '../lib/configureRivets':configureRivets }

Backbone.$ = $
# modifies Rivets in place : /
require 'rivets-backbone-adapter'
# execute more Rivets changes
configureRivets!
createCustomerRivetsFormatters!

require! './app'

$ app~start
