document.addEventListener('DOMContentLoaded', function() {
    const copyCookiesButton = document.getElementById('copyCookiesButton');
    const cookieOutput = document.getElementById('cookieOutput');
  
    function updateCookieDisplay(cookieString) {
      cookieOutput.value = cookieString;
    }
  
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        copyCookiesButton.textContent = '复制成功!';
        copyCookiesButton.style.backgroundColor = '#45a049';
        setTimeout(() => {
          copyCookiesButton.textContent = '复制 Cookie';
          copyCookiesButton.style.backgroundColor = '';
        }, 2000);
      });
    }
  
    function getCookies() {
      chrome.runtime.sendMessage({ action: "getFullCookie" }, (response) => {
        if (response && response.cookie) {
          updateCookieDisplay(response.cookie);
        }
      });
    }
  
    copyCookiesButton.addEventListener('click', () => {
      copyToClipboard(cookieOutput.value);
    });
  
    getCookies();
  });