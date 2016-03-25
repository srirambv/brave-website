/*
 * Template Name: Unify - Responsive Bootstrap Template
 * Description: Business, Corporate, Portfolio and Blog Theme.
 * Version: 1.8
 * Author: @htmlstream
 * Website: http://htmlstream.com
*/

var App = function() {

  function handleBootstrap() {
    /*Bootstrap Carousel*/
    jQuery('.carousel').carousel({
      interval: 15000,
      pause: 'hover'
    });

    /*Tooltips*/
    jQuery('.tooltips').tooltip();
    jQuery('.tooltips-show').tooltip('show');
    jQuery('.tooltips-hide').tooltip('hide');
    jQuery('.tooltips-toggle').tooltip('toggle');
    jQuery('.tooltips-destroy').tooltip('destroy');

    /*Popovers*/
    jQuery('.popovers').popover();
    jQuery('.popovers-show').popover('show');
    jQuery('.popovers-hide').popover('hide');
    jQuery('.popovers-toggle').popover('toggle');
    jQuery('.popovers-destroy').popover('destroy');
  }

  var handleFullscreen = function() {
    var WindowHeight = $(window).height();

    if ($(document.body).hasClass("promo-padding-top")) {
      HeaderHeight = $(".header").height();
    } else {
      HeaderHeight = 0;
    }

    $(".fullheight").css("height", WindowHeight - HeaderHeight);

    $(window).resize(function() {
      var WindowHeight = $(window).height();
      $(".fullheight").css("height", WindowHeight - HeaderHeight);
    });
  }

  // handleLangs
  function handleLangs() {
    $(".lang-block").click(function() {
      console.log("click!");
    });
  }

  var handleValignMiddle = function() {
    $(".valign__middle").each(function() {
      $(this).css("padding-top", $(this).parent().height() / 2 - $(this).height() / 2);
    });
    $(window).resize(function() {
      $(".valign__middle").each(function() {
        $(this).css("padding-top", $(this).parent().height() / 2 - $(this).height() / 2);
      });
    });
  }

  function handleHeader() {
    //jQuery to collapse the navbar on scroll
    $(window).scroll(function() {
      if ($(".navbar").offset().top > 150) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
      } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
      }
    });

    var offsetHeight = 116;
    $('body').scrollspy({
      offset: offsetHeight + 1
    });

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function() {
      $('.page-scroll a, .scroll-button').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top - offsetHeight
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
      });
    });

    //Collapse Navbar When It's Clickicked
    $(window).scroll(function() {
      $(".navbar-collapse.in").collapse('hide');
    });
  }

  function isPlatform(userAgent) {
    return !!window.navigator.userAgent.match && window.navigator.userAgent.match(userAgent);
  }

  function listenToDownloadButton(url) {
    $('#brave-download').click(function(event) {
      return window.location.href = url;
    });
  }

  function listenToVideoButton() {
    return $('#brave-video, #brave-overlay').click(handleVideoButton);
  }

  function toggleVideoButton() {
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
  }

  function configureDownloadButton(platform, index) {
    if(isPlatform(platform.userAgent)) {
      $('.control-group').find('.label').not('a').html('For ' + platform.name + ' or later.');
      listenToDownloadButton(platform.url);
    }
  }

  function handleUserAgent(platforms) {
    var buttons = $('.brave-hero').find('.btn').remove();
    listenToDownloadButton('https://github.com/brave/browser-laptop/releases');
    platforms.forEach(configureDownloadButton, buttons);
  }

  function handleVideoButton(event) {
    if((event.target.id !== 'brave-overlay') && (event.target.id !== 'brave-video')) {
      return false;
    }
    return toggleVideoButton();
  }

  return {

    platforms: [
      { name: 'Linux x64, Ubuntu', userAgent: 'Linux|Ubuntu', url: 'https://laptop-updates.brave.com/latest/linux64' },
      { name: 'Mac OS 10.7', userAgent: 'Macintosh', url: 'https://laptop-updates.brave.com/latest/osx' },
      { name: 'Windows 7', userAgent: 'Windows', url: 'https://laptop-updates.brave.com/latest/winx64' },
      { name: 'iOS 7', userAgent: 'iPhone|iPod|iPad', url: 'https://itunes.apple.com/us/app/brave-web-browser/id1052879175' },
      { name: 'Android 4.1', userAgent: 'Android', url: 'https://play.google.com/store/apps/details?id=com.linkbubble.playstore' }
    ],

    init: function() {
      handleUserAgent(this.platforms);
      handleHeader();
      handleBootstrap();
      //handleLangs();
      handleFullscreen();
      handleValignMiddle();
      listenToVideoButton();
    },

    initCounter: function() {
      jQuery('.counter').counterUp({
        delay: 10,
        time: 1000
      });
    },

    initParallaxBg: function() {
      $(window).load(function() {
        jQuery('.parallaxBg').parallax("50%", 0.4);
        jQuery('.parallaxBg1').parallax("50%", 0.2);
      });
    },

    initParallaxBg2: function() {
      $(window).load(function() {
        jQuery('.parallaxBg').parallax("50%", "50%");
      });
    },

  };

}();
