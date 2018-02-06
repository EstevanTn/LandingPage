var Tunaqui, jQuery, parallax, tnq;

jQuery = require('jquery');

global.$ = jQuery;

global.jQuery = jQuery;

parallax = require('jquery-parallax.js');

Tunaqui = class Tunaqui {
  construct() {
    return this;
  }

  scroll() {
    return $(window).scroll(function() {
      var scrollTop;
      scrollTop = $(window).scrollTop();
      if (scrollTop > 250) {
        return $('.social_icons').removeClass('d-none');
      } else {
        return $('.social_icons').addClass('d-none');
      }
    });
  }

};

module.exports = Tunaqui;

tnq = new Tunaqui();

tnq.scroll();
