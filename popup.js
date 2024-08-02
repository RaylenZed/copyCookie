document.getElementById('copyCookiesButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log("当前活动的tab:", tabs[0].url);
    chrome.runtime.sendMessage(
      { action: "getCookies", url: tabs[0].url },
      (response) => {
        console.log("收到的cookie字符串:", response.cookieString);
        let decodedCookieString = decodeURIComponent(response.cookieString);
        let cookieOutput = document.getElementById('cookieOutput');
        cookieOutput.value = decodedCookieString;
        cookieOutput.select();
        document.execCommand('copy');

        // 修改按钮文本以提示复制成功
        let copyButton = document.getElementById('copyCookiesButton');
        copyButton.textContent = '复制成功!';
        setTimeout(() => {
          copyButton.textContent = '复制Cookie';
        }, 2000); // 2秒后恢复原始文本
      }
    );
  });
});
