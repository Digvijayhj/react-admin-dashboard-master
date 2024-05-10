import {Box, Button, Grid, IconButton, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import Header from "../../components/Header";
import "./dashboard.css";
import GameBox from "../Widget/GameBox";
import "../Widget/GameBox.css";
import AddGameForm from "../AddGameForm/AddGameForm";
import ps5Image from "../../images/ps5.jpg";
import poolImage from "../../images/poolImage.jpg";


const Dashboard = () => {
    const [games, setGames] = useState([]);
    const [showAddGameForm, setShowAddGameForm] = useState(false);




    const addNewGame = (game) => {
        setGames([...games, game]);
        setShowAddGameForm(false); // Close the form after adding a game
    };

    return (
        <div className="dashboard">
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            <button className="add-game-button" onClick={() => setShowAddGameForm(true)}>Add New Game</button>
            {showAddGameForm && (
                <div className="add-game-modal">
                    <AddGameForm onAddGame={addNewGame} />
                </div>
            )}
            <div className="game-box-container">
                {games.map((game) => (
                    <GameBox
                        key={game.id}
                        game={game}
                    />
                ))}
            </div>
        </div>
    );
};


export default Dashboard;
