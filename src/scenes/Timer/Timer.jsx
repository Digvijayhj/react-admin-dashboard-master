// Timer.jsx
import React, { useState, useEffect } from 'react';
import './Timer.css';  // Ensure this contains appropriate styles for compact display

const Timer = ({ initialTime = 0, showControls = true, onTimerEnd, onClose }) => {
    const [time, setTime] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);

    const formatTime = (time) => {
        let seconds = time % 60;
        let minutes = Math.floor(time / 60) % 60;
        let hours = Math.floor(time / 3600);
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        let interval = null;

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(time => time - 1);
            }, 1000);
        } else if (time === 0) {
            setIsActive(false);
            onTimerEnd && onTimerEnd();
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, time, onTimerEnd]);

    return (
        <div className="timer">
            <div className="timer-display">{formatTime(time)}</div>
            {showControls && (
                <>
                    <button onClick={() => setIsActive(!isActive)}>{isActive ? 'Pause' : 'Start'}</button>
                    <button onClick={() => setTime(time + 1800)}>+30m</button>
                    <button onClick={() => setTime(time + 3600)}>+1h</button>
                    <button onClick={() => setTime(0)}>Reset</button>
                </>
            )}
        </div>
    );
};

export default Timer;
