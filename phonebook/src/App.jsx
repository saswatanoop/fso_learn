
import { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonForm = ({ newName, newNumber, handleSubmit, handleInputName, handleInputNumber }) => {
  return <>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input value={newName} onChange={handleInputName} required />
      </div>
      <div>
        <label>Number:</label>
        <input value={newNumber} onChange={handleInputNumber} required />
      </div>
      <button type="submit">add</button>
    </form>
  </>
}
const Persons = ({ persons }) => {
  return <ul>
    {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
  </ul>
}
const Filter = ({ filter, handleChange }) => {
  return <>
    <label>Filter shown with:</label>
    <input value={filter} onChange={handleChange} />
  </>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    personService.getAllPersons().then((data) => {
      setPersons(data)
    })
  }, []);

  const handleInputName = (event) => {
    setNewName(event.target.value);
  }
  const handleInputNumber = (event) => {
    setNewNumber(event.target.value);
  }
  const handleInputFilter = (event) => {
    setNewFilter(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const exists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());;
    if (exists) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = { name: newName, number: newNumber }
      personService.createPerson(newPerson).then((data) => {
        const newDetails = data
        setPersons(prev => prev.concat(newDetails));
        setNewName("");
        setNewNumber("");
      }).catch(err => {
        alert(`${err} observed during new user addition`)
      })

    }
  }

  const listPersons = newFilter ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) : persons

  return (
    <div>

      <h1>Phonebook</h1>
      <Filter filter={newFilter} handleChange={handleInputFilter} />

      <h3>Add a new name</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleInputName={handleInputName} handleInputNumber={handleInputNumber} handleSubmit={handleSubmit} />

      <h3>Name and Numbers</h3>
      <Persons persons={listPersons} />

    </div>
  )
}

export default App;