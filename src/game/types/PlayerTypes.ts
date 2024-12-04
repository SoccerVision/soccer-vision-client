type PreferredFoot = {
    "Dominant Foot": string; // Example: "Right", "Left"
    "Weak Foot Level": number; // Weak foot level as a number
};

type MentalStats = {
    Aggression: number;
    Teamwork: number;
    Decisions: number;
    Composure: number;
};

type AthleticStats = {
    "Physical Power": number;
    "Ball Control": number;
    Dribbling: number;
    Jumping: number;
    Acceleration: number;
    Speed: number;
    Heading: number;
};

type GoalkeepingStats = {
    "Aerial Ability": number;
    Handling: number;
    Kicking: number;
    "One on One": number;
    Reflexes: number;
};

type DefenseStats = {
    Tackling: number;
    Marking: number;
    Positioning: number;
};

type AttackStats = {
    Finishing: number;
    "Long Shots": number;
    "Off The Ball": number;
};

type PlaymakingStats = {
    Creative: number;
    Passing: number;
    Crossing: number;
};

type SetPiecesStats = {
    "Free Kicks": number;
    Penalty: number;
};

type Stats = {
    Mental: MentalStats;
    Athletic?: AthleticStats; // Optional, may not exist in all objects
    Goalkeeping?: GoalkeepingStats; // Optional, may not exist in all objects
    Defense?: DefenseStats; // Optional, may not exist in all objects
    Attack?: AttackStats; // Optional, may not exist in all objects
    Playmaking?: PlaymakingStats; // Optional, may not exist in all objects
    "Set Pieces": SetPiecesStats;
};

type Averages = {
    Mental: number;
    Athletic?: number; // Optional
    Goalkeeping?: number; // Optional
    Defense?: number; // Optional
    Attack?: number; // Optional
    Playmaking?: number; // Optional
    "Set Pieces": number;
};

export type PlayerData = {
    ID: string; // Unique identifier
    Name: string; // Player's name
    Shirt_Number: number; // Shirt number
    Position: string; // Position such as "Goalkeeper", "Defender"
    Level: string; // Example: "Normal"
    Age: number; // Age in years
    Height: number; // Height in centimeters
    Preferred_Foot: PreferredFoot; // Preferred foot object
    Stamina: number; // Stamina rating
    Fitness: string; // Fitness level such as "Low", "Moderate", "Peak"
    Nationality: string; // Country of origin
    Stats: Stats; // Stats object
    Averages: Averages; // Averages object
};

// export type PlayerData = TPlayer[]; // Array of Player objects