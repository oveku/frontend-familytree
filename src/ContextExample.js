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
  const handleAdd = () => {
    if (!firstname || !lastname) return;
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
      <div className="mb-3">
        <input
          className="form-control mb-2"
          placeholder="First Name"
          value={firstname}
          onChange={e => setFirstname(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Last Name"
          value={lastname}
          onChange={e => setLastname(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Person
        </button>
      </div>
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
