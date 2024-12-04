import React, {useState, useEffect} from 'react';

import {eventBus} from '../../eventBus';

const Scoreboard: React.FC = () => {
    const [team1Score, setTeam1Score] = useState(0);
    const [team2Score, setTeam2Score] = useState(0);

    useEffect(() => {
        const updateScores = (scores: { team1: number; team2: number }) => {
            setTeam1Score(scores.team1);
            setTeam2Score(scores.team2);
        };

        eventBus.on('scoreUpdate', updateScores);

        return () => {
            eventBus.off('scoreUpdate', updateScores);
        };
    }, []);

    return (
        <div className="scoreboard">
            <div>Team 1: {team1Score}</div>
            <div>Team 2: {team2Score}</div>
        </div>
    );
};

export default Scoreboard;