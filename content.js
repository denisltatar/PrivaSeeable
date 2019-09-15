var elements = document.getElementsByTagName('P');
var textlength = elements.length;
var flip = false;
/*
function toggler() {

  if (flip === false) {
    randomizer();
    flip = true;
  }else if (flip === true) {
    location.reload(false);
    flip = false;
  }
}
*/
function randomizer(){
	for(var i = 0; i < textlength; ++i) {
		var element = elements[i];

		for(var j = 0; j < element.childNodes.length; ++j){
			var  node = element.childNodes[j];

			var yeet = ['Xloremx', 'Xmaox', 'Xipsumx', 'Xdongerasx', 'Xdolorx',
			'Xyeetx','Xtarantinox','Xkawabungax','XflamzX', 'XitetsiX', 'XcordonizyX'];
			var rand = yeet[Math.floor(Math.random() * yeet.length)];
			if(node.nodeType === 3){     var text = node.nodeValue;     var
			replacedText = text.replace(/ /g, (" " + rand + " "));
				if (replacedText != text){
					element.replaceChild(document.createTextNode(replacedText), node);
				}
			}
		}
	}
}

chrome.runtime.onMessage.addListener(function(request) {
    if(request.action === 'executeCode') {
    	console.log("pressed")
    	randomizer()
    }
    if(request.action === 'de-executeCode'){

    	location.reload(false);
    }
});