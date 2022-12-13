console.log("hello background");
import { ChromeRuntimeMessage } from './types/base';

//(async () => {
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    sendResponse();
    return
  }
);

chrome.tabs.onUpdated.addListener((tabId, tab) => {
    chrome.tabs.sendMessage(tabId, {});
});

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status == "complete" || changeInfo) {
//     chrome.scripting.executeScript({
//       files: ['/src/content-scripts/main.ts'],
//       // @ts-ignore
//       target: {tabId: tab.id}
//     })    
//   }
//     chrome.tabs.sendMessage(tabId, {});
// });
//})();