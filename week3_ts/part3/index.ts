import {renderPeopleList} from "./peopleList";

(async () => {
    try {
        const container = document.querySelector<HTMLBodyElement>('#container');
        let people: Person[] = [];
        if (container) {
            people = await renderPeopleList(container);
            console.log(people)
        } else console.log('Could not find container element');
    } catch (e) {
        console.log(e)
    }
})()