import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // const addPerson = (event) => {
  //   event.preventDefault();
  //   console.log("New Name add person", newName);

  //   const personObj = {
  //     name: newName,
  //   };
  //   setPersons(persons.concat(personObj));
  //   setNewName("");
  // };

  const addPerson2 = (event) => {
    event.preventDefault();

    // Check if a person with the same name already exists
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook. Not allowed.`);
    } else {
      const personObj = {
        name: newName,
      };

      setPersons(persons.concat(personObj));
      setNewName("");
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson2}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>debug: {newName}</div>
        <div>
          <button>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
