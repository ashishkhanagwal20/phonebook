import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phoneBookService from "./services/phoneBookService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phoneBookService.getAll().then((initialrecords) => {
      setPersons(initialrecords);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // const addPerson2 = (event) => {
  //   event.preventDefault();
  //   // Check if a person with the same name already exists
  //   if (persons.some((person) => person.name === newName)) {
  //     alert(`${newName} is already in the phonebook. Not allowed.`);

  //   } else {
  //     const personObj = {
  //       name: newName,
  //       number: newNumber,
  //     };

  //     phoneBookService.create(personObj).then((returnedPhoneRecord) => {
  //       setPersons(persons.concat(returnedPhoneRecord));
  //       setNewName("");
  //       setNewNumber("");
  //     });
  //   }
  // };
  const addPerson2 = (event) => {
    event.preventDefault();

    // Check if a person with the same name already exists
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      // If a person with the same name exists, update their number
      const updatedPerson = { ...existingPerson, number: newNumber };
      window.confirm(
        `${updatedPerson.name} is already added to phonebook, replace old number with new one?`
      );
      phoneBookService
        .update(existingPerson.id, updatedPerson)
        .then((updatedPhoneRecord) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPhoneRecord.id ? updatedPhoneRecord : person
            )
          );
        })
        .catch((error) => {
          console.log("Error updating entry:", error);
        });
    } else {
      // If no person with the same name exists, create a new entry
      const personObj = {
        name: newName,
        number: newNumber,
      };

      phoneBookService.create(personObj).then((returnedPhoneRecord) => {
        setPersons(persons.concat(returnedPhoneRecord));
      });
    }

    setNewName("");
    setNewNumber("");
  };

  // Filter the list of persons based on the filter input
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const deleteEntry = (id) => {
    const p = persons.filter((person) => person.id === id);
    const p_name = p[0]["name"];

    window.confirm(`Delete ${p_name}`);
    phoneBookService
      .deletePhoneRecord(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.log("Error deleting entry:", error);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson2={addPerson2}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deleteEntry={deleteEntry} />
    </div>
  );
};

export default App;
