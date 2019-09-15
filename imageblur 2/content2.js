
	var elements = document.getElementsByTagName('*');
	var textlength = elements.length;
	var flip = false;
	chrome.runtime.onMessage.addListener(function(request) {
    if(request.action === 'executeCode') {
    	randomizer();
    }
});

	function toggler() {


	  if (flip == false) {
	    randomizer();
	    flip = true;
	  }else if (flip ==true) {
	    randomizer();//fix
	    flip = false;
	  }

	}
	function randomizer(){
		for(var i = 0; i < textlength; ++i) {
			var element = elements[i];

			for(var j = 0; j < element.childNodes.length; ++j){
				var  node = element.childNodes[j];

				var yeet = ['Lorem', 'lmao', 'ipsum', 'dongeras', 'dolor', 'yeet'];
				var rand = yeet[Math.floor(Math.random() * yeet.length)];

				if(node.nodeType === 3){
					var text = node.nodeValue;
					var replacedText =  text.replace(" ", (" " + rand + " "));

					if (replacedText !== text){
						element.replaceChild(document.createTextNode(replacedText), node);
					}
				}
			}
	}
		
	}

