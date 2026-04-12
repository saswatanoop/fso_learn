import axios from 'axios'
const baseURLPersons = '/api/persons'


const getAllPersons = async () => {
    const res = await axios.get(baseURLPersons)
    return res.data
}

const createPerson = async (person) => {
    const res = await axios.post(baseURLPersons, person);
    return res.data
    // return axios.post(baseURLPersons, person).then(res => res.data)
}

const removePerson = async (id) => {
    console.log(`Deleting person with id: ${id}`);
    await axios.delete(`${baseURLPersons}/${id}`);
}

const updatePerson = async (id, person) => {
    const res = await axios.put(`${baseURLPersons}/${id}`, person);
    return res.data
    // return axios.put(`${baseURLPersons}/${id}`, person).then(res => res.data)
}


export default { getAllPersons, createPerson, removePerson, updatePerson }