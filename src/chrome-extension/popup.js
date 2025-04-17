
document.addEventListener('DOMContentLoaded', function() {
  // Get widget visibility preference from storage
  chrome.storage.local.get(['widgetEnabled'], function(result) {
    document.getElementById('enableWidget').checked = 
      result.widgetEnabled === undefined ? true : result.widgetEnabled;
  });
  
  // Save widget visibility preference when checkbox is clicked
  document.getElementById('enableWidget').addEventListener('change', function(e) {
    chrome.storage.local.set({ 'widgetEnabled': e.target.checked });
    
    // Send message to content script to update widget visibility
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0] && tabs[0].url && tabs[0].url.includes('linkedin.com/company')) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'toggleWidget',
          enabled: e.target.checked
        });
      }
    });
  });
  
  // Refresh button handler
  document.getElementById('refreshButton').addEventListener('click', function() {
    document.getElementById('connectionStatus').textContent = 'Refreshing...';
    
    // In a real application, this would connect to the API
    // For now, just simulate a refresh
    setTimeout(() => {
      document.getElementById('connectionStatus').textContent = 'Data refreshed';
    }, 1000);
  });
});
