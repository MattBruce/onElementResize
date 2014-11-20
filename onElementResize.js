/*! OnElementResize 0.2
 * ==========================
 * @desc - 
 */  
 //use requestAnimationFrame for smoothness (shimmed with setTimeout fallback)
        window.requestAnimFrame = window.requestAnimFrame || (function(){
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
            var el = this;
            var $el = $(this),
                width = el.offsetWidth,
                height = el.offsetHeight;
            //set up a loop
            (function loop(){
                var currentWidth = el.offsetWidth,
                    currentHeight = el.offsetHeight;
                    if(currentWidth!==width || currentHeight!==height){
                        callback($el);
                    }
                width = currentWidth;
                height = currentHeight;
                requestAnimFrame(loop);
            })();//iife          
        })
        
    };
}(jQuery));



    $('.testItem').onElementResize(function($item){
        console.log($item[0].offsetWidth+"x"+$item.height());//use $item[0] if you want the normal js element $item for jquery
    });
