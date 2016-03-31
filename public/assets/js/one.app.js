/*
 * Template Name: Unify - Responsive Bootstrap Template
 * Description: Business, Corporate, Portfolio and Blog Theme.
 * Version: 1.8
 * Author: @htmlstream
 * Website: http://htmlstream.com
*/

/* Modified */

var App;

(function() {

  App = {

    platforms: [
      { name: 'Linux x64, Ubuntu', userAgent: 'Linux|Ubuntu', url: 'https://laptop-updates.brave.com/latest/linux64' },
      { name: 'Mac OS 10.7', userAgent: 'Macintosh', url: 'https://laptop-updates.brave.com/latest/osx' },
      { name: 'Windows 7', userAgent: 'Windows', url: 'https://laptop-updates.brave.com/latest/winx64' },
      { name: 'iOS 7', userAgent: 'iPhone|iPod|iPad', url: 'https://itunes.apple.com/us/app/brave-web-browser/id1052879175' },
      { name: 'Android 4.1', userAgent: 'Android', url: 'https://play.google.com/store/apps/details?id=com.linkbubble.playstore' }
    ],

    bootstrap: {

      offsetHeight: 116,

      carousel: { interval: 15000 },

      tooltips: [
        { selector: '.tooltips', className: '' },
        { selector: '.tooltips-show', className: 'show' },
        { selector: '.tooltips-hide', className: 'hide' },
        { selector: '.tooltips-toggle', className: 'toggle' },
        { selector: '.tooltips-destroy', className: 'destroy' }
      ],

      popovers: [
        { selector: '.popovers', className: '' },
        { selector: '.popovers-show', className: 'show' },
        { selector: '.popovers-hide', className: 'hide' },
        { selector: '.popovers-toggle', className: 'toggle' },
        { selector: '.popovers-destroy', className: 'destroy' }
      ]

    },

    toggleVideoButton: function() {
      if($('#brave-overlay').hasClass('show')) {
        $('body').removeClass('no-scroll');
        $('#brave-overlay').removeClass('show');
        setTimeout(function() {
          $('#brave-overlay').css('display', 'none');
        }, 500);
        return;
      }
      $('#brave-overlay').css('display', 'block');
      setTimeout(function() {
        $('body').addClass('no-scroll');
        $('#brave-overlay').addClass('show');
      }, 100);
    },

    handleValignMiddle: function() {
      $('.valign__middle').each(function() {
        $(this).css('padding-top', $(this).parent().height() / 2 - $(this).height() / 2);
      });
      $(window).resize(function() {
        $('.valign__middle').each(function() {
          $(this).css('padding-top', $(this).parent().height() / 2 - $(this).height() / 2);
        });
      });
    },

    handleVideoButton: function(event) {
      if((event.target.id !== 'brave-overlay') && (event.target.id !== 'brave-video')) {
        return false;
      }
      return this.toggleVideoButton();
    },

    listenToDownloadButton: function(url) {
      $('#brave-download').click(function(event) {
        return window.location.href = url;
      });
    },

    listenToVideoButton: function() {
      return $('#brave-video, #brave-overlay').click(this.handleVideoButton.bind(this));
    },

    configureDownloadButton: function(platform, index) {
      if(this.isPlatform(platform.userAgent)) {
        $('.control-group').find('.label').not('a').html('For ' + platform.name + ' or later.');
        this.listenToDownloadButton(platform.url);
      }
    },

    reactToUserAgent: function(platforms) {
      var buttons = $('.brave-hero').find('.btn').remove();
      this.listenToDownloadButton('https://github.com/brave/browser-laptop/releases');
      platforms.forEach(this.configureDownloadButton.bind(this), buttons);
    },

    isPlatform: function(userAgent) {
      return (window.navigator.userAgent.match && window.navigator.userAgent.match(userAgent));
    },

    initCounter: function() {
      jQuery('.counter').counterUp({
        delay: 10,
        time: 1000
      });
    },

    initParallaxBg: function() {
      $(window).load(function() {
        jQuery('.parallaxBg').parallax('50%', 0.4);
        jQuery('.parallaxBg1').parallax('50%', 0.2);
      });
    },

    initParallaxBg2: function() {
      $(window).load(function() {
        jQuery('.parallaxBg').parallax('50%', '50%');
      });
    },

    initHeader: function() {
      if(window.location.pathname.match('index.html')) {
        $('#brave-logo').attr('src', 'assets/img/brave_logo_horz_reversed.svg');
        $('.navbar-nav.brave-nav').addClass('home');
      }
      else {
        $('#brave-logo').attr('src', 'assets/img/brave_logo_horz.svg');
      }
      $(window).scroll(function() {
        if ($('.navbar').offset().top > 150) {
          $('.navbar-fixed-top').addClass('top-nav-collapse');
          $('#brave-logo').attr('src', 'assets/img/brave_logo_horz.svg');
        } else {
          $('.navbar-fixed-top').removeClass('top-nav-collapse');
          if(window.location.pathname.match('index.html')) {
            $('#brave-logo').attr('src', 'assets/img/brave_logo_horz_reversed.svg');
          }
        }
      });
      $('body').scrollspy({ offset: this.bootstrap.offsetHeight + 1 });
      $(function() {
        $('.page-scroll a, .scroll-button').bind('click', function(event) {
          var $anchor = $(this);
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - this.bootstrap.offsetHeight
          }, 1500, 'easeInOutExpo');
          event.preventDefault();
        });
      });
      $(window).scroll(function() {
        $('.navbar-collapse.in').collapse('hide');
      });
    },

    initBootstrapUI: function() {
      if(this.bootstrap.carousel.interval > 0) {
        jQuery('.carousel').carousel({
          interval: this.bootstrap.carousel.interval,
          pause: 'hover'
        });
      }
      this.bootstrap.tooltips.forEach(function(t, i) {
        jQuery(t.selector).tooltip(t.className.length > 1 ? t.className : null);
      });
      this.bootstrap.popovers.forEach(function(p, i) {
        jQuery(p.selector).popover(p.className.length > 1 ? p.className : null);
      });
    },

    init: function(params) {
      this.initHeader();
      this.initBootstrapUI();
      this.reactToUserAgent(this.platforms);
      this.handleValignMiddle();
      this.listenToVideoButton();
      return this;
    }

  };

}());
