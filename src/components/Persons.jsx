const Persons = (props) => {
  return (
    <>
      <ul>
        {props.filteredPersons.map((p) => (
          <li key={p.name}>
            {p.name} {p.number}
            <button onClick={() => props.deleteEntry(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Persons;
