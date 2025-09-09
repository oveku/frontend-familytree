import React, { useState, useEffect } from 'react';
import { ContextManager } from './ContextManager';


// Example component using ContextManager
function ContextExample() {
  const manager = new ContextManager();
  const [people, setPeople] = useState([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  useEffect(() => {
    manager.read().then(setPeople);
  }, []);

  // Add a new person
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!firstname.trim() || !lastname.trim()) return;
    await manager.create({ firstname, lastname });
    setPeople(await manager.read());
    setFirstname('');
    setLastname('');
  };

  // Delete a person by id
  const handleDelete = async (id) => {
    await manager.delete(id);
    setPeople(await manager.read());
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
