import Phaser from 'phaser';
import Player from '../entities/Player';
import Ball from '../entities/Ball';
import {PlayerData} from '../types/PlayerTypes';
import {eventBus} from '../../eventBus';

// Import assets
import PlayerImage from '../assets/images/player.png';
import BallImage from '../assets/images/ball.png';
import FieldImage from '../assets/images/soccerField.png';
import Team1 from '../assets/data/team1.json';
import Team2 from '../assets/data/team2.json';
import * as Matter from "matter";

class MainScene extends Phaser.Scene {
    private team1Players: Player[] = [];
    private team2Players: Player[] = [];
    private team1Score = 0;
    private team2Score = 0;
    private team1ScoreText!: Phaser.GameObjects.Text;
    private team2ScoreText!: Phaser.GameObjects.Text;


    private ball!: Ball;

    // If you have a snapTo property, initialize it here
    private snapTo: { x: number; y: number } | null = null;

    constructor() {
        super({key: 'MainScene'});
    }

    preload() {
        this.load.image('player', PlayerImage);
        this.load.image('ball', BallImage);
        this.load.image('field', FieldImage);

        this.anims.create({
            key: 'player-run',
            frames: this.anims.generateFrameNumbers('player-spritesheet', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1,
        });

    }

    create() {
        // Add the field image
        const field = this.add.image(0, 0, 'field').setOrigin(0.5, 0.5).setName('field');

        // Calculate scale factors
        const scaleX = this.scale.width / field.width;
        const scaleY = this.scale.height / field.height;
        const scale = Math.min(scaleX, scaleY);

        // Add text objects for the scoreboard
        this.team1ScoreText = this.add.text(16, 16, 'Team 1: 0', { fontSize: '32px', color: '#FFF' });
        this.team2ScoreText = this.add.text(this.scale.width - 150, 16, 'Team 2: 0', { fontSize: '32px', color: '#FFF' });

        // Initialize scores
        this.team1Score = 0;
        this.team2Score = 0;

        // Apply scale and center the field
        field.setScale(scale);
        field.setPosition(this.scale.width / 2, this.scale.height / 2);
        field.displayWidth = this.scale.width;
        field.displayHeight = this.scale.height;

        // Calculate player size based on field size
        const playerSize = field.displayWidth * 0.05; // Players are 5% of the field's width


        const centerX = field.x;
        const centerY = field.y;
        this.ball = new Ball(this, centerX, centerY, 'ball');

        // Set ball size (optional)
        const ballSize = playerSize * 0.8; // Ball is slightly smaller than players
        this.ball.setDisplaySize(ballSize, ballSize);

        // Adjust ball physics body
        const ballRadius = ballSize / 2;
        this.ball.setCircle(ballRadius);
        this.ball.setFixedRotation();

        // Initialize teams, passing the player size
        this.initializeTeam(Team1 as PlayerData[], 'team1', playerSize);
        this.initializeTeam(Team2 as PlayerData[], 'team2', playerSize);

        const leftGoal = this.matter.add.rectangle(47.7, 300, 37.3, 142.2, {
            isStatic: true,
            isSensor: true,
            label: 'leftGoal',
        });

        const rightGoal = this.matter.add.rectangle(752.3, 300, 37.3, 142.2, {
            isStatic: true,
            isSensor: true,
            label: 'rightGoal',
        });

        // Set up collision events
        this.matter.world.on('collisionstart', this.handleCollision, this);
        this.events.on('goalScored', this.updateScoreboard, this);
        // Listen for the resize event
        this.scale.on('resize', this.handleResize, this);

        this.startGame()
    }

    private startGame() {
        // Reset ball position
        const field = this.children.getByName('field') as Phaser.GameObjects.Image;
        const centerX = field.x;
        const centerY = field.y;
        this.ball.setPosition(centerX, centerY);

        // Give the ball an initial velocity to simulate a kickoff
        const initialSpeed = 5; // Adjust as needed
        const angle = Phaser.Math.Between(-10, 10); // Slight randomization
        const velocityX = initialSpeed * Math.cos(Phaser.Math.DegToRad(angle));
        const velocityY = initialSpeed * Math.sin(Phaser.Math.DegToRad(angle));
        this.ball.setVelocity(velocityX, velocityY);

        // Emit an event to indicate the game has started
        this.events.emit('gameStarted');
    }

    private updateScoreboard(scoringTeam: string) {
        // Update the scoreboard based on the scoring team
        // This could involve updating a Text object or a custom UI component
        if (scoringTeam === 'team1') {
            // Increment team1's score
        } else if (scoringTeam === 'team2') {
            // Increment team2's score
        }

        // Optionally, display a message or animation
    }

    update(time: number, delta: number) {
        // Update players
        this.team1Players.forEach(player => player.update(this.ball));
        this.team2Players.forEach(player => player.update(this.ball));

        // Optionally, handle other game logic
    }

    private initializeTeam(teamData: PlayerData[], teamKey: string, playerSize: number) {
        const field = this.children.getByName('field') as Phaser.GameObjects.Image;

        // Calculate field boundaries
        const fieldLeft = field.x - field.displayWidth / 2;
        const fieldTop = field.y - field.displayHeight / 2;

        const ySpacing = field.displayHeight / (Math.min(teamData.length, 11) + 1);

        teamData.forEach((playerData, index) => {
            if (index > 10) {
                return;
            }
            const x = teamKey === 'team1'
                ? fieldLeft + field.displayWidth * 0.1
                : fieldLeft + field.displayWidth * 0.9;
            const y = fieldTop + ySpacing * (index + 1);
            const player = new Player(this, x, y, 'player', playerData, teamKey);

            // Set the player size and physics body
            player.setDisplaySize(playerSize, playerSize);
            const radius = playerSize / 2;
            player.setCircle(radius);
            player.setFixedRotation();

            if (teamKey === 'team1') {
                this.team1Players.push(player);
            } else {
                this.team2Players.push(player);
            }

            // player.anims.play('player-run');

        });
    }

    private handleCollision(event: Phaser.Physics.Matter.Events.CollisionStartEvent) {
        event.pairs.forEach(pair => {
            const {bodyA, bodyB} = pair;
            const labels = [bodyA.label, bodyB.label];

            const gameObjectA = bodyA.gameObject as Phaser.GameObjects.GameObject | undefined;
            const gameObjectB = bodyB.gameObject as Phaser.GameObjects.GameObject | undefined;

            if (!gameObjectA || !gameObjectB) return;

            // Check for collision between player and ball
            if (gameObjectA instanceof Player && gameObjectB instanceof Ball) {
                this.playerPossessBall(gameObjectA, gameObjectB);
            } else if (gameObjectA instanceof Ball && gameObjectB instanceof Player) {
                this.playerPossessBall(gameObjectB, gameObjectA);
            }

            if ((bodyA.label === 'ball' && bodyB.label === 'leftGoal') ||
                (bodyA.label === 'leftGoal' && bodyB.label === 'ball')) {
                // Right team scores
                this.handleGoal('team2');
            } else if ((bodyA.label === 'ball' && bodyB.label === 'rightGoal') ||
                (bodyA.label === 'rightGoal' && bodyB.label === 'ball')) {
                // Left team scores
                this.handleGoal('team1');
            }
        });
    }

    private handleGoal(scoringTeam: string) {
        // Update the scoreboard
        this.events.emit('goalScored', scoringTeam);

        // Reset positions
        this.resetPositions();

        // Restart the game after a short delay
        this.time.delayedCall(1000, () => {
            this.startGame();
        }, [], this);
    }

    private resetPositions() {
        // Reset ball position
        const field = this.children.getByName('field') as Phaser.GameObjects.Image;
        const centerX = field.x;
        const centerY = field.y;
        this.ball.setPosition(centerX, centerY);
        this.ball.setVelocity(0, 0);

        // Reset players to their starting positions
        this.resetTeamPositions(this.team1Players, 'team1');
        this.resetTeamPositions(this.team2Players, 'team2');
    }

    private resetTeamPositions(players: Player[], teamKey: string) {
        const field = this.children.getByName('field') as Phaser.GameObjects.Image;
        const fieldLeft = field.x - field.displayWidth / 2;
        const fieldTop = field.y - field.displayHeight / 2;
        const ySpacing = field.displayHeight / (players.length + 1);

        players.forEach((player, index) => {
            const x = teamKey === 'team1'
                ? fieldLeft + field.displayWidth * 0.1
                : fieldLeft + field.displayWidth * 0.9;
            const y = fieldTop + ySpacing * (index + 1);
            player.setPosition(x, y);
            player.setVelocity(0, 0);
        });
    }

    private updateScore(team: string) {
        if (team === 'team1') {
            this.team1Score += 1;
        } else {
            this.team2Score += 1;
        }

        // Emit event to React
        eventBus.emit('scoreUpdate', {
            team1: this.team1Score,
            team2: this.team2Score,
        });
    }

    private resetBall() {
        this.ball.setPosition(400, 300);
        this.ball.setVelocity(0, 0);
    }

    private playerPossessBall(player: Player, ball: Ball) {
        // Attach the ball to the player
        ball.setPosition(player.x, player.y);
        ball.setVelocity(player.body?.velocity.x || 0, player.body?.velocity.y || 0);
    }


    private handleResize(gameSize: Phaser.Structs.Size) {
        const width = gameSize.width;
        const height = gameSize.height;

        // Update field size
        const field = this.children.getByName('field') as Phaser.GameObjects.Image;
        if (field) {
            field.displayWidth = width;
            field.displayHeight = height;
        }

        // Recalculate player size based on new field size
        const playerSize = field.displayWidth * 0.05;

        // Update ball position and size
        if (this.ball) {
            this.ball.setPosition(width / 2, height / 2);

            // Update ball size
            const ballSize = playerSize * 0.8;
            this.ball.setDisplaySize(ballSize, ballSize);

            // Adjust ball physics body
            const ballRadius = ballSize / 2;
            this.ball.setCircle(ballRadius);
            this.ball.setFixedRotation();
        }

        // Update player positions and sizes
        this.updatePlayerPositionsAndSizes(this.team1Players, 'team1', playerSize, field);
        this.updatePlayerPositionsAndSizes(this.team2Players, 'team2', playerSize, field);
    }

    private updatePlayerPositionsAndSizes(
        players: Player[],
        teamKey: string,
        playerSize: number,
        field: Phaser.GameObjects.Image
    ) {
        const fieldLeft = field.x - field.displayWidth / 2;
        const fieldTop = field.y - field.displayHeight / 2;

        const ySpacing = field.displayHeight / (players.length + 1);

        players.forEach((player, index) => {
            const x = teamKey === 'team1'
                ? fieldLeft + field.displayWidth * 0.1
                : fieldLeft + field.displayWidth * 0.9;
            const y = fieldTop + ySpacing * (index + 1);
            player.setPosition(x, y);

            // Update player size
            player.updateSize(playerSize);
        });
    }
}

export default MainScene;