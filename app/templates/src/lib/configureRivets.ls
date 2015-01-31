require! 'rivets':Rivets

module.exports = !->
    # This passes the observed object as 'this', effectively making click callbacks sticky
    Rivets.configure { handler: (context, ev, binding) !-> @call binding.model, context, ev, binding }
