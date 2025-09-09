

import './App.css';
import ContextExample from './ContextExample';
import AddPersonPage from './AddPersonPage';
import ConnectPeople from './ConnectPeople';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';


import { ContextManager, initialContext } from './ContextManager';

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
  const manager = new ContextManager(initialContext);
  const people = manager.read();
  const goToShowTree = () => {
    navigate('/show-tree');
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Heritage</h1>
        <button className="btn btn-primary mt-3 me-2" onClick={goToAddPerson}>
          Go to Add Person Page
        </button>
        <button className="btn btn-secondary mt-3 me-2" onClick={goToConnectPeople}>
          Connect People
        </button>
        <button className="btn btn-info mt-3" onClick={goToShowTree}>
          Show Tree
        </button>
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
    <div>
      <button className="btn btn-secondary m-3" onClick={() => navigate('/')}>Back</button>
      <ShowTreePage />
    </div>
  );
}


function ConnectPeopleWithBack() {
  const navigate = useNavigate();
  return (
    <div>
      <button className="btn btn-secondary m-3" onClick={() => navigate('/')}>Back</button>
      <ConnectPeople />
    </div>
  );
}

export default App;
