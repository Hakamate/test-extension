import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import '../assets/index.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

function addContentNCRM() {
    const app = document.querySelector('#app');
    const el = document.querySelector('div.pv-top-card-v2-ctas > div > div.entry-point');
    console.log({app, el});
    
    if (!app && el) {
      
        el.insertAdjacentHTML(
          'afterend',
          '<div id="app" class="flex items-center justify-center">hello</div>',
        );
        const app = createApp(App).use(createPinia());
        app.component('fa', FontAwesomeIcon).mount('#app');
    }
}
chrome.runtime.onMessage.addListener((obj, sender, response) => {
  addContentNCRM()
});

window.onload = async () => {

  // const content = document.createElement("div")
  // content.setAttribute('id', 'app')
  // content.classList.add("flex items-center justify-center")
  // content.innerHTML = 'hello'
  // console.log({content});
  
  // const elementAfterNewContent = document.querySelector('div.pv-top-card-v2-ctas > div > div.entry-point');
  // const container = document.querySelector('div.pv-top-card-v2-ctas > div');
  // console.log({content, elementAfterNewContent, container});
 
  // if (elementAfterNewContent && container) {
  //   container.insertBefore(
  //     content,
  //     elementAfterNewContent,
  //   );
  //   const app = createApp(App).use(createPinia());
  //   app.component('fa', FontAwesomeIcon).mount('#app');
  // }
}