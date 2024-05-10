import React, { useState } from 'react';

const AddGameForm = ({ onAddGame }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!image) {
            alert('Please upload an image for the game.');
            return;
        }
        const newGame = {
            id: new Date().getTime(),
            name: name,
            imageUrl: URL.createObjectURL(image)
        };
        onAddGame(newGame);
        setName('');
        setImage(null);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter game name"
                required
            />
            <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                required
            />
            <button type="submit">Add Game</button>
        </form>
    );
};

export default AddGameForm;
