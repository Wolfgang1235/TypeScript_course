// const helloWorld = (name: string) => {
//     return(`Hello, ${name}!`);
// }
//
// console.log(helloWorld("World"));
//
// document.getElementById("root")!.innerHTML = helloWorld("World")

class Person {
    public name: string;
    public age: number;
    public gender: string;

    constructor(name: string, age: number, gender: string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

let people: Person[] = [];

function populate(person: Person) {
    people.push(person)
}

const personA = new Person("Ann",9,"F");
const personB = new Person("Bob",18,"M");
const personC = new Person("Charles",27,"M");
const personD = new Person("Dona",36,"F");
const personE = new Person("Eva",45,"F");
const personF = new Person("Freddy",54,"M");
const personG = new Person("Gnut",63,"M");
const personH = new Person("Hanne",72,"F");
const personI = new Person("Ivan",81,"M");
const personJ = new Person("Jarrik",90,"M");

populate(personA)
populate(personB)
populate(personC)
populate(personD)
populate(personE)
populate(personF)
populate(personG)
populate(personH)
populate(personI)
populate(personJ)

console.log(people)

function attachArrayToTable(array: Person[]):string {
    const personRows = array.map((person: Person) => {
        return(
            `<table style="margin: auto; border-collapse: collapse; border: 1px solid black" >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${person.name}</td>
                        <td>${person.age}</td>
                        <td>${person.gender}</td>
                    </tr>
                </tbody>
            </table>`
        )})
    const personRowsAsString = personRows.join("")
    return personRowsAsString
}

document.getElementById("root")!.innerHTML = attachArrayToTable(people)
