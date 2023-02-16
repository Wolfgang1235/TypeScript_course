"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPeopleList = void 0;
const people_1 = require("./people");
function renderPeopleList(container) {
    return __awaiter(this, void 0, void 0, function* () {
        container.innerHTML = ''; // clear container
        const people = yield (0, people_1.getPeople)();
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
        return people;
    });
}
exports.renderPeopleList = renderPeopleList;
