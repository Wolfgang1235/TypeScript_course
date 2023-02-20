import './style.css'
import {renderPeopleList} from "./part3/peopleList";
import {getPeople} from "./part3/people";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="card">
      <div id="container"/>
      <div id="root"></div>
    </div>
`;

(async(): Promise<void> => {
    try {
        const container = document.querySelector<HTMLDivElement>('#container');
        const people = await getPeople()
        if (container) {
            await renderPeopleList(container,people);
        } else console.log('Could not find container element');
    } catch (e: unknown) {
        console.log(e)
    }
})()