let cookieOutput = document.getElementById('cookieOutput');
let refreshButton = document.getElementById('refreshButton');
let copyButton = document.getElementById('copyButton');

function updateCookieDisplay(cookies) {
  cookieOutput.value = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
}

function refreshCookies() {
  chrome.devtools.network.getHAR(har => {
    let cookies = [];
    har.entries.forEach(entry => {
      entry.request.headers.forEach(header => {
        if (header.name.toLowerCase() === 'cookie') {
          cookies = header.value.split('; ').map(cookie => {
            let [name, value] = cookie.split('=');
            return { name, value };
          });
        }
      });
    });
    updateCookieDisplay(cookies);
  });
}

refreshButton.addEventListener('click', refreshCookies);

copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(cookieOutput.value).then(() => {
    copyButton.textContent = '复制成功!';
    setTimeout(() => {
      copyButton.textContent = '复制 Cookie';
    }, 2000);
  });
});

refreshCookies();