const Persons = (props) => {
  return (
    <>
      <ul>
        {props.filteredPersons.map((p) => (
          <li key={p.name}>
            {p.name} {p.number}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Persons;
