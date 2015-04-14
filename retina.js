/**
 * This file provides functionality to replace the images with their high-resolutioned counterpart.
 * All images have to be marked using the class specified in 'searchForClass'. Both the background
 * image source for usual elements and the source image for img tags will be replaced by their
 * @2x counterpart. After being processed, the 'searchForClass' class is replaced by the
 * 'markProcessedUsingClass' class.
 */

var retina = false, // will be set, if high-resolutioned device is detected
	searchForClass = 'retina',
	markProcessedUsingClass = 'is-high-resolution';


// Now CHECK if we need retina graphics
if (window['devicePixelRatio']!=undefined && window.devicePixelRatio>1 || location.href.indexOf('force-high-resolution', 0)!=-1)
	retina = true;
	
$(document).ready(function(){
	if (retina) retinafy($('.'+searchForClass));
});

function retinafy(set) {
	set.each(function(){
		var that = $(this),
			bg = that.css('background-image');
		if (bg.indexOf('.png')!=-1 || bg.indexOf('.jpg')!=-1 || bg.indexOf('.gif')!=-1) {
			var newBg = bg;
			newBg = newBg.replace('.png', '@2x.png');
			newBg = newBg.replace('.jpg', '@2x.jpg');
			newBg = newBg.replace('.gif', '@2x.gif');
			var newBgSrc = newBg.replace('url(', '');
			if (newBgSrc.substr(newBgSrc.length-1, 1)==')') newBgSrc = newBgSrc.substr(0, newBgSrc.length-1);
			var img = new Image();
			img.src = newBgSrc;
			img.onload = function(){
				var width = img.width/2.0,
					height = img.height/2.0;
				that.css({
					backgroundImage: newBg,
/*					width: width+'px',
					height: height+'px'*/
				});
				that.css('-webkit-background-size', width+'px '+height+'px');
				that.css('-moz-background-size', width+'px '+height+'px');
				that.css('-ms-background-size', width+'px '+height+'px');
				that.css('-o-background-size', width+'px '+height+'px');
				that.css('background-size', width+'px '+height+'px');						        
				that.addClass(markProcessedUsingClass).removeClass(searchForClass);
			}
		} else {
			var src = that.attr('src');
			if (src!=null && src!='') {
				var newSrc = src;
				newSrc = newSrc.replace('.png', '@2x.png');
				newSrc = newSrc.replace('.jpg', '@2x.jpg');
				newSrc = newSrc.replace('.gif', '@2x.gif');
				var img = new Image();
				img.src = newSrc;
				img.onload = function(){
					var width = img.width/2.0,
						height = img.height/2.0;
					that.attr('src',newSrc);
					that.attr('width',width).attr('height',height);
					that.addClass(markProcessedUsingClass).removeClass(searchForClass);
				}
			}
		}
	});
}