import server from "./services/server"
import Notification from "./components/Notification"
import { useState, useEffect } from 'react'
const Form = ({handleNameChange, handleNumberChange, handleSubmit, newName, newNumber}) => {
  return(
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
        <tr>
          <td>name:</td><td><input value={newName} onChange={handleNameChange}/></td>
        </tr>
        <tr>
          <td>number:</td><td><input value={newNumber} onChange={handleNumberChange}/></td>
        </tr>
        </tbody>
      </table>  
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const List = ({persons, handleRemove}) => {
  return(
    <table>
      <tbody>
      <>
        {persons.map(item => <tr key={item.name}><td>{item.name}</td><td>{item.number}</td><td><button id={item.id} onClick={handleRemove}>Delete</button></td></tr>)}
      </>
      </tbody>
    </table>
  )
    
}

const Search = ({handler}) => {

  return(
    <input placeholder="search!" onChange={handler}/>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  // const [notification, setNotification] = useState({type: "error", message: "this is an error"})
  // const [notification, setNotification] = useState({type: "succes", message: "this is a succes"})
  const [notification, setNotification] = useState(null)
  const [newName, setNewName] = useState('enter new name')
  const [newNumber, setNewNumber] = useState(0)
  const [personsRender, setPersonsRender] = useState([...persons])
  useEffect( () => {
    server.getAll()
    .then(response => {
      setPersons(response.data)
      setPersonsRender(response.data)
    })
  }, [])
  
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault()


    const check = persons.find(person => person.name === newName)
    if(check === undefined){
      const newPerson = {name: newName, number: newNumber}
      server.addNumber(newPerson)
      .then(response => {
        server.getAll()
        .then(response => {
          setPersons(response.data)
          setPersonsRender(response.data)
        })
        setNewName("")
        setNewNumber("")
        setNotification({type: "succes", message: `person "${newPerson.name}" is successfully added`})
        setTimeout( () => setNotification(null), 5000)
      })
    }
    else{
      if(window.confirm(`${newName} is already in the phonebook! do you want to replace the old number with a new one?`)){
        const editedPerson = {...check, number: newNumber}
        server.changeNumber(editedPerson)
        .then(() => {
          server.getAll()
          .then(response => {
            setPersons(response.data)
            setPersonsRender(response.data)
          })
          setNotification({type: "succes", message: `person "${editedPerson.name}" is successfully changed`})
          setTimeout( () => setNotification(null), 5000)
        })
      }
    }


  }
  const searchHandle = (e) =>{
    // console.log(e.target.value)
    const result = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setPersonsRender(result)
  }
  const handleRemove = (e) => {
    const user = e.target.parentElement.parentElement.childNodes[0].innerText
    if(window.confirm(`are you sure you want to delete the number of: ${user}?`)){
      console.log(`remove item: ${e.target.id}`)
      server.deleteNumber(e.target.id)
      .then(response => {
          const newList = persons.filter(person => {
            return Number(person.id) !== Number(e.target.id)
        })
        setPersons(newList)
        setPersonsRender(newList)
      })
      .catch( (e) => {
        setNotification({type: "error", message: `the user ${user} is already removed`})
        setTimeout( () => setNotification(null), 5000)
      })
    }
  }

  return (
    <div>
      <Notification notification={notification} />
      <Search handler={searchHandle}/>
      <h2>Phonebook</h2>
      <Form
      handleSubmit={handleSubmit}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange} 
      newName={newName}
      newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <List persons={personsRender} handleRemove={handleRemove}/>
      </div>
  )
}

export default App