import peopleList from './people.json';
import {Person} from "../part2";

export function getPeople(): Promise<Person[]> {
    const people: Person[] = [];

    peopleList.map(person => {
        people.push(new Person(person.name,person.age,person.occupation,person.salary));
    })

    return Promise.resolve(people)
}