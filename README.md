onElementResize
===============

A jQuery plugin to watch for resizing of any element.

    $(function(){
        $('.testItem').onElementResize(function($item){
			console.log($item[0].offsetWidth+"x"+$item.height());//use $item[0] if you want the normal js element $item for jquery
        });
    });

[http://jsfiddle.net/moob/mke5o981/](http://jsfiddle.net/moob/mke5o981/)
