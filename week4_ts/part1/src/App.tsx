import React, {useEffect, useState} from 'react'
import './App.css'

class Person {
    id:number
    name:string
    age:number
    city:string

    constructor(id:number, name:string, age:number, city:string) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.city = city;
    }
}

function App() {
    const [someText, setSomeText] = useState<string>('Initial text')
    const [people, setPeople] = useState<Person[]>([]);

    const fetchPeople = () => {
        return fetch('http://localhost:3001/person')
            .then(((res) => res.json()))
            .then((data) => setPeople(data))
    }

    useEffect(() => {
        fetchPeople().then(res => console.log(res));
    },[])

    return (
        <div className="App">
            <OutputText someText={someText}/>
            <InputText someText={someText} setSomeText={setSomeText}/>
            <PeopleViewer people={people} setPeople={setPeople}/>
            <AddPersonButton people={people} setPeople={setPeople}/>
            <RemovePerson people={people} setPeople={setPeople}/>
            <SortPeopleList people={people} setPeople={setPeople}/>
            <AddPersonForm people={people} setPeople={setPeople}/>
        </div>
    )
}

const InputText = ({someText, setSomeText}:
                       {someText:string, setSomeText:React.Dispatch<React.SetStateAction<string>>}) => {
    return (
        <div>
            <input id='textInput' type='text' placeholder={someText}
                   onChange={(evt) => setSomeText(evt.target.value)}/>
        </div>
    )
}

const OutputText = ({someText}:{someText:string}) => {
    return (
        <div>
            {someText}
        </div>
    )
}

const AddPersonButton = ({people, setPeople}:
                             {people:Person[], setPeople:React.Dispatch<React.SetStateAction<Person[]>>}) => {
    return <button onClick={()=> {
        const newPerson:Person = new Person(people.length+1,"New Person "+(people.length+1),30,"Some town");
        const options = makeOptions("POST", newPerson);
        fetch('http://localhost:3001/person',options);
        setPeople([...people, newPerson]);
    }}>Add Person</button>
}

const RemovePerson = ({people, setPeople}:
                          {people:Person[], setPeople:React.Dispatch<React.SetStateAction<Person[]>>}) => {
    return <button onClick={()=> {
        const options = makeOptions("DELETE");
        fetch('http://localhost:3001/person/'+people[people.length-1].id,options)
        people.pop();
        setPeople([...people]);
    }}>Remove Person</button>
}

const SortPeopleList = ({people, setPeople}:
                            {people:Person[], setPeople:React.Dispatch<React.SetStateAction<Person[]>>}) => {
    return (
        <div>
            <button onClick={()=> {
                people.sort((a:Person, b:Person) => (a.age > b.age) ? 1 : -1)
                setPeople([...people])
            }}>Sort by Age</button>
            <button onClick={()=> {
                people.sort((a:Person, b:Person) => (a.id > b.id) ? 1 : -1)
                setPeople([...people])
            }}>Sort by Id</button>
        </div>
    )
}

const AddPersonForm = ({people, setPeople}:
                           {people:Person[], setPeople:React.Dispatch<React.SetStateAction<Person[]>>}) => {
    const [input, setInput] = useState({
        name: '',
        age: '',
        city: ''
    })

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const handleClick = (event:React.MouseEvent<HTMLButtonElement>):void => {
        event.preventDefault();
        if (
            !input.name ||
            !input.age ||
            !input.city
        ) {
            return
        }
        const newPerson = new Person(people.length+1, input.name, parseInt(input.age), input.city)
        const options = makeOptions("POST", newPerson);
        fetch('http://localhost:3001/person',options);
        people.push(newPerson);
        setPeople([...people])
        setInput({
            name: '',
            age: '',
            city: ''
        });
    }

    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Name"
                    value={input.name}
                    onChange={handleChange}
                    name="name"
                />
                <input
                    type="text"
                    placeholder="Age"
                    value={input.age}
                    onChange={handleChange}
                    name="age"
                />
                <input
                    type="text"
                    placeholder="City"
                    value={input.city}
                    onChange={handleChange}
                    name="city"
                />
                <button onClick={handleClick}>
                    Add Person
                </button>
            </form>
        </div>
    )
}

const PeopleViewer = ({people, setPeople}:
                          {people:Person[], setPeople:React.Dispatch<React.SetStateAction<Person[]>>}) => {

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>City</th>
                </tr>
                </thead>
                <tbody>
                {people.map(person => (
                    <PersonRow
                        key={person.id}
                        person={person}
                        people={people}
                        setPeople={setPeople}
                    />
                ))}
                </tbody>
            </table>
        </div>
    )
}

const PersonRow = ({person, people, setPeople}:
                       {person:Person, people:Person[],
                           setPeople:React.Dispatch<React.SetStateAction<Person[]>>}):JSX.Element => {
    const [edit, setEdit] = useState(false);

    const [personRow, setPersonRow] = useState({
        name: person.name,
        age: person.age,
        city: person.city
    })

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const key = event.target.id;
        setPersonRow({...personRow, [key]: value});
    }

    return (

        <tr>
            <td>{person.id}</td>
            <td>
                {edit ? (
                    <input
                        id="name"
                        type="text"
                        value={personRow.name}
                        onChange={handleChange}
                    />
                ) : (
                    person.name
                )}
            </td>
            <td>
                {edit ? (
                    <input
                        id="age"
                        type="number"
                        value={personRow.age}
                        onChange={handleChange}
                    />
                ) : (
                    person.age
                )}
            </td>
            <td>
                {edit ? (
                    <input
                        id="city"
                        type="text"
                        value={personRow.city}
                        onChange={handleChange}
                    />
                ) : (
                    person.city
                )}
            </td>
            <td>
                {edit ? (
                    <button onClick={() => {
                        const upd_obj = people.findIndex((obj => obj.id == person.id));
                        people[upd_obj].name = personRow.name;
                        people[upd_obj].age = personRow.age;
                        people[upd_obj].city = personRow.city;

                        const updatedPerson = new Person(person.id,personRow.name,parseInt(String(personRow.age)),personRow.city);

                        const options = makeOptions("PUT", updatedPerson);
                        fetch('http://localhost:3001/person/'+person.id,options)
                        setEdit(!edit)
                        setPeople([...people])
                    }}>
                        Update
                    </button>
                ) : (
                    <button onClick={() => setEdit(!edit)}>
                        Edit
                    </button>
                )}
            </td>
        </tr>
    )
}

const makeOptions = (method:string, body?:Person) => {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
        body: body ? JSON.stringify(body) : undefined
    };
    return opts;
};

export default App
