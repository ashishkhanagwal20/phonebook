const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson2}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        Number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
        <button>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
