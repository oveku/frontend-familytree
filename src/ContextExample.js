import React, { useState } from 'react';
import { ContextManager, initialContext } from './ContextManager';

// Example component using ContextManager
function ContextExample() {
  // Initialize ContextManager with initialContext
  const [manager] = useState(() => new ContextManager(initialContext));
  const [people, setPeople] = useState(manager.read());
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');


  // Add a new person
  const handleAdd = (e) => {
    e.preventDefault();
    if (!firstname.trim() || !lastname.trim()) return;
    manager.create({ firstname, lastname });
    setPeople([...manager.read()]);
    setFirstname('');
    setLastname('');
  };

  // Delete a person by id
  const handleDelete = (id) => {
    manager.delete(id);
    setPeople([...manager.read()]);
  };

  return (
    <div className="container mt-4">
      <h2>Family Context Example</h2>
      <form className="mb-3" onSubmit={handleAdd} autoComplete="off">
        <div className="row g-2 align-items-center">
          <div className="col">
            <input
              className="form-control"
              placeholder="First Name"
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              className="form-control"
              placeholder="Last Name"
              value={lastname}
              onChange={e => setLastname(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" type="submit">
              Add Person
            </button>
          </div>
        </div>
      </form>
      <ul className="list-group">
        {people.map(person => (
          <li key={person.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{person.firstname} {person.lastname} (ID: {person.id})</span>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(person.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextExample;
