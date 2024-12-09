import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('/api/employees');
                setEmployees(response.data);
            } catch (err) {
                setError('Failed to fetch employees. Please try again later.');
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '1rem' }}>
            <h1>Employee List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
        </div>
    );
};

export default EmployeeList;