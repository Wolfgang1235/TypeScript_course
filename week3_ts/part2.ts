class Person {
    public name: string;
    public age: number;
    public occupation: string;
    private salary: number;

    constructor(name: string, age: number, occupation: string, salary:number=0) {
        this.name = name;
        this.age = age;
        this.occupation = occupation;
        this.salary=salary;
    }

    introduce(): string {
        return "Hello my name is "+this.name+
            " and I am a "+this.occupation+". I earn "+
            this.salary+"$";
    }

    incrementAge() {
        this.age = this.age+1;
    }

    setSalary(salary: number) {
        this.salary = salary;
    }

    getSalary(): number {
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

document.getElementById("root")!.innerHTML = ivan.name;