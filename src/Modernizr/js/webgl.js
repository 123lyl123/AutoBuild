(function() {
	Modernizr.load({
	    test: Modernizr.webgl,
	    yep : 'three.js',
	    nope: 'jebgl.js' 
	});
})();