import axios from 'axios'
const baseURLPersons = '/api/persons'


const getAllPersons = async () => {
    const res = await axios.get(baseURLPersons)
    return res.data
}

const createPerson = (person) => {
    return axios.post(baseURLPersons, person).then(res => res.data)
}

const removePerson = (id) => {
    return axios.delete(`${baseURLPersons}/${id}`)
}

const updatePerson = (id, person) => {
    return axios.put(`${baseURLPersons}/${id}`, person).then(res => res.data)
}


export default { getAllPersons, createPerson, removePerson, updatePerson }