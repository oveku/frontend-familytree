import React, { useState } from 'react';
import { ContextManager, initialContext } from './ContextManager';

function ConnectPeople() {
  const [manager] = useState(() => new ContextManager(initialContext));
  const [people, setPeople] = useState(manager.read());
  const [person1, setPerson1] = useState('');
  const [person2, setPerson2] = useState('');
  const [relation, setRelation] = useState('spouse');
  const [message, setMessage] = useState('');

  const handleConnect = () => {
    if (!person1 || !person2 || person1 === person2) {
      setMessage('Please select two different people.');
      return;
    }
    const p1 = manager.read(person1);
    const p2 = manager.read(person2);
    if (!p1 || !p2) {
      setMessage('Invalid selection.');
      return;
    }
    // Update relations based on dropdown
    if (relation === 'spouse') {
      manager.update(person1, { spouse: person2 });
      manager.update(person2, { spouse: person1 });
    } else if (relation === 'child of') {
      // person1 is child of person2
      const children = Array.isArray(p2.children) ? [...p2.children] : [];
      if (!children.includes(person1)) children.push(person1);
      manager.update(person2, { children });
    } else if (relation === 'parent') {
      // person1 is parent of person2
      const children = Array.isArray(p1.children) ? [...p1.children] : [];
      if (!children.includes(person2)) children.push(person2);
      manager.update(person1, { children });
    } else {
      // 'other' relation, just add a note
      manager.update(person1, { note: `Related to ${person2}` });
    }
    setPeople([...manager.read()]);
    setMessage('Relation added!');
  };

  return (
    <div className="container mt-5">
      <h2>Connect Two People</h2>
      <div className="row mb-3">
        <div className="col">
          <label>Person 1</label>
          <select className="form-select" value={person1} onChange={e => setPerson1(e.target.value)}>
            <option value="">Select</option>
            {people.map(p => (
              <option key={p.id} value={p.id}>{p.firstname} {p.lastname}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label>Person 2</label>
          <select className="form-select" value={person2} onChange={e => setPerson2(e.target.value)}>
            <option value="">Select</option>
            {people.map(p => (
              <option key={p.id} value={p.id}>{p.firstname} {p.lastname}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label>Relation</label>
          <select className="form-select" value={relation} onChange={e => setRelation(e.target.value)}>
            <option value="spouse">Spouse</option>
            <option value="child of">Child Of</option>
            <option value="parent">Parent</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleConnect}>Connect</button>
      {message && <div className="alert alert-info mt-2">{message}</div>}
    </div>
  );
}

export default ConnectPeople;
