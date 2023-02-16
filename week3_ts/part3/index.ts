import {renderPeopleList} from "./peopleList";
import {getPeople} from "./people";

(async () => {
    try {
        const container = document.querySelector<HTMLDivElement>('#container');
        const people = await getPeople()
        if (container) {
            await renderPeopleList(container,people);
            console.log(people)
        } else console.log('Could not find container element');
    } catch (e) {
        console.log(e)
    }
})()