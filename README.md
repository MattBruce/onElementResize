onElementResize
===============

A jQuery plugin to watch for resizing of any element.

    $(function(){
        $('.testItem').onElementResize(function($el,w,h){
			//do something
			console.log("#"+$el.attr("id")+" resized to: "+w+"x"+h+".");
        });
    });

[http://jsfiddle.net/moob/mke5o981/11](http://jsfiddle.net/moob/mke5o981/11)
