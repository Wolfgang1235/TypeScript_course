"use strict";
class Person {
    constructor(name, age, occupation, salary = 0) {
        this.name = name;
        this.age = age;
        this.occupation = occupation;
        this.salary = salary;
    }
    introduce() {
        return "Hello my name is " + this.name +
            " and I am a " + this.occupation + ". I earn " +
            this.salary + "$";
    }
    incrementAge() {
        this.age = this.age + 1;
    }
    setSalary(salary) {
        this.salary = salary;
    }
    getSalary() {
        return this.salary;
    }
}
const ivan = new Person("Ivan", 30, "Janitor");
console.log(ivan.introduce());
console.log(ivan.age);
ivan.incrementAge();
console.log(ivan.age);
ivan.setSalary(50000);
console.log(ivan.getSalary());
console.log(ivan.introduce());
document.getElementById("root").innerHTML = ivan.name;
