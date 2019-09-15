
function blur(e){
  sendMessage(e.target.id);
}

function saveChanges(e) {
  let blurAmount = document.getElementById('blurAmount').value;
  chrome.storage.sync.set({'blurAmount': blurAmount}, function() {
    message('Settings saved');
  });
}

function sendMessage(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { status: message }, response => {});
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('blur').addEventListener('click', blur, false);
  document.getElementById('unblur').addEventListener('click', blur, false);
});

