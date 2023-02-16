"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPeople = void 0;
const people_json_1 = __importDefault(require("./people.json"));
function getPeople() {
    const people = [];
    people_json_1.default.map(person => {
        people.push(new Person(person.name, person.age, person.occupation, person.salary));
    });
    return Promise.resolve(people);
}
exports.getPeople = getPeople;
