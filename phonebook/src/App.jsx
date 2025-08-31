import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

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
      setPersons(prev => prev.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
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