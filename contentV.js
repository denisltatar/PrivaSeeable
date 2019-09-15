"use strict";


(function(){
	chrome.storage.sync.get(['blurAmount'], function(values){
		window.imageBlurOpacityAmount = 5;
	});

	function blur(image) {
		if (image.id != window.cloneImageId) {
		  image.style.filter = `blur(${window.imageBlurOpacityAmount}px) opacity(1)`;
	  }
	}

	function show(image) {
		if (image.id != window.cloneImageId) {
		  image.style.filter = "opacity(1)";
	  }
	}

	function cover() {
		const images = document.querySelectorAll('p, li, h1, h2, h3');
		for (const image of images) {
			  blur(image);
	  }
	  window.imageBlurState = "blurred";
	}

	function uncover() {
		const images = document.querySelectorAll('p, li, h1, h2, h3');
		for (const image of images) {
	    	show(image);
	  }
	  window.imageBlurState = "revealed";
	}

	function reveal(e) {
		if (window.imageBlurState === "blurred") {
		    if (e.ctrlKey) {
				e.preventDefault();
				e.stopPropagation();
		        show(e.target);
			}
		}
	}

	function unreveal(e) {
		if (window.imageBlurState === "blurred") {
			blur(e.target);
		}
	}

	function initialLoadRevealAll() {
		const images = document.querySelectorAll('p, li, h1, h2, h3');
		for (const image of images) {
			if (image.dataset.imageBlurOnLoadUpdateOccured != "true"
		      && image.id != window.cloneImageId) {
	    		show(image);
	    		image.addEventListener('click', reveal);
				image.addEventListener('mouseout', unreveal);
	    		image.dataset.imageBlurOnLoadUpdateOccured = true;
	    	}
	  	}
	  	window.imageBlurState = "revealed";
	}

	function onPageLoad(e) {
		chrome.storage.sync.get(['blurAmount'], function(values)
		{
			if (!values.blurOnDefault) {
				initialLoadRevealAll();
			}
		});
	}

	function addMaskDivToPage(){
		window.maskDivId = "imageBlur-mask-div";
		const maskDiv = document.createElement("div");
		maskDiv.style = "position:absolute;";
		maskDiv.id = window.maskDivId;
		document.body.appendChild(maskDiv);
	}

	document.addEventListener('DOMContentLoaded', function(e) {
		addMaskDivToPage();
		onPageLoad(e);
		document.addEventListener('DOMNodeInserted', onPageLoad);
	});

	chrome.storage.onChanged.addListener(function(changes, namespace) {
		for (key in changes) {
			if (key === "blurAmount") {
				window.imageBlurOpacityAmount = changes[key].newValue;
			}
		}
	});

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request) {
				switch (request.status) {
					case 'blur':
						cover();
						break;
					case 'unblur':
						uncover();
						break;
				}
			}
		}
	);



})()
