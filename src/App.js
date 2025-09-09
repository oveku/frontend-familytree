import React from 'react';

import './App.css';
import ContextExample from './ContextExample';
import AddPersonPage from './AddPersonPage';
import ConnectPeople from './ConnectPeople';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';


import { ContextManager } from './ContextManager';

import ShowTreePage from './ShowTreePage';

function MainPage() {
  const navigate = useNavigate();
  const goToAddPerson = () => {
    navigate('/add-person');
  };
  const goToConnectPeople = () => {
    navigate('/connect-people');
  };
  // List persons from context
  const manager = new ContextManager();
  const [people, setPeople] = React.useState([]);
  React.useEffect(() => {
    manager.read().then(setPeople);
  }, []);
  const goToShowTree = () => {
    navigate('/show-tree');
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Heritage</h1>
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
          <button className="btn btn-primary" onClick={goToAddPerson}>
            Add Person
          </button>
          <button className="btn btn-secondary" onClick={goToConnectPeople}>
            Connect People
          </button>
          <button className="btn btn-info" onClick={goToShowTree}>
            Show Tree
          </button>
        </div>
      </header>
      <div className="container mt-4" style={{maxWidth: 600}}>
        <h3 className="mb-3">People</h3>
        <ul className="list-group mb-4">
          {people.length === 0 && <li className="list-group-item">No people found.</li>}
          {people.map(person => (
            <li key={person.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                <strong>{person.firstname} {person.lastname}</strong>
                <span className="text-muted ms-2">(ID: {person.id})</span>
              </span>
              <span className="badge bg-info text-dark">{person.birthdate || ''}</span>
            </li>
          ))}
        </ul>
      </div>
      <ContextExample />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/add-person" element={<AddPersonPage />} />
        <Route path="/connect-people" element={<ConnectPeopleWithBack />} />
        <Route path="/show-tree" element={<ShowTreePageWithBack />} />
      </Routes>
    </Router>
  );
}

// Wrapper to add a back button to ShowTreePage
function ShowTreePageWithBack() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-start p-3">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>Back</button>
      </div>
      <ShowTreePage />
    </div>
  );
}


function ConnectPeopleWithBack() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-start p-3">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>Back</button>
      </div>
      <ConnectPeople />
    </div>
  );
}

export default App;
