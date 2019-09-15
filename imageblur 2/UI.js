		document.getElementById("changeText").addEventListener("click", sendClickEvent);
		function sendClickEvent(){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, { action: 'executeCode' });
		  console.log('messageSent');
		});
		}
