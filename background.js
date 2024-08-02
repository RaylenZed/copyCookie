chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCookies") {
      chrome.cookies.getAll({ url: request.url }, (cookies) => {
        let cookieString = cookies.map(cookie => `${cookie.name}=${encodeURIComponent(cookie.value)}`).join('; ');
        sendResponse({ cookieString });
      });
      return true; // 保持消息通道打开，直到sendResponse被调用
    }
  });
  