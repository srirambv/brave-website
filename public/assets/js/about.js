/*
  Brave Front-end Framework
  https://github.com/brave/brave-website
*/

var Brave = Brave || window.Brave || { app: {} };

/*
  About View
*/

(function() {

  Brave.app.about = new Brave.View({

    name: 'about',

    events: [
      [window, 'scroll', 'handleScroll']
    ],

    properties: {

      hasPhotographicHeader: true,

      bootstrap: {
        offsetHeight: 116
      }

    },

    handleScroll: function(event) {
      if(this.isNearPageTop()) {
        this.unCollapseHeader();
        if(this.properties.hasPhotographicHeader) {
          requestAnimationFrame(this.invertHeader.bind(this));
        }
      }
      else {
        this.collapseHeader();
        if(this.properties.hasPhotographicHeader) {
          requestAnimationFrame(this.unInvertHeader.bind(this));
        }
      }
    },

    init: function() {
      return this.invertHeader();
    }

  });

}());
