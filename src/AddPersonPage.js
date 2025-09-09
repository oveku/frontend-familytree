import React, { useState } from 'react';
import { ContextManager, initialContext } from './ContextManager';
import { useNavigate } from 'react-router-dom';

function AddPersonPage() {
  const [manager] = useState(() => new ContextManager(initialContext));
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [people, setPeople] = useState(manager.read());
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!firstname.trim() || !lastname.trim()) {
      setMessage('Please enter both first and last name.');
      return;
    }
    const newPerson = manager.create({ firstname, lastname });
    setPeople([...manager.read()]);
    setFirstname('');
    setLastname('');
    setMessage(`Added: ${newPerson.firstname} ${newPerson.lastname}`);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Add a New Person</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>Back</button>
      </div>
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
            <button className="btn btn-success" type="submit">
              Add
            </button>
          </div>
        </div>
        {message && <div className="alert alert-info mt-3 mb-0">{message}</div>}
      </form>
      <h4>People List</h4>
      <ul className="list-group">
        {people.map(person => (
          <li key={person.id} className="list-group-item">
            {person.firstname} {person.lastname} (ID: {person.id})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddPersonPage;
