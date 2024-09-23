import React, { useState } from 'react';
import axios from 'axios';

const CreateCategory = () => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/categories', { name })
            .then(response => {
                console.log(response.data);
                setName('');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category name"
                required
            />
            <button type="submit">Create Category</button>
        </form>
    );
};

export default CreateCategory;
