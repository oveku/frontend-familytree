import React, { useState, useEffect } from 'react';
import { ContextManager } from './ContextManager';
import { useNavigate } from 'react-router-dom';

function ConnectPeople() {
  const manager = new ContextManager();
  const [people, setPeople] = useState([]);
  const [person1, setPerson1] = useState('');
  const [person2, setPerson2] = useState('');
  const [relation, setRelation] = useState('spouse');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setPeople(await manager.read());
    })();
  }, []);

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!person1 || !person2 || person1 === person2) {
      setMessage('Please select two different people.');
      return;
    }
    const p1 = (await manager.read()).find(p => p.id === person1);
    const p2 = (await manager.read()).find(p => p.id === person2);
    if (!p1 || !p2) {
      setMessage('Invalid selection.');
      return;
    }
    // Update relations based on dropdown
    if (relation === 'spouse') {
      await manager.update(person1, { spouse: person2 });
      await manager.update(person2, { spouse: person1 });
    } else if (relation === 'child of') {
      // person1 is child of person2
      const children = Array.isArray(p2.children) ? [...p2.children] : [];
      if (!children.includes(person1)) children.push(person1);
      await manager.update(person2, { children });
    } else if (relation === 'parent') {
      // person1 is parent of person2
      const children = Array.isArray(p1.children) ? [...p1.children] : [];
      if (!children.includes(person2)) children.push(person2);
      await manager.update(person1, { children });
    } else {
      // 'other' relation, just add a note
      await manager.update(person1, { note: `Related to ${person2}` });
    }
    setPeople(await manager.read());
    setMessage('Relation added!');
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Connect Two People</h2>
  <button className="btn btn-secondary" onClick={() => navigate('/')}>Back</button>
      </div>
      <form onSubmit={handleConnect} autoComplete="off">
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
          <div className="col-auto align-self-end">
            <button className="btn btn-primary" type="submit">Connect</button>
          </div>
        </div>
        {message && <div className="alert alert-info mt-2">{message}</div>}
      </form>
    </div>
  );
}

export default ConnectPeople;
