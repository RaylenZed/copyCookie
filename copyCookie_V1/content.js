chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCookies") {
      sendResponse({ cookies: document.cookie });
    }
  });