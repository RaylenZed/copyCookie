chrome.runtime.sendMessage({ action: "getFullCookie" }, (response) => {
  if (response && response.cookie) {
    let cookieOutput = document.getElementById('cookieOutput');
    cookieOutput.value = response.cookie;
    cookieOutput.select();
    navigator.clipboard.writeText(response.cookie).then(() => {
      let copyButton = document.getElementById('copyCookiesButton');
      copyButton.textContent = '复制成功!';
      setTimeout(() => {
        copyButton.textContent = '复制Cookie';
      }, 2000);
    });
  }
});