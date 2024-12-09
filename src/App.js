import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import SearchEmployee from './components/SearchEmployee';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('signup');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'signup':
        return <Signup />;
      case 'login':
        return <Login />;
      case 'employeeList':
        return <EmployeeList />;
      case 'addEmployee':
        return <AddEmployee />;
      case 'editEmployee':
        return (
          <EditEmployee employeeId={selectedEmployeeId} />
        );
      case 'searchEmployee':
        return <SearchEmployee />;
      default:
        return <Signup />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee Management App</h1>
        <nav>
          <button
            style={{ padding: '0.5rem 1rem', margin: '0.5rem' }}
            onClick={() => setCurrentPage('signup')}
          >
            Signup
          </button>
          <button
            style={{ padding: '0.5rem 1rem', margin: '0.5rem' }}
            onClick={() => setCurrentPage('login')}
          >
            Login
          </button>
          <button
            style={{ padding: '0.5rem 1rem', margin: '0.5rem' }}
            onClick={() => setCurrentPage('employeeList')}
          >
            Employee List
          </button>
          <button
            style={{ padding: '0.5rem 1rem', margin: '0.5rem' }}
            onClick={() => setCurrentPage('addEmployee')}
          >
            Add Employee
          </button>
          <button
            style={{ padding: '0.5rem 1rem', margin: '0.5rem' }}
            onClick={() => {
              setSelectedEmployeeId(''); // Placeholder for actual employee ID
              setCurrentPage('editEmployee');
            }}
          >
            Edit Employee
          </button>
          <button
            style={{ padding: '0.5rem 1rem', margin: '0.5rem' }}
            onClick={() => setCurrentPage('searchEmployee')}
          >
            Search Employee
          </button>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>{renderPage()}</main>
    </div>
  );
}

export default App;