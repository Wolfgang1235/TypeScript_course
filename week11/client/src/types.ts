type Person = {
    id:string,
    name:string,
    age:number,
    url:string,
    addresses:Address[];
};

type Address = {
    id:string,
    street:string,
    zip:number,
    people:Person[];
};

export type {Person, Address};