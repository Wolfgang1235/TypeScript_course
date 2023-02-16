"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPeopleList = void 0;
function renderPeopleList(container, people) {
    container.innerHTML = ''; // clear container
    people.forEach((person) => {
        const personElement = document.createElement('div');
        personElement.classList.add('person');
        const nameElement = document.createElement('h2');
        nameElement.classList.add('person__name');
        nameElement.textContent = person.name;
        personElement.appendChild(nameElement);
        const occupationElement = document.createElement('p');
        occupationElement.classList.add('person__occupation');
        occupationElement.textContent = person.occupation;
        personElement.appendChild(occupationElement);
        const ageElement = document.createElement('p');
        ageElement.classList.add('person__age');
        ageElement.textContent = String(person.age);
        personElement.appendChild(ageElement);
        const salaryElement = document.createElement('p');
        salaryElement.classList.add('person__salary');
        salaryElement.textContent = String(person.getSalary());
        personElement.appendChild(salaryElement);
        container.appendChild(personElement);
    });
}
exports.renderPeopleList = renderPeopleList;
