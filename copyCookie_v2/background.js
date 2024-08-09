chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getFullCookie") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;
        const url = new URL(tabs[0].url);
        const domain = url.hostname;
  
        chrome.debugger.attach({tabId: tabId}, "1.0", () => {
          chrome.debugger.sendCommand({tabId: tabId}, "Network.getAllCookies", {}, (response) => {
            if (response && response.cookies) {
              const siteCookies = response.cookies.filter(cookie => 
                cookie.domain === domain || 
                domain.endsWith(cookie.domain) || 
                cookie.domain.endsWith('.' + domain.split('.').slice(-2).join('.'))
              );
              const cookieString = siteCookies.map(cookie => {
                let cookieInfo = `${cookie.name}=${cookie.value}`;
                if (cookie.httpOnly) cookieInfo += '; HttpOnly';
                if (cookie.secure) cookieInfo += '; Secure';
                return cookieInfo;
              }).join('; ');
              sendResponse({ cookie: cookieString });
            }
            chrome.debugger.detach({tabId: tabId});
          });
        });
      });
      return true; // 保持消息通道开放以进行异步响应
    }
  });