import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "../assets/index.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import urlChangeHook from "./urlobserver";

library.add(fas);

let vueApp: ReturnType<typeof createApp>;
function setupVueApp(entryPoint: HTMLDivElement) {
  if (vueApp !== undefined) {
    vueApp.unmount();
  }
  const app = entryPoint.querySelector("#app");
  if (app instanceof HTMLDivElement)  {
    app.remove();
  }
  entryPoint.insertAdjacentHTML(
    "afterend",
    '<div id="app" class="flex items-center justify-center">hello</div>'
  );
  vueApp = createApp(App).use(createPinia());
  vueApp.component("fa", FontAwesomeIcon).mount("#app");
}


function inspectProfilePage(rootElement: HTMLDivElement) {
  const main = rootElement.querySelector('main#main');
  const pvTopCard = main?.querySelector('.pv-top-card');
  const pvTopCardCta = pvTopCard?.querySelector('.pv-top-card-v2-ctas');
  const entryPoint = pvTopCardCta?.querySelector(".entry-point");
  if (entryPoint instanceof HTMLDivElement) {
    setupVueApp(entryPoint);
  } else if (pvTopCardCta instanceof HTMLDivElement) {
    const observer = new MutationObserver(async (mutationsList: MutationRecord[]) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const node = mutation.addedNodes[0];
          if (node instanceof HTMLDivElement && node.classList.contains('pvs-profile-actions')) {
            const entryPoint = node.querySelector(".entry-point");
            if (entryPoint instanceof HTMLDivElement) {
              setupVueApp(entryPoint);
            }
          }
        }
      }
    });
    observer.observe(pvTopCardCta, {childList: true});
  }
}

async function checkProfilePage(url: string) {
  if (url.startsWith('https://www.linkedin.com/in')) {
    const profilePage = document.querySelector('#profile-content');
    console.log({profilePage});
    if (profilePage instanceof HTMLDivElement) {
      // profile feed ready
      inspectProfilePage(profilePage);
    }
  }
}

urlChangeHook(checkProfilePage);
void checkProfilePage(window.location.href);