import React, { useState } from 'react';
import './GameBox.css';
import Timer from '../Timer/Timer';
import BookingForm from '../BookingForm/BookingForm';

const GameBox = ({ game, onInfoClick }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleBookClick = () => {
        setIsFormVisible(true);
    };

    const handleSubmitBooking = (formData) => {
        console.log('Booking submitted:', formData);
        setIsFormVisible(false);
    };

    return (
        <div className="game-box">
            <div className="game-image-container">
                <img src={game.imageUrl} alt={game.name} className="game-image" />
            </div>
            <h3 className="game-title">{game.name}</h3>
            <div className="game-actions">
                <button onClick={() => onInfoClick(game)}>More Info</button>
                <button className="book-button" onClick={handleBookClick}>Book</button>
                <div className="timer-controls">
                    <Timer initialTime={0} showControls />
                </div>
                {isFormVisible && (
                    <BookingForm
                        onSubmitBooking={handleSubmitBooking}
                        onClose={() => setIsFormVisible(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default GameBox;
