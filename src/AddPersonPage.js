
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

  const handleAdd = () => {
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

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2>Add a New Person</h2>
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
        <button className="btn btn-success me-2" onClick={handleAdd}>
          Add
        </button>
        <button className="btn btn-secondary" onClick={handleBack}>
          Back
        </button>
        {message && <div className="alert alert-info mt-2">{message}</div>}
      </div>
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
