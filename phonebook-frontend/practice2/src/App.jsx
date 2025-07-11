import {useState, useEffect} from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Details from './component/Details'
import bookService from './services/book'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className = "addmsg">
      {message}
    </div>
  )
}

const App = () => {
  //state for storing person info
  const [persons, setPersons] = useState([
  ])

  //state for adding new person info
  const [newPerson, setNewPerson] = useState('')
  
  //state for adding new number
  const[newNumber, setNewNumber] = useState('')
  
  //state for filtering 
  const [find, setFind] = useState('')

  //state for contact add message
  const [message, setMessage] = useState(null)

  //fetching the date from the local server
  useEffect(() => {
    console.log('effect')
    bookService
      .getAll()
      .then(requestedData => {
        setPersons(requestedData)
      })
  }, [])
  
  //function to add the new info to the list
  const addNote = (event) => {
    event.preventDefault();
    const newObject = {
      name: newPerson,
      number: newNumber
    }
    const existingPerson = persons.find(person => person.name === newObject.name)
    if (existingPerson) {
      if (existingPerson.number === newObject.number) {
        alert(`${persons.name} is already in the list with the same number`)
      } else {
        if (window.confirm(`Do you want to overwrite the number of the ${newObject.name}?`))
          bookService
            .update(existingPerson.id, newObject)
            .then(requestedData => {
              setMessage(`The number of ${newObject.name} has been changed`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              setPersons(persons.map(person => person.id !== existingPerson.id ? person : requestedData))
              setNewPerson('');
              setNewNumber('');
            })
            .catch(error => {
              setMessage(`Information about ${newObject.name} has already been removed from the server`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              setNewPerson('');
              setNewNumber('');
            })
      }
    }else{
      bookService
        .create(newObject)
        .then(requestedData => {
          setMessage(`Contact: ${newObject.name} is added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.concat(requestedData))
          setNewNumber('')
          setNewPerson('')
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.error) {
            setMessage(error.response.data.error);
            setNewPerson('');
            setNewNumber('');
          }
          setTimeout(() => setMessage(null), 5000);
        })
        }
        
    }

  //function to add name
  const handleClick = (event) => {
    
    setNewPerson(event.target.value)
  }
  
  //function to add number
  const handleClickNum = (event) => {
    
    setNewNumber(event.target.value)
  }
  
  //function to add name to filer input
  const handleFind = (event) => {
    setFind(event.target.value)
  }
  
  //function to delete the details from the phonebook
  const handleDelete = (id) => {
    const person = persons.find(n => n.id === id)
    
    if (window.confirm(`Delete ${person.name}?`))
    bookService
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id ))
      })
      .catch((error) => {
        alert(`${person.name} might have already been deleted. `)
      })
  }
  
  //checking for required name
  const findName = persons.filter((person)=>person.name.toLowerCase().includes(find.toLowerCase()))
  return (
    <div>
     <h2>Phonebook</h2>
     <Notification message = {message} />
     <div>
      <Filter find = {find} handlefind = {handleFind} />
      <h2>Add New Number</h2>
     </div>
      <div>
        <PersonForm value = {newPerson} handleclick = {handleClick} number = {newNumber} handleclicknum = {handleClickNum} addnote = {addNote}/>
      </div>
      
     
     <h2>Numbers</h2>
     <Details findname = {findName} persons = {persons} handleDelete = {handleDelete}/>
     
    </div>
  )
}

export default App;