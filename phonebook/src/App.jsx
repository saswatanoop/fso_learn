
import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

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

const Persons = ({ persons, handleRemovePerson }) => {
  return <ul>
    {persons.map(person => <li key={person.id}>{person.name} {person.number}
      <button onClick={() => handleRemovePerson(person.id)}>delete</button>
    </li>)}
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
  const [notification, setNotification] = useState({ message: '', type: '' });

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

  const updateNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 5000);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const exists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());;
    if (exists) {
      const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...person, number: newNumber }
        personService.updatePerson(person.id, updatedPerson).then((data) => {
          setPersons(prev => prev.map(p => p.id === person.id ? data : p));
          setNewName("");
          setNewNumber("");
        }).catch(err => {
          updateNotification(`${err} observed during user update`, "error");
        })
      }
    }
    else {
      const newPerson = { name: newName, number: newNumber }
      personService.createPerson(newPerson).then((data) => {
        const newDetails = data
        setPersons(prev => prev.concat(newDetails));
        setNewName("");
        setNewNumber("");
        updateNotification(`Added ${newDetails.name}`);
      }).catch(err => {
        updateNotification(`${err} observed during user creation`, "error");
      })

    }
  }

  const handleRemovePerson = (id) => {
    const person = persons.find(p => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService.removePerson(id).then(() => {
        setPersons(prev => prev.filter(p => p.id !== id));
      }).catch(err => {
        updateNotification(`${err} observed during user deletion`, "error");
      })
    }
  }
  const listPersons = newFilter ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) : persons

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <h1>Phonebook</h1>
      <Filter filter={newFilter} handleChange={handleInputFilter} />

      <h3>Add a new name</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleInputName={handleInputName} handleInputNumber={handleInputNumber} handleSubmit={handleSubmit} />

      <h3>Name and Numbers</h3>
      <Persons persons={listPersons} handleRemovePerson={handleRemovePerson} />

    </div>
  )
}

export default App;