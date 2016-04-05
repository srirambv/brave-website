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

      // Merge custom params
      for(var key in params) {
        this[key] = params[key];
      }

      // Bind listeners in events hash
      this.events.forEach(function(e, i) {
        $(e[0]).on(e[1], this[e[2]].bind(this));
      }, this);

    }
    return new View;
  };

}());