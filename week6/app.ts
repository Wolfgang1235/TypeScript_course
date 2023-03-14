import express, {Request, Response} from "express";
import morgan = require('morgan')
import {readFileSync, writeFileSync} from 'node:fs';
const log4js = require('log4js')
const config = require('./log4js.json')

log4js.configure(config);

const logger = log4js.getLogger();

interface Person {
    id: string;
    name: string;
    age: number;
    city: string;
}

const app = express();
app.use(express.json());

app.use((req,res,next) => {
    const date = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    logger.info(`${date} ${method} ${url} ${JSON.stringify(req.body)}`);
    next();
});

if (process.env.NODE_ENV=== 'development') {
    app.use(morgan('dev'))
    console.log('dev mode')
}

const getPeople = ():Person[] => {
    const data = readFileSync('./people.json', 'utf-8');
    const parsedData = JSON.parse(data);
    return parsedData.people as Person[]
}

const getPersonById = (people:Person[], id:string):Person | undefined => {
    return people.find(person => person.id.toString() === id);
}

app.get('/api/people', (req:Request, res:Response) =>{
    const people = getPeople();
    res.status(200).json(people);
})

app.get('/api/people/:id', (req:Request, res:Response):void => {
    const id = req.params.id;
    const people = getPeople();
    const person = getPersonById(people, id);
    if (!person) {
        res.status(404).json({msg: 'Not found'});
        return
    }
    res.status(200).json(person);
});

app.post('/api/people', (req:Request,res:Response):void => {
    const {name, age, city} = req.body;
    const people = getPeople();
    const lastPerson = people[people.length-1];
    const lastPersonId = parseInt(lastPerson.id);
    const newPerson: Person = {
        id: (lastPersonId+1).toString(),
        name,
        age,
        city
    };
    people.push(newPerson);
    writeFileSync('./people.json',JSON.stringify({people},null,2));
    res.status(201).json(newPerson);
})

app.put('/api/people/:id', (req:Request, res:Response):void => {
    const id = req.params.id;
    const people = getPeople();
    const personIndex = people.findIndex(person => person.id === id);
    if (personIndex === -1) {
        res.status(404).json({msg: 'Not found'});
        return;
    };
    const updatedPerson:Person = {
        id: id,
        name: req.body.name,
        age: req.body.age,
        city: req.body.city
    };
    people[personIndex] = updatedPerson;
    writeFileSync('./people.json', JSON.stringify({people},null,2));
    res.status(200).json(updatedPerson);
});

app.patch('/api/people/:id', (req:Request, res:Response):void => {
    const id = req.params.id;
    const updateData = req.body;
    const people = getPeople();
    const personIndex = people.findIndex(person => person.id === id);
    if (personIndex === -1) {
        res.status(404).json({msg: 'Not found'});
        return;
    };
    people[personIndex] = {...people[personIndex], ...updateData};
    writeFileSync('./people.json', JSON.stringify({people},null,2));
    res.status(200).json(people[personIndex]);
})

app.delete('/api/people/:id', (req:Request, res:Response):void => {
    const people = getPeople();
    const personIndex = people.findIndex(person => person.id === req.params.id);
    if (personIndex === -1) {
        return
    };
    people.splice(personIndex,1);
    writeFileSync('./people.json', JSON.stringify({people},null,2));
    res.status(204).json(people);
})

app.listen(3001,() => {console.log(`server is listening to port 3001`)})