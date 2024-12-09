import React, { useState } from 'react';
import axios from 'axios';

const SearchEmployee = () => {
    const [query, setQuery] = useState({ department: '', position: '' });
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuery({ ...query, [name]: value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.get('/api/employees/search', {
                params: query
            });
            setEmployees(response.data);
        } catch (err) {
            setError('Failed to search employees. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '1rem' }}>
            <h1>Search Employees</h1>
            <form onSubmit={handleSearch}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="department">Department:</label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={query.department}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="position">Position:</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={query.position}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                    />
                </div>
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>Search</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {employees.length > 0 && (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Position</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Department</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee._id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.position}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.department}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>${employee.salary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SearchEmployee;