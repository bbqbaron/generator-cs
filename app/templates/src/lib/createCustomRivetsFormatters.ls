require! 'rivets':Rivets

module.exports = !->
    Rivets.formatters.'!' = (x) -> !x
