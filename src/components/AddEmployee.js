import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        department: '',
        salary: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate fields
        if (!formData.name || !formData.position || !formData.department || !formData.salary) {
            setError('All fields are required.');
            return;
        }
        if (isNaN(formData.salary) || formData.salary <= 0) {
            setError('Salary must be a positive number.');
            return;
        }

        try {
            await axios.post('/api/employees', formData);
            setSuccess('Employee added successfully!');
            setFormData({ name: '', position: '', department: '', salary: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add employee. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
            <h1>Add Employee</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
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
                        value={formData.position}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="department">Department:</label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="salary">Salary:</label>
                    <input
                        type="number"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;