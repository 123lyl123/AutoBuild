;
(function() {
	/**
	 * [test css和js资源加载器]
	 * @type {[type]}
	 */
	Modernizr.load({
		test: Modernizr.geolocation,
		yep: 'js/geo.js',
		nope: 'js/geo-polyfill.js'
	});

	Modernizr.load([{
		load: '../../jquery-1.11.0.js',
		complete: function() {
			if (!window.jQuery) {
				Modernizr.load('../../jquery-1.11.0.js');
			}else{
				/**
				 * 功能特征检测
				 */
				Modernizr.addTest('hasJquery', 'jQuery' in window);
			}
		}
	}, {
		// This will wait for the fallback to load and
		// execute if it needs to.
		load: 'js/needs-jQuery.js'
	}]);

	
})();