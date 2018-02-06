jQuery = require 'jquery'
global.$ = jQuery
global.jQuery = jQuery
parallax = require 'jquery-parallax.js'

class Tunaqui
    construct: ->
        return @
    scroll: ->
        $(window).scroll ->
            scrollTop = $(window).scrollTop()
            if scrollTop > 250
                $('.social_icons').removeClass 'd-none'
            else
                $('.social_icons').addClass 'd-none'
                
        
module.exports = Tunaqui

tnq = new Tunaqui()
tnq.scroll()