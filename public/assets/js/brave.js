/*
  Brave Front-end Framework
  https://github.com/brave/brave-website
*/

var Brave = Brave || window.Brave || { app: {} };

/*
  A reusable framework View
*/

(function() {

  Brave.View = function(params) {

    function View() {

      // All new instances should define a name, events hash, state, and properties
      // `state` refers to mutable params
      // `properties` refers to immutable params (not enforced)
      this.name = '';
      this.events = [];
      this.state = {};
      this.properties = {};

      // Shared View Utilities
      this.isMenuShown = function() {
        return !!$('#fullsize-menu')[0] && $('#fullsize-menu').hasClass('in');
      };

      this.isOverlayShown = function() {
        return $('#brave-overlay').hasClass('show');
      };

      this.isTargetElement = function(event, selector) {
        return ((event.target.id === selector) || (event.target.className === selector) || (event.target.parentElement && event.target.parentElement.className && event.target.parentElement.className === selector));
      };

      this.isHomePage = function() {
        return (window.location.pathname.match('index.html') || window.location.pathname === '/');
      };

      this.isPlatform = function(userAgent) {
        return (window.navigator.userAgent.match && window.navigator.userAgent.match(userAgent));
      };

      this.collapseHeader = function() {
        return $('.navbar-fixed-top').addClass('top-nav-collapse');
      };

      this.unCollapseHeader = function() {
        return $('.navbar-fixed-top').removeClass('top-nav-collapse');
      };

      this.hideOverlay = function() {
        $('body').removeClass('no-scroll');
        $('#brave-overlay').removeClass('show');
        setTimeout(function() {
          $('#brave-overlay').css('display', 'none');
        }, 500);
      };

      this.showOverlay = function() {
        $('#brave-overlay').css('display', 'block');
        setTimeout(function() {
          $('body').addClass('no-scroll');
          $('#brave-overlay').addClass('show');
        }, 100);
      };

      this.isNearPageTop = function() {
        return ($(window).scrollTop() < this.properties.bootstrap.offsetHeight);
      };

      this.unInvertHeader = function() {
        $('#brave-logo').removeClass('invert');
        $('.navbar-nav.brave-nav, .navbar-toggle').removeClass('home');
      };

      this.invertHeader = function() {
        $('#brave-logo').addClass('invert');
        $('.navbar-nav.brave-nav, .navbar-toggle').addClass('home');
      };

      this.off = function() {
        this.isOn = false;
        this.events.forEach(function(e, i) {
          $(e[0]).off(e[1]);
        }, this);
      };

      this.on = function() {
        this.isOn = true;
        this.events.forEach(function(e, i) {
          $(e[0]).on(e[1], this[e[2]].bind(this));
        }, this);
        return this.init();
      };

      // Bind initial events
      this.events.forEach(function(e, i) {
        $(e[0]).on(e[1], this[e[2]].bind(this));
      }, this);

      // Merge custom params
      for(var key in params) {
        this[key] = params[key];
      }

    }
    return new View;
  };

}());