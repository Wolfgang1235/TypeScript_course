import './style.css'
import typescriptLogo from './typescript.svg'
import { setupCounter } from './counter'
import {renderPeopleList} from "./part3/peopleList";
import {getPeople} from "./part3/people";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
      <div id="container"/>
      <div id="root"></div>
    </div>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);


(async () => {
    try {
        const container = document.querySelector<HTMLDivElement>('#container');
        const people = await getPeople()
        if (container) {
            await renderPeopleList(container,people);
        } else console.log('Could not find container element');
    } catch (e) {
        console.log(e)
    }
})()