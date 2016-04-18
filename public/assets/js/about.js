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

        interval: 6000,

        duration: 500,

        timeout: 1000

      },

      bootstrap: {
        offsetHeight: 116
      }

    },

    resizeTeamImages: function(event) {
      return $('.team-img').height($('.team-img').width());
    },

    stopCarousel: function() {
      clearInterval(this.state.interval);
    },

    startCarousel: function() {
      this.state.interval = setInterval(this.tick.bind(this), this.properties.carousel.interval);
    },

    tick: function() {
      $('#press-carousel').children().each(function(i, e) {
        if($(e).hasClass('active')) {
          $(e).addClass('inactive');
          setTimeout(function() {
            $(e).removeClass('inactive').removeClass('active').css({ display: 'none' });
            $('#press-carousel').append($('#press-carousel').children().first());
          }, this.properties.carousel.duration);
        }
        else {
          $(e).css({ display: 'block' });
          setTimeout(function() {
            $(e).addClass('active');
          }, this.properties.carousel.duration);
        }
      }.bind(this));
    },

    handleArrowClick: function(event) {
      this.cooldown('.arrow', this.properties.carousel.timeout);
      this.stopCarousel();
      this.tick();
      setTimeout(this.startCarousel.bind(this), this.properties.carousel.duration);
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
      this.startCarousel();
      this.resizeTeamImages();
      return this.handleScroll();
    }

  });

}());
