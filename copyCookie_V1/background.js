let fullCookie = '';

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    for (let header of details.requestHeaders) {
      if (header.name.toLowerCase() === 'cookie') {
        fullCookie = header.value;
        break;
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["requestHeaders"]
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getFullCookie") {
    sendResponse({ cookie: fullCookie });
  }
});