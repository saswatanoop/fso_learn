import axios from 'axios'
const baseURLPersons = 'http://localhost:3001/persons'


const getAllPersons = () => {
    return axios.get(baseURLPersons).then(res => res.data)
}

const createPerson = (person) => {
    return axios.post(baseURLPersons, person).then(res => res.data)
}

const removePerson = (id) => {
    return axios.delete(`${baseURLPersons}/${id}`)
}


export default { getAllPersons, createPerson, removePerson }