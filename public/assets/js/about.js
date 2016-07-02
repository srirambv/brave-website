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
      [window, 'scroll', 'handleScroll'],
      [window, 'resize', 'resizeTeamImages'],
      ['.arrow', 'click', 'handleArrowClick']
    ],

    properties: {

      hasPhotographicHeader: true,

      carousel: {

        index: 1,

        length: 4,

        // set interval to 0 to disable auto-pagination,
        // otherwise 1000 is a reasonable minimum
        interval: 0,

        duration: 500,

        timeout: 1000

      },

      bootstrap: {
        offsetHeight: 116
      }

    },

    makeSlideActive: function(index, element) {
      $(element).css({ display: 'block' });
      this.state.timeout = setTimeout(function() { $(element).addClass('active'); }, this.properties.carousel.duration);
      return element;
    },

    makeSlideInactive: function(index, element) {
      return $(element).removeClass('inactive').removeClass('active').css({ display: 'none' });
    },

    resizeTeamImages: function(event) {
      return $('.team-img').height($('.team-img').width());
    },

    stopCarousel: function() {
      return clearInterval(this.state.interval);
    },

    startCarousel: function() {
      this.state.interval = setInterval(this.tick.bind(this), this.properties.carousel.interval);
      return this.state.interval;
    },

    tick: function() {
      var index = this.properties.carousel.index++;
      $('#press-carousel').children().each(this.makeSlideInactive.bind(this));
      this.makeSlideActive(index, $('#press-carousel')[0].children[index]);
      if(index === (this.properties.carousel.length - 1)) {
        this.properties.carousel.index = 0;
      }
      return this.state.timeout;
    },

    handleArrowClick: function(event) {
      this.cooldown('.arrow', this.properties.carousel.timeout);
      this.stopCarousel();
      this.tick();
      if(this.properties.carousel.interval > 0) {
        setTimeout(this.startCarousel.bind(this), this.properties.carousel.duration);
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
      if(this.properties.carousel.interval > 0) {
        this.startCarousel();
      }
      this.resizeTeamImages();
      return this.handleScroll();
    }

  });

}());
