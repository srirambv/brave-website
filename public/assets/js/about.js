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

    events: [],

    hasPhotographicHeader: true,

    init: function() {
    	//window.location.href = '/';
    	return this;
    }

  });

}());
