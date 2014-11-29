/* onElementResize.0.2.d.js */
//use requestAnimationFrame for smoothness (shimmed with setTimeout fallback)
window.rAF = window.rAF || (function(){
  return  window.requestAnimationFrame       ||
		  window.webkitRequestAnimationFrame ||
		  window.mozRequestAnimationFrame    ||
		  function( callback ){
		  		window.oldschool = true;
				window.setTimeout(callback, 1000 / 30);
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
					//(possibly this would never be ready so abort after x seconds)
					var now = new Date().getTime();
					var diff = now - ($el.data("timer") || now);
					if(diff>=10000){//taking too long (allow 10 seconds)
						if(console && console.warn){console.warn("onElementResize iFrame taking too long to load!");}
						return false;
					}
					$el.data("timer",now);
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
				//IE8 jumps to top(ish) EVERY TIME the css.height set/removed because the iframe collapses thus changes the depth of the page
				var cache_height = $el.prop('style').height;//if the el has a height cache it...
					cache_marginBottom= $el.prop('style').marginBottom;//for IE so that the overall height taken up by the iframe does not change whilst measuring

				$el.css("height","");//temp remove the css height whilst measuring
				if(iFrame){//if slow browser set the bottom margin so that the page doesnt bounce
					$el.css("margin-bottom",cache_height);
				}
				var currentWidth = Math.max(el.offsetWidth, el.scrollWidth),
					currentHeight = Math.max(el.offsetHeight, el.scrollHeight);
				if(cache_height){
					$el.css("height",cache_height);//...then put it back
					if(iFrame){$el.css("margin-bottom",cache_marginBottom);}//if slow browser reset the bottom margin
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