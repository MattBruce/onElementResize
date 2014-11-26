/* onElementResize.0.2.1.js */
//use requestAnimationFrame for smoothness (shimmed with setTimeout fallback)
window.rAF = window.rAF || (function(){
  return  window.requestAnimationFrame       ||
		  window.webkitRequestAnimationFrame ||
		  window.mozRequestAnimationFrame    ||
		  function( callback ){
			  window.setTimeout(callback, 1000 / 60);
		  };
})();

(function ($) {

	$.fn.onElementResize = function (callback) {
				
		return this.each(function () {
			var el = this,
				$el = $(el);
			/* if el is an iframe we need to target the body or html rather than the element itself 
			Apparently IE has issues (unsurprisingly) so we may have to use an inline onload event for the iframe
			http://stackoverflow.com/questions/4955076/jquery-iframe-body-selector */
			var iFrame = (el.tagName.toLowerCase()=="iframe");
			if(iFrame){
				//IFRAME might not be loaded!
				if (!$el.contents().find('body').children().length > 0) {
					//console.warn("iframe not ready");
					return $el.load(function(){$el.onElementResize(callback);});
				}
				//set el to be the iframe            
				el = $el.contents().find("html")[0];//might be dodgy for IE
				//console.log("EL",el);
			}
			//measure the inital size:
			var width = Math.max(el.offsetWidth, el.scrollWidth),
				height = Math.max(el.offsetHeight, el.scrollHeight);
			//trigger initial resize on load by trickery
			if(iFrame){
				width = width-1;
				height= height-1;
			}
			//set up a loop
			(function loop(){

				var cache = $el.prop('style').height;//if the el has a height cache it...
				$el.css("height","");//temp remove the css height whilst measuring
				var currentWidth = Math.max(el.offsetWidth, el.scrollWidth),
					currentHeight = Math.max(el.offsetHeight, el.scrollHeight);
				if(cache){
					$el.css("height",cache);//...then put it back
				}
				if(currentWidth!==width || currentHeight!==height){
					callback($el, currentWidth, currentHeight);
				}
				width = currentWidth;
				height = currentHeight;
				rAF(loop);
			})();//iife
		})

	};
}(jQuery));
