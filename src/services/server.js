import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseUrl)
}

const addNumber = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}

const deleteNumber = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const changeNumber = (editedPerson) => {
    return axios.put(`${baseUrl}/${editedPerson.id}`, editedPerson)
}


const exportObj = {getAll, addNumber, deleteNumber, changeNumber}

export default exportObj